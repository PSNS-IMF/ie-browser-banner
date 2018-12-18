interface IIEDocumentService
{
  [index: number]: any;
}

interface IOperatingSystem
{
  name: string;
  version: number;
}

angular
  .module('psns', [])
  .directive(
    'ieBrowserBanner',
    ['$window', '$document', '$timeout', (
      $window: ng.IWindowService,
      $document: ng.IDocumentService | IIEDocumentService,
      $timeout: ng.ITimeoutService) =>
  {
    function getOS(wantedName: string | null, wantedVersion: string | null) : IOperatingSystem | null
    {
      if (!wantedName || !wantedVersion)
      {
        return null;
      }

      let os = {
        name: '',
        version: 0
      };

      const header = [
        $window.navigator.platform,
        $window.navigator.userAgent,
        $window.navigator.appVersion,
        $window.navigator.vendor
      ];

      const agent = header.join(' ');
      const regex = new RegExp(wantedName, 'i');
      const osMatch = regex.test(agent);

      if (osMatch)
      {
        const rxVersion = new RegExp(wantedVersion + '[- /:;]([\\d._]+)', 'i');
        const matches = agent.match(rxVersion);

        let version = '';
        let rxMatch = '';

        if (matches)
        {
          rxMatch = matches[1] || matches[0] || '';
        }

        if (rxMatch)
        {
          const rxMatches = rxMatch.split(/[._]+/);

          for (let j = 0; j < rxMatches.length; j++)
          {
            if (j === 0)
            {
              version += rxMatches[j] + '.';
            }
            else
            {
              version += rxMatches[j];
            }
          }

          os.name = wantedName;
          os.version = parseFloat(version);
        }
      }

      return os;
    }

    return {
      bindToController: {
        class: '@?',
        delay: '@?',
        message: '@?',
        osName: '@?',
        osVersion: '@?',
        withOs: '=?'
      },
      controller: () => {},
      controllerAs: 'ctrl',
      link: (scope: any, element, attr, controller: any) =>
        {
          const withOs =
            controller.withOs,
            osName = controller.osName,
            osVersion = controller.osVersion;

          // Internet Explorer 6-11
          const isIE = false || !!$document[0].documentMode;
          const delay = isNaN(+controller.delay) ? 500 : controller.delay;

          scope.message =
            controller.message
            || 'We recommend using Chrome, Edge, or Firefox for the optimal experience.';
          scope.class = controller.class || 'alert alert-warning text-center';
          scope.styles = {
            '-webkit-transition': 'all linear 0.5s',
            'display': 'none',
            'left': '0px',
            'opacity': 0,
            'position': 'fixed',
            'transition': 'all linear 0.5s',
            'width': '100%'
          };

          $timeout(() =>
            {
              if (element[0].style && element[0].style.display === 'none')
              {
                element[0].style.display = 'inherit';

                if (element[0].style.opacity === '0')
                {
                  element[0].style.opacity = '1';
                }
              }
            },
            delay);

          scope.dismiss = () => { element.remove(); };

          if (isIE && (!withOs || withOs(getOS(osName, osVersion))))
          {
            return;
          }
          else
          {
            scope.dismiss();
          }
        },
      replace: true,
      restrict: 'E',
      scope: {},
      template:
        `<div ng-class="class" ng-style="styles" role="alert">
          <button type="button" class="close" aria-label="Close" ng-click="dismiss()">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{{message}}</strong>
        </div>`
    };
  }]);

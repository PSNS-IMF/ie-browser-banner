interface IIEDocumentService
{
  [index: number]: any;
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
    function debug(message: string)
    {
      console.debug(`IE Banner: ${message}`);
    }

    function shouldHide(hideVersion: string, osVersion: string): boolean
    {
      const agent = [
        $window.navigator.platform,
        $window.navigator.userAgent,
        $window.navigator.appVersion,
        $window.navigator.vendor
      ].join(' ');
      const rxVersion = new RegExp(`${osVersion}[- /:;]([\\d._]+)`, 'i');
      const matches = agent.match(rxVersion);

      debug(`agent: ${agent}`);

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
      }

      debug(`hideVersion: ${hideVersion} version: ${version}`);
      return hideVersion === version;
    }

    return {
      bindToController: {
        class: '@?',
        delay: '@?',
        hideVersion: '@?',
        message: '@?',
        osVersion: '@?'
      },
      controller: () => {},
      controllerAs: 'ctrl',
      link: (scope: any, element, attr, controller: any) =>
        {
          const hideVersion =
            controller.hideVersion
              ? controller.hideVersion
              : '';

          const osVersion =
            controller.osVersion
              ? controller.osVersion
              : 'NT';

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

          if (isIE && !shouldHide(hideVersion, osVersion))
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

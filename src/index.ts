interface IIEDocumentService
{
  [index: number]: any;
}

angular
  .module('psns', [])
  .directive(
    'ieBrowserBanner',
    ['$document', '$timeout', ($document: ng.IDocumentService | IIEDocumentService, $timeout: ng.ITimeoutService) =>
  {
    return {
      bindToController: {
        class: '@?',
        delay: '@?',
        message: '@?'
      },
      controller: () => {},
      controllerAs: 'ctrl',
      link: (scope: any, element, attr, controller: any) =>
        {
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

          if (!isIE)
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

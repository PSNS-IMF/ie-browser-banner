export default ($document, $timeout) =>
  ({
    scope: {},
    replace: true,
    restrict: 'E',
    bindToController: {
      message: '@?',
      delay: '@?',
      class: '@?'
    },
    controller: () => { },
    controllerAs: 'ctrl',
    template:
      `<div ng-class="class" ng-style="styles" role="alert">
        <button type="button" class="close" aria-label="Close" ng-click="dismiss()"><span aria-hidden="true">&times;</span></button>
        <strong>{{message}}</strong>
      </div>`,
    link: (scope, element, attr, controller) =>
    {
      // Internet Explorer 6-11
      const isIE = false || !!$document.documentMode;
      const delay = isNaN(+controller.delay) ? 500 : controller.delay;

      scope.message = controller.message || 'We recommend using Chrome, Edge, or Firefox for the optimal experience.';
      scope.class = controller.class || 'alert alert-warning text-center';
      scope.styles = {
        '-webkit-transition': 'all linear 0.5s',
        'transition': 'all linear 0.5s',
        'opacity': 0,
        'display': 'none',
        'position': 'fixed',
        'left': '0px',
        'width': '100%'
      };

      $timeout(
        function ()
        {
          if (element[0].style && element[0].style.display === 'none')
          {
            element[0].style.display = 'inherit';

            if (element[0].style.opacity === '0')
            {
              element[0].style.opacity = 1;
            }
          }
        },
        delay);

      scope.dismiss = function ()
      {
        element.remove();
      };

      if (!isIE)
      {
        scope.dismiss();
      }
    }
  });
  
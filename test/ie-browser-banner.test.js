import angular from 'angular';
import 'angular-mocks';
import ieBrowserBannerDirective from '../src/ie-browser-banner';

test('it adds', () =>
{
  const app = angular.module('test', []);
  app.directive('ieBrowserBanner', ieBrowserBannerDirective);

  angular.mock.module('test');
  let $compile, scope;

  inject((_$compile_, _$rootScope_) =>
  {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  });

  const element = $compile('<ie-browser-banner></ie-browser-banner>')(scope);
  scope.$digest();

  expect(element.html()).toContain('banner here');
});
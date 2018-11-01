import angular from 'angular';
import ieWarningDirective from './ie-browser-banner';

angular
  .module('psns', [])
  .directive('ieBrowserBanner', ieWarningDirective);
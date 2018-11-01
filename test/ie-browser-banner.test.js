import angular from 'angular';
import 'angular-mocks';
import '../src';

const defaultClasses = 'alert alert-warning text-center';
const defaultMessage = 'We recommend using Chrome, Edge, or Firefox for the optimal experience.';

let $compile, scope, $document, $timeout, parent;

beforeEach(() =>
{
  angular.mock.module('psns');
  angular.mock.inject((_$compile_, _$rootScope_, _$document_, _$timeout_) =>
  {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    $timeout = _$timeout_;
    $document = _$document_;
  });
});

const load = (msg = null, delay = 0, cls = null) =>
{
  const attrs = [
    msg ? `message="${msg}"` : '',
    cls ? `class="${cls}"` : '',
    `delay="${delay}"`
  ].join(' ');

  parent = $compile(`<div><ie-browser-banner ${attrs}></ie-browser-banner></div>`)(scope);
  scope.$digest();
  $timeout.flush();
};

describe('Internet Explorer', () =>
{
  let element, closeButton;
  beforeEach(() =>
  {
    $document.documentMode = 11;
    load();

    element = parent.children().eq(0);
    closeButton = element.children().eq(0);
  });

  test('it is shown with animation', () =>
  {
    expect(closeButton.attr('class')).toBe('close');

    expect(element.css('left')).toBe('0px');
    expect(element.css('position')).toBe('fixed');
    expect(element.css('-webkit-transition')).toBe('all linear 0.5s');
    expect(element.css('transition')).toBe('all linear 0.5s');
    expect(element.css('width')).toBe('100%');

    expect(element.css('display')).toBe('inherit');
    expect(element.css('opacity')).toBe('1');

    expect(element.attr('class')).toContain(defaultClasses);
    expect(element.find('strong').text()).toBe(defaultMessage);
  });

  test('it is removed on close button click', () =>
  {
    closeButton.triggerHandler('click');

    expect(parent.children().length).toBe(0);
  });
});

describe('Non Internet Explorer', () =>
{
  beforeEach(load);

  test('it is removed from the DOM', () =>
  {
    expect(parent.children().length).toBe(0);
  });
});
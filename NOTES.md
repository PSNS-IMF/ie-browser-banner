## References

### Code

  * [AngularJS](https://code.angularjs.org/1.4.3/docs/guide/unit-testing)
  * [Jest](https://jestjs.io/docs/en/getting-started)
  * [TSLint](https://palantir.github.io/tslint/)
  * [TypeScript](https://www.typescriptlang.org/docs/home.html)

### Packaging

  * [NPM Dev](https://docs.npmjs.com/misc/developers)
  * [NPM Publish](https://docs.npmjs.com/getting-started/publishing-npm-packages)
  * [Webpack](https://webpack.js.org/guides/author-libraries/#authoring-a-library)

### Misc

  * [Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [IE Detection](https://github.com/angular/angular.js/blob/v1.4.3/src/Angular.js#L187-L191)
  * [Windows User Agent](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/ms537503(v=vs.85))

### Publishing Steps
  * Push changes to master branch
  * [Increment Package Version](https://docs.npmjs.com/cli/version)
    * i.e. `npm version patch`
  * `npm login`
  * `npm publish`
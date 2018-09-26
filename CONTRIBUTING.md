# Contributing to Undernet

All input is good input! Contributing to this project should be as easy and transparent as possible, whether it's:

* Reporting a bug
* Discussing the current state of the code
* Submitting a fix
* Proposing new features
* Becoming a maintainer

## We Develop with Github

We use github to track pretty much everything: pull requests, feature discussion, and issue resolution.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html)

All code changes happen through pull requests

Pull requests are the best way to propose changes to the codebase. Any kind of idea or change is welcome.

1.  Fork the repo and create your branch from `develop`.
2.  If you've added code that should be tested, add tests.
3.  If you've changed APIs, update the documentation.
4.  If you've added dependencies, note what they are and why they are needed.
5.  Make sure your code and tests run without errors. It's also helpful if you've done a regression check against other areas of the framework, but not strictly required.

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/geotrev/undernet/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/geotrev/undernet/issues/new).

## Write bug reports with detail, background, and sample code

Always included expected vs. actual behavior with supporting information such as screenshots, browser/OS versions, and the like. If you have a specific solution to the problem, call it out in a separate "proposed solution" portion of your issue.

The more detail, the less confusion!

## Use a Consistent Coding Style

Reference `.prettierrc` for code styling. Run `npm run lint` to apply styling to both css and javascript, or manually apply updates to files using `prettier`:

```shell
$ prettier --write path/to/folder/**/*
```

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)

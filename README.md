# Monolith

A powerful, configuration-first front-end framework.

## In the box

The framework features:

* A flex-grid for layouts
* Styling for common tags: buttons, paragraphs, headers, etc.
* Configuration file to apply core brand styling to all elements, including an option for name-spacing.
* Functional JavaScript components: modals, accordions, etc.

[![CircleCI](https://circleci.com/gh/geotrev/getmonolith.io/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/monolith-site/tree/master) [![dependencies Status](https://david-dm.org/geotrev/getmonolith.io/status.svg)](https://david-dm.org/geotrev/getmonolith.io)

## Getting Started

Install dependencies and get the site up and running.

```shell
$ git clone git@github.com:geotrev/getmonolith.io.git
$ cd monolith-site/
$ git clone https://github.com/geotrev/getmonolith.io.wiki.git
$ yarn install
```

### Run the dev server

```shell
$ yarn watch
```

### Make production builds

```shell
$ yarn build
```

### Run tests with istanbuljs/nyc coverage stats

```shell
$ yarn test
```

### Load tests on file save

```shell
$ yarn test:w
```

## Contributing

See CONTRIBUTING.md for more details.

### Testing and development

The site itself is a demo of the framework, so you should be able to work on the framework source itself while the site runs in the background.

To compile and test the framework in this project, you'll need to have a stable version of ruby to compile the framework. I recommend using [ruby-install](https://www.ruby-lang.org/en/documentation/installation/#ruby-install) and managing your version for this project with [chruby](https://www.ruby-lang.org/en/documentation/installation/#chruby) or [rvm](https://www.ruby-lang.org/en/documentation/installation/#rvm). You can use whatever setup is easiest for your machine, though.

Once ruby is installed, globally install sass. Don't use npm's sass package as it doesn't have the same cli flags as the gem package. The build scripts are written to work for mac only right now.

```shell
$ gem install sass
$ yarn build:development
```

From there, everything should build/work correctly. If not, check that your ruby version is set and your global sass version is recent (at least version 3.4).

### New releases

New releases are simply zipped and compiled files. You can create a new release using:

```shell
$ yarn build:release
```

This will compile and zip framework assets for a new version.

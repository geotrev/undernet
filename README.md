# Monolith
Marketing site for [Monolith CSS](https://github.com/geotrev/monolith).

[![CircleCI](https://circleci.com/gh/geotrev/getmonolith.io/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/monolith-site/tree/master) [![dependencies Status](https://david-dm.org/geotrev/getmonolith.io/status.svg)](https://david-dm.org/geotrev/getmonolith.io)

## Getting Started
Install dependencies and get the site up and running.

```shell
$ git clone git@github.com:gtreviranus/getmonolith.io.git
$ cd monolith-site/
$ npm install
```

### Run the dev server
```shell
$ yarn run watch
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
Be sure to read and understand the license agreement! If you have issues or bugs/suggestions, feel free to submit a ticket/post and include a detailed description of what you're trying to fix, suggest, remove, or change.

To compile and test the framework in this project, you'll need to have a stable version of ruby to compile the framework. I recommend using [ruby-install](https://www.ruby-lang.org/en/documentation/installation/#ruby-install) and managing your version for this project with [chruby](https://www.ruby-lang.org/en/documentation/installation/#chruby) or [rvm](https://www.ruby-lang.org/en/documentation/installation/#rvm).

Once ruby is installed, globally install sass. Don't use npm's sass package as it doesn't have the same cli flags as the gem package.

```shell
$ gem install sass
$ yarn setup
```

From there, everything should build/work correctly. If not, check that your ruby version is set and your global sass version is recent (at least version 3.4).

### Testing and development
The site itself is a demo of the framework, so you should be able to work on the framework source itself while the site runs in the background.

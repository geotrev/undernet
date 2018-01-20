# Monolith CSS Website
Marketing site for [Monolith CSS](https://github.com/gtreviranus/monolith).

Currently running at http://monolith.geotrev.com

[![CircleCI](https://circleci.com/gh/geotrev/monolith-site/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/monolith-site/tree/master)

### Clone and set up with Yarn
```shell
$ brew install yarn
$ git clone git@github.com:gtreviranus/monolith-site.git
$ cd monolith-site/
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

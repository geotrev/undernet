# Little Webpack Template
Made with the help of the internet, from zero to deployable, by a person (me) with almost zero webpack experience. This setup isn't perfect but it's enough to get going fast and with some semblance of confidence that you can build and deploy simple websites. :)

## Starter pack for simple one page apps, or deployable to heroku for sites with multiple pages
The ethos for this project was to explore useful starting points for new projects and understand webpack's many offerings.

### Features
Needs info...

### Clone and set up with Yarn
```shell 
$ brew install yarn
$ cd little-webpack-template/
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

### Run tests with istanbul coverage
```shell
$ yarn test
```

### Load tests on each file save/refresh
```shell
$ yarn test:w
```

### Deploy with Heroku
```shell
$ heroku login
...
$ heroku create
...
$ git push heroku master
...
$ heroku open
# or
$ open https://your-new-app.herokuapp.com
```

# generator-jhipster-react [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A Jhipster based generator to create awesome react + spring boot applications

![jhipster-react logo](logo-jhipster-react.svg)
## Installation

**Attention: This is still a work in progress**

First, install [Yeoman](http://yeoman.io) and [JHipster](http://jhipster.github.io/), then install generator-jhipster-react using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-jhipster
npm install -g generator-jhipster-react
```

Then generate your new awesome project:

```bash
yo jhipster-react
```
As this is a generator which runs on top of [JHipster](http://jhipster.github.io/), we expect you have [JHipster and its related tools already installed](http://jhipster.github.io/installation.html).

This generator requires Jhipster version 2.27 or greater in order to work

## Development-mode

Frontend is working through [webpack-dev-server](webpack-dev-server-url) proxy mode feature in order to have an ability to use both frontend & backend server simultaneously. All requests from frontend would be proxied to backend server.

To start frontend server please run the following command:

```bash
npm start
```

## License

Apache-2.0 © [Deepu KS](http://deepu105.github.io)


[webpack-dev-server-url]: https://webpack.github.io/docs/webpack-dev-server.html
[npm-image]: https://badge.fury.io/js/generator-jhipster-react.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-react
[travis-image]: https://travis-ci.org/deepu105/generator-jhipster-react.svg?branch=master
[travis-url]: https://travis-ci.org/deepu105/generator-jhipster-react
[daviddm-image]: https://david-dm.org/hipster-labs/generator-jhipster-react.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/hipster-labs/generator-jhipster-react

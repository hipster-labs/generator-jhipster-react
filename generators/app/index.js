'use strict';

var generators = require('yeoman-generator');
var jhipster = require('generator-jhipster');
var packagejs = require(__dirname + '/../../package.json');
var _ = require('underscore.string');
var chalk = require('chalk');
var path = require('path');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'react'};

// Stores JHipster functions
var jhipsterFunc = {};

const DEF_CLIENT_BUILD = 'gulp';
const WEB_SRC = 'src/main/webapp/';

module.exports = generators.Base.extend({
  initializing: {

    displayLogo: function () {
      this.log(chalk.white('\nWelcome to ' + chalk.bold('JHipster React') + '! ' + chalk.yellow('v' + packagejs.version + '\n')));
    },

    composeModule: function (args) {
      /* compose with Jhipster module to get access to reusable functions from JHipster */
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc,
          skipValidation: true
        }
      });
    },

    setupClientVars : function () {
      this.useSass = this.config.get('useSass');
      this.appName = this.config.get('appName');
      this.frontendBuilder = this.config.get('frontendBuilder');
      this.enableTranslation = this.config.get('enableTranslation');
      if(this.useSass !=null && this.frontendBuilder != null && this.enableTranslation != null) {
        this.existingProject = true;
      }
    },

  },

  prompting: {
    promtClientOpts: function () {
      /* Promt for Client side feature options */
      this.log(chalk.green.bold('\n-----------------------* Client side options *-----------------------\n'));
      if(this.existingProject){
        this.log(chalk.green('\nFound existing client app configuration. Using the same.\n'));
        return;
      }
      var done = this.async();
      var defaultAppBaseName = (/^[a-zA-Z0-9_]+$/.test(path.basename(process.cwd())))?path.basename(process.cwd()):'jhipster-react';

      var prompts = [
          {
              type: 'input',
              name: 'appName',
              message: 'What is the name of your ReactJS application?',
              default: defaultAppBaseName
          },
          {
              type: 'confirm',
              name: 'useSass',
              message: 'Would you like to use the LibSass stylesheet preprocessor for your CSS?',
              default: false
          },
          {
              type: 'confirm',
              name: 'enableTranslation',
              message: 'Would you like to enable translation support?',
              default: true
          }
      ];

      this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.enableTranslation = props.enableTranslation;
        this.useSass = props.useSass;
        done();
      }.bind(this));
    },

    composeServerApp: function (args) {
      this.log(chalk.green.bold('\n-----------------------* Server side options *-----------------------\n'));
      /* Compose server side application using JHipster */
      this.composeWith('jhipster:app', {
        options: {
          'skip-client': true,
          'skip-install': true,
          'skip-bower': true,
          'client-build': DEF_CLIENT_BUILD,
          'i18n': this.enableTranslation
        }
      });
    },
  },

  configuring : {
    saveConfig: function () {
      this.config.set('appName', this.appName);
      this.config.set('useSass', this.useSass);
      this.config.set('frontendBuilder', DEF_CLIENT_BUILD);
      this.config.set('enableTranslation', this.enableTranslation);
    },

    setupVars: function () {
      this.baseName = this.appName;
      this.slugifiedBaseName = _.slugify(this.baseName);
    }
  },

  writing: {
    /* write client side files */
    writeCommonFiles : function () {
      console.log(this.slugifiedBaseName)
      this.template('_package.json','package.json');
      this.copy('.babelrc','.babelrc');
      this.copy('.gitignore','.gitignore');
      this.copy('.eslintrc', '.eslintrc');
    },

    writeWebpackFiles : function() {
      this.copy('_webpack-production.config.js', 'webpack-production.config.js');
    },

    writeGulpFiles : function () {
      this.copy('_gulpfile.js','gulpfile.js');
      this.copy('gulp-util/bundleLogger.js','gulp-util/bundleLogger.js');
      this.fs.copy(
        this.templatePath('gulp-util/handleErrors.js'),
        this.destinationPath('gulp-util/handleErrors.js'));
    },

    writeMainFiles : function () {
      this.template(WEB_SRC + '_index.html',WEB_SRC + 'index.html');
      this.copy(WEB_SRC + '404.html',WEB_SRC + '404.html');
      this.copy(WEB_SRC + 'favicon.ico',WEB_SRC + 'favicon.ico');
      this.copy(WEB_SRC + 'htaccess.txt',WEB_SRC + '.htaccess');
      this.copy(WEB_SRC + 'robots.txt',WEB_SRC + 'robots.txt');
      this.copy(WEB_SRC + 'content/css/_main.css',WEB_SRC + 'content/css/main.css');
    },

    writeAppFiles : function () {
      this.copy(WEB_SRC + 'app/_app.jsx',WEB_SRC + 'app/app.jsx');
      this.template(WEB_SRC + 'app/_Main.jsx',WEB_SRC + 'app/Main.jsx');
    }
  },

  install: function () {
    if(this.options['skip-install']){
      this.log(chalk.green.bold('\nRun command `npm install` on the project root to install required dependencies\n'));
    } else {
      this.log(chalk.green.bold('\nRunning NPM install. If this fails run command `npm install` on the project root\n'));
      this.npmInstall();
    }
  }
});

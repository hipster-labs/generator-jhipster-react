const generator = require('yeoman-generator');
const _ = require('underscore.string');
const chalk = require('chalk');
const path = require('path');
const shelljs = require('shelljs');
const packagejs = require('../../package.json');

// Stores JHipster variables
const jhipsterVar = { moduleName: 'react' };

// Stores JHipster functions
const jhipsterFunc = {};

const DEF_CLIENT_BUILD = 'webpack';
const WEB_SRC = 'src/main/webapp/';

shelljs.echo('{ "generator-jhipster": { "baseName" : ""}}').to('.yo-rc.json');

module.exports = generator.extend({
  initializing: {

    displayLogo() {
      this.log(chalk.white(`\nWelcome to ${chalk.bold('JHipster React')}! ${chalk.yellow(`v${packagejs.version}\n`)}`));
    },

    composeModule(args) {
      /* compose with Jhipster module to get access to reusable functions from JHipster */
      this.composeWith(require.resolve('generator-jhipster/generators/modules'), {
        jhipsterVar,
        jhipsterFunc,
        skipValidation: true
      });
    },

    setupClientVars() {
      this.useSass = this.config.get('useSass');
      this.appName = this.config.get('appName');
      this.frontendBuilder = this.config.get('frontendBuilder');
      this.enableTranslation = this.config.get('enableTranslation');
      if (this.useSass != null && this.frontendBuilder != null && this.enableTranslation != null) {
        this.existingProject = true;
      }
      this.totalQuestions = jhipsterVar.CONSTANTS.SERVER_QUESTIONS + 3;
    },

  },

  prompting: {
    promtClientOpts() {
      /* Promt for Client side feature options */
      this.log(chalk.green.bold('\n-----------------------* Client side options *-----------------------\n'));
      if (this.existingProject) {
        this.log(chalk.green('\nFound existing client app configuration. Using the same.\n'));
        return;
      }
      const done = this.async();
      const defaultAppBaseName = (/^[a-zA-Z0-9_]+$/.test(path.basename(process.cwd()))) ? path.basename(process.cwd()) : 'jhipster-react';

      const prompts = [
        {
          type: 'input',
          name: 'appName',
          message: `(1/${this.totalQuestions}) What is the name of your ReactJS application?`,
          default: defaultAppBaseName
        },
        {
          type: 'confirm',
          name: 'useSass',
          message: `(2/${this.totalQuestions}) Would you like to use the LibSass stylesheet preprocessor for your CSS?`,
          default: false
        },
        {
          type: 'confirm',
          name: 'enableTranslation',
          message: `(3/${this.totalQuestions}) Would you like to enable translation support?`,
          default: true
        }
      ];

      this.prompt(prompts).then((props) => {
        this.appName = props.appName;
        this.enableTranslation = props.enableTranslation;
        this.useSass = props.useSass;
        done();
      });
    },

    composeServerApp(args) {
      this.log(chalk.green.bold('\n-----------------------* Server side options *-----------------------\n'));
      /* Compose server side application using JHipster */
      this.composeWith(require.resolve('generator-jhipster/generators/server'), {
        i18n: this.enableTranslation,
        configOptions: {
          lastQuestion: 3,
          totalQuestions: this.totalQuestions,
          logo: false,
          baseName: this.appName,
          clientPackageManager: 'yarn'
        }
      });
    },
  },

  configuring: {
    saveConfig() {
      this.config.set('appName', this.appName);
      this.config.set('useSass', this.useSass);
      this.config.set('enableTranslation', this.enableTranslation);
    },

    setupVars() {
      this.baseName = this.appName;
      this.slugifiedBaseName = _.slugify(this.baseName);
    }
  },

  writing: {
    /* write client side files */
    // writeCommonFiles() {
    //   this.template('_package.json', 'package.json');
    //   this.copy('.babelrc', '.babelrc');
    //   this.copy('.gitignore', '.gitignore');
    //   this.copy('.eslintrc', '.eslintrc');
    // },

    // writeWebpackFiles() {
    //   this.copy('_webpack-production.config.js', 'webpack-production.config.js');
    //   this.copy('_webpack-dev-server.config.js', 'webpack-dev-server.config.js');
    //   this.copy('_server.js', 'server.js');
    // },

    // writeMainFiles() {
    //   this.template(`${WEB_SRC}_index.html`, `${WEB_SRC}index.html`);
    //   this.copy(`${WEB_SRC}404.html`, `${WEB_SRC}404.html`);
    //   this.copy(`${WEB_SRC}favicon.ico`, `${WEB_SRC}favicon.ico`);
    //   this.copy(`${WEB_SRC}htaccess.txt`, `${WEB_SRC}.htaccess`);
    //   this.copy(`${WEB_SRC}robots.txt`, `${WEB_SRC}robots.txt`);
    //   this.copy(`${WEB_SRC}content/css/_main.css`, `${WEB_SRC}content/css/main.css`);
    // },

    // writeAppFiles() {
    //   this.copy(`${WEB_SRC}app/_app.jsx`, `${WEB_SRC}app/app.jsx`);
    //   this.template(`${WEB_SRC}app/_Main.jsx`, `${WEB_SRC}app/Main.jsx`);
    // }
  },

  install() {
    if (this.options['skip-install']) {
      this.log(chalk.green.bold('\nRun command `yarn install` on the project root to install required dependencies\n'));
    } else {
      this.log(chalk.green.bold('\nRunning YARN install. If this fails run command `yarn install` on the project root\n'));
      this.yarnInstall();
    }
  }
});

const chalk = require('chalk');

module.exports = {
  askForInsightOptIn,
  askForApplicationType,
  askForModuleName,
  askFori18n,
  askForTestOpts
};

function askForInsightOptIn() {
  if (this.existingProject) return;

  // const done = this.async();
  // const insight = this.insight();

  // this.prompt({
  //   when: () => insight.optOut === undefined,
  //   type: 'confirm',
  //   name: 'insight',
  //   message: `May ${chalk.cyan('JHipster')} anonymously report usage statistics to improve the tool over time?`,
  //   default: true
  // }).then((prompt) => {
  //   if (prompt.insight !== undefined) {
  //     insight.optOut = !prompt.insight;
  //   }
  //   done();
  // });
}

function askForApplicationType() {
  if (this.existingProject) return;

  const DEFAULT_APPTYPE = 'monolith';
  if (this.skipServer) {
    this.applicationType = this.configOptions.applicationType = DEFAULT_APPTYPE;
    return;
  }

  const done = this.async();

  this.prompt({
    type: 'list',
    name: 'applicationType',
    message: response => this.getNumberedQuestion('Which *type* of application would you like to create?', true),
    choices: [
      {
        value: DEFAULT_APPTYPE,
        name: 'Monolithic application (recommended for simple projects)'
      },
      {
        value: 'microservice',
        name: 'Microservice application'
      },
      {
        value: 'gateway',
        name: 'Microservice gateway'
      },
      {
        value: 'uaa',
        name: '[BETA] JHipster UAA server (for microservice OAuth2 authentication)'
      }
    ],
    default: DEFAULT_APPTYPE
  }).then((prompt) => {
    this.applicationType = this.configOptions.applicationType = prompt.applicationType;
    done();
  });
}

function askForModuleName() {
  if (this.existingProject) return;

  this.askModuleName(this);
  this.configOptions.lastQuestion = this.currentQuestion;
  this.configOptions.totalQuestions = this.totalQuestions;
}

function askFori18n() {
  this.currentQuestion = this.configOptions.lastQuestion;
  this.totalQuestions = this.configOptions.totalQuestions;
  if (this.skipI18n || this.existingProject) return;
  this.aski18n(this);
}

function askForTestOpts() {
  if (this.existingProject) return;

  const choices = [];
  const defaultChoice = [];
  if (!this.skipServer) {
        // all server side test frameworks should be added here
    choices.push(
            { name: 'Gatling', value: 'gatling' },
            { name: 'Cucumber', value: 'cucumber' }
        );
  }
  if (!this.skipClient) {
        // all client side test frameworks should be added here
    choices.push(
            { name: 'Protractor', value: 'protractor' }
        );
  }
  const done = this.async();

  this.prompt({
    type: 'checkbox',
    name: 'testFrameworks',
    message: response => this.getNumberedQuestion('Besides JUnit and Karma, which testing frameworks would you like to use?', true),
    choices,
    default: defaultChoice
  }).then((prompt) => {
    this.testFrameworks = prompt.testFrameworks;
    done();
  });
}

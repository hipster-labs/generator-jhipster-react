
module.exports = {
  askForModuleName,
  askForClientSideOpts,
  askFori18n
};

function askForModuleName() {
  if (this.baseName) return;

  this.askModuleName(this);
}

function askForClientSideOpts() {
  if (this.existingProject) return;

  const done = this.async();
  const prompts = [
    {
      type: 'confirm',
      name: 'useSass',
      message: response => this.getNumberedQuestion('Would you like to use the LibSass stylesheet preprocessor for your CSS?', true),
      default: true
    }
  ];
  this.prompt(prompts).then((props) => {
    this.useSass = props.useSass;
    done();
  });
}

function askFori18n() {
  if (this.existingProject || this.configOptions.skipI18nQuestion) return;

  this.aski18n(this);
}

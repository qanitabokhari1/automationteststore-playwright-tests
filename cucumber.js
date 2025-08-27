module.exports = {
  default: {
    requireModule: [
      'ts-node/register'
    ],
    require: [
      'steps/**/*.ts',
      'support/**/*.ts'
    ],
    paths: [
      'features/**/*.feature'
    ],
    publishQuiet: true,
    format: ['progress'],
    worldParameters: {}
  }
};

const chalk = require('chalk')
const util = require('../utils/index.js')

const componentsPath = './components'
const responsePath = './response'
const exampleComponentPath = './components/example'

const controllerPathDirectory = `${exampleComponentPath}/controller.js`
const networkPathDirectory = `${exampleComponentPath}/network.js`
const responsePathDirectory = `${responsePath}/response.js`
const indexPathDirectory = `./index.js`

/**
 * Create example api with express
 */
const createApiExpress = async () => {
  // Install dependencies
  await util.installDependencies()

  // Create directories
  await util.createDirectory(componentsPath)
  await util.createDirectory(responsePath)
  await util.createDirectory(exampleComponentPath);

  // Create files
  await util.createFile(indexPathDirectory, 'index')
  await util.createFile(networkPathDirectory, 'network')
  await util.createFile(controllerPathDirectory, 'controller')
  await util.createFile(responsePathDirectory, 'response')

  // Create files
  console.log(chalk.green(`API created correctly`));
  console.log(chalk.green(`run de command node ./index.js`));
  console.log(chalk.green(`http://localhost:3000/api/example`));
  console.log(chalk.green(`http://localhost:3000/about`));
}

module.exports = { createApiExpress }

`use strict`;

const args = require(`minimist`)(process.argv.slice(2))
const fs = require(`fs`)
const chalk = require(`chalk`)
const util = require(`../utils/index.js`)

const componentsPath = `./components`
const responsePath = `./response`
const responsePathDirectory = `${responsePath}/response.js`
const indexPathDirectory = `./index.js`

const isProject = async () => {
  return fs.existsSync(`node_modules`)
}

/**
 * Create an end-point 
 * @param {*} name Name of end-point to create
 */
const createEndPoint = async (endPoints) => {
  try {

    endPoints.map(async item => {
      await util.createDirectory(`./components`)
      await util.createDirectory(`./components/${item}`)
      await util.createFile(`./components/${item}/network.js`, `network`)
      await util.createFile(`./components/${item}/controller.js`, `controller`)
    })

  } catch (error) {
    console.log(chalk.red(`[error]: ${error.message}`));
  }
}

/**
 * Crate a project
 */
const initProject = async () => {
  try {
    const directoryIsProject =  await isProject();
    if(!directoryIsProject){
      //Install dependencies
      await util.installDependencies()

      // Create directories
      await util.createDirectory(componentsPath)
      await util.createDirectory(responsePath)
      await util.createFile(responsePathDirectory, `response`)
    }

  } catch (error) {
    console.log(chalk.red(`[error]: ${error.message}`)); 
  }
}

/**
 * Create the index file for the API
 */
const createIndexFile = async () => {
  try {

    await util.creteIndexFile(indexPathDirectory, componentsPath)

  } catch (error) {
    console.log(chalk.red(`[error]: ${error.message}`)); 
  }
}

const printInstructions = () => {
  const components = fs.readdirSync(componentsPath);
  console.log(chalk.blueBright(' _                 _   _     _        _ '));
  console.log(chalk.blueBright('| |               | | (_)   | |      (_)'));
  console.log(chalk.blueBright('| |__   __ _ _   _| |_ _ ___| |_ __ _ _ '));
  console.log(chalk.blueBright('| \'_ \\ / _` | | | | __| / __| __/ _` | |'));
  console.log(chalk.blueBright('| |_) | (_| | |_| | |_| \\__ \\ || (_| | |'));
  console.log(chalk.blueBright('|_.__/ \\__,_|\\__,_|\\__|_|___/\\__\\__,_| |'));
  console.log(chalk.blueBright('                                    _/ |'));
  console.log(chalk.blueBright('                                   |__/ '));
  console.log(chalk.blueBright(`.`));
  console.log(chalk.blueBright(`API created correctly `));
  console.log(chalk.blueBright(`.`));
  console.log(chalk.blueBright(`Now run de command node ./index.js and access to the end-points created`));
  console.log(chalk.blueBright(`.`));
  console.log(chalk.blueBright(`http://localhost:3000/about`));
  components.map(component => {
    console.log(chalk.blueBright(`http://localhost:3000/api/${component}`));
  })
}

/**
 * Create example api with express
 */
const createApiExpress = async () => {
  const endPoints = args[`_`];
  
  await initProject()
  await createEndPoint(endPoints)
  await createIndexFile()

  // Create files
  printInstructions()
}


module.exports = { createApiExpress }

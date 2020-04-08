const chalk = require('chalk')

const { spawnSync } = require('child_process')
const fs = require('fs')

const handleError = (error) => {
  console.log(chalk.red(`[Error] ${error}`))
}

const handleErrorToCreateFile = (error) => {
  if (error){
    console.log(chalk.red(`[Error] ${error}`));
  }
  console.log(chalk.green(`File created correctly`));
}

const handleClose = (close) => {
  console.log(`stdout: ${close}`);
}

const indexHeader = `
const express = require('express')
const bodyParser = require('body-parser')
`
const indexConfiguration = `
// application
const app = express()

//parser
app.use(bodyParser.json())
`

const indexConfigServer = `
app.use('/about', (req, res)=>{
  res.status(200).send(
    {
      author: 'bautistaj',
      github: 'https://github.com/bautistaj'
    }
  )
});

app.listen(3000, () => {
  console.log(\`Api is listening in the port: http://localhost:3000/about\`)
})
`

const network = `const express = require('express')
const controller =  require('./controller')
const response = require('../../response/response')
const router = express.Router();

const list = async (req, res) => {
  try {
    const list = await controller.list();
    response.success(req, res,list, 200)
  } catch (error) {
    response.error(error)
  }
}

const create = async (req, res) => {
  try {
    const { body } = req;
    const data = await controller.create(body);
    response.success(req, res, data, 201)
  } catch (error) {
    response.error(req, res, error.message)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req;

    const data = await controller.update(id, body);
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message)
  }
}

const del = async (req, res) => {
  try { 
    const { id } = req.params

    const data = await controller.del(id);
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message)
  }
}

router.get('/', list);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;
`
const controller = `/**
* List elements
*/
const list = () => {
 return [];
}

/**
* Create element
* @param {*} data 
*/
const create = (data) => {
 return data;
}

/**
* Update an element
* @param {*} id 
* @param {*} data 
*/
const update = (id, data) => {
 return data;
}

/**
* Delete an element
* @param {*} id 
*/
const del = ( id ) => {
 return id;
}


module.exports = {
 list,
 create,
 update,
 del
}
`

const index = `
const express = require('express')
const bodyParser = require('body-parser')
const network = require('./components/example/network')

// application
const app = express()

//parser
app.use(bodyParser.json())

app.use('/api/example', network)
app.use('/about', (req, res)=>{
  res.status(200).send(
    {
      author: 'bautistaj',
      github: 'https://github.com/bautistaj'
    }
  )
});

app.listen(3000, () => {
  console.log(\`Api is listening in the port: http://localhost:3000/about\`)
})`

const response = `
/**
 * Handle success response
 * @param {*} req 
 * @param {*} res 
 * @param {*} message 
 * @param {*} status 
 */
const  success  = (req, res, message = 'Success', status = 200) => {
  res.status(status).send({
    error: false,
    status,
    body: message
  });
}

/**
 * Handle error response
 * @param {*} req 
 * @param {*} res 
 * @param {*} message 
 * @param {*} status 
 */
const error = (req, res, message = 'Internal server error', status = 500) => {
  res.status(status).send({
    error: false,
    status,
    body: message
  });
}

module.exports = {
  success,
  error
}`

const contents = {
  controller,
  network,
  index,
  response
}

const creteIndexFile = async (pathFile, componentsPath) =>{
  let indexImport = '';
  let indexConfigEndpoints = '';

  const components = fs.readdirSync(componentsPath);
  
  components.map(component => {
    indexImport += `const ${component}Network = require('./components/${component}/network') \n`
    indexConfigEndpoints += `app.use('/api/${component}', ${component}Network) \n`
  })

  const contentFile = `
  ${indexHeader}
  ${indexImport}
  ${indexConfiguration}
  ${indexConfigEndpoints}
  ${indexConfigServer}
  `

  if(fs.existsSync(pathFile)){
    await fs.unlinkSync(pathFile)
  }

  fs.appendFile(pathFile, contentFile, handleErrorToCreateFile)
}

const createFile = async (pathFile, type) => {
  if(!fs.existsSync(pathFile)){
    console.log(chalk.green(`Creating ${type} file`));
    fs.appendFileSync(pathFile, contents[type], handleErrorToCreateFile)
  }
}

const createDirectory = async (directory) => {
  if(!fs.existsSync(directory)){
    console.log(chalk.green(`Creating directory ${directory}`));
    fs.mkdirSync(directory);
  }
}


const installDependencies = async () => {
  try {

    console.log(chalk.green('Initializing  git ...'));
    await spawnSync('git', ['init']);
    console.log(chalk.green('Creating   gitignore ...'));
    await spawnSync('npx', ['gitignore','node']);
    console.log(chalk.green('Initializing  project ...'));
    await spawnSync('npm', ['init','-y']);
    console.log(chalk.green('Installing express ...'));
    await spawnSync('npm', ['install','express']);
    console.log(chalk.green('Installing body-parse ...'));
    await spawnSync('npm', ['install','body-parse']);
  } catch (error) {
    handleError(error)
  }
  
}

module.exports = {
  createFile,
  createDirectory,
  installDependencies,
  creteIndexFile
}



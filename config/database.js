const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()

const DBConnection = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}`, ).then(() => {
    mongoose.set('strictQuery', false);
    console.log('')
    console.log(chalk.bold.yellow(`~~~~ [ ${chalk.bold.green('💾 Successfully connected to DB 💾')} ] ~~~~`))
  }).catch(e => {
    console.log('')
    console.log(chalk.bold.red('~~~~ [ ERROR CONNECTING TO DB ] ~~~~'))
    console.log('')
    console.log(e)
  })
}

module.exports = DBConnection
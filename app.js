const express = require("express");
const app = express();
const chalk = require('chalk')
const fs = require('fs')
const DBConnection = require("./config/database");
const setCors = require("./middlewares/cors");
const bodyParser = require('body-parser');
const PORT = 8080

// Router paths:
const register = require('./routers/register')
const emailCheck = require('./routers/emailCheck')
// ---------

// Database connection: 
DBConnection()
// ---------

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCors);
app.use(bodyParser.json())
// --------

// Routers: 
app.use('/api', register)
app.use('/api', emailCheck)
// ---------


app.listen(PORT, () => {
  console.log("");
  console.log(chalk.bold.red(`~~~~ [ ${chalk.bold.green("API LIVE")} ] ~~~~`));
  console.log('');
  console.log(chalk.bold.red(`~~~~ [ ${chalk.bold.blue('Routes Stats')} ] ~~~~`))
  console.log('')
  const routes = {};
  const loadedRoutes = {};
  const promises = [];

  const routersDir = "./routers"; 
  fs.readdirSync(routersDir).forEach((file) => {
    if (file.endsWith(".js")) {
      var routeName = file.slice(0, -3);
      var routePath = `${routersDir}/${file}`;
      promises.push(
        new Promise((resolve, reject) => {
          try {
            const route = require(routePath);
            routes[routeName] = route;
            console.log(chalk.bold.blue(` - Loading route: ${routeName}`));
            console.log('')
            resolve();
          } catch (err) {
            console.error(
              chalk.bold.red(`Error loading route: ${routeName}`),
              err
            );
            reject();
          }
        })
      );
    }
  });

  Promise.all(promises)
    .then(() => {
      loadedRoutes.status = "successful";
      console.log(chalk.bold.green("✅ All routes loaded successfully!"));
    })
    .catch((err) => {
      loadedRoutes.status = "failed";
      console.error(chalk.bold.red("❌ Route loading failed:"), err);
    });
});
// --------

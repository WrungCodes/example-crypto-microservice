const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

function registerEvents(event, configuration, usecases, repositories, services ) {
  
    fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      require(path.join(__dirname, file))(event, configuration, usecases, repositories, services );
    });

    console.log(`started listening for all events`);
}

module.exports = registerEvents;
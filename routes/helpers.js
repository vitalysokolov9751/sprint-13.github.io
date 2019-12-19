const fs = require('fs');

// eslint-disable-next-line func-names
const readDataFromFile = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = readDataFromFile;

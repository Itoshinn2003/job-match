const path = require('path');

module.exports = function (modulePath) {
  return path.join(
    path.dirname(modulePath),
    path.basename(modulePath, path.extname(modulePath)) + '.js'
  );
};
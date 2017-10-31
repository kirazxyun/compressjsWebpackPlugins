const tmp = require('tmp')
const fs = require('fs')

function update(filename, newContent) {
  fs.writeFileSync(filename, newContent, 'utf-8');
}

module.exports = {
  create(content) {
    const filename = tmp.fileSync().name
    update(filename, content);
    return filename
  },

  remove(filename) {
    fs.unlinkSync(filename)
  },

  update,

  read(filename) {
    return fs.readFileSync(filename, 'utf-8')
  }
};
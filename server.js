const http = require('http')
const fs = require('fs')

const s = http.createServer((req, res) => {
  try {
    console.log(req.url)
    const source = fs.createReadStream('./static' + req.url);
    source.pipe(res);
  } catch (e) {
    console.log(e);
    res.writeHead(404);
    res.end('Not Found');
  }
})

s.listen(80, () => console.log('...'));

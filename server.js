const http = require('http');
const fs = require('fs');

// Http Server
const s = http.createServer((req, res) => {
  const source = fs.createReadStream('./static' + req.url);
  source.on('error', e => notFound(res));
  res.writeHead(200, {'content-type':`text/${filetype(req.url)}` });
  source.pipe(res);
});

// Helper Functions
const filetype = path => path.split('.').slice(-1)[0];
const notFound = res => res.writeHead(404).end('Not Found');

s.listen(80, () => console.log('...'));

import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('Here')
  res.statusCode = 200;
  res.end('Ok');
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

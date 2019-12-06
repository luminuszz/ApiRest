const server = require('./server');
const PORT = 3000;
const HOST = '0.0.0.0';


server.listen(PORT, HOST || process.env.PORT);

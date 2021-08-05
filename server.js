const env = require('./env');
const app = require('./index');
const port = process.env.PORT || env.srvPort;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
require("dotenv/config");
const createServer = require("./utils/server");

const app = createServer();

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

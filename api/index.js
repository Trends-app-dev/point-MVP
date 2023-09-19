const { PORT } = require("./config");
const appSocket = require("./src/app");
const { conn } = require("./src/db");
const { addAdmin } = require("./src/helpers/createUser");

appSocket.listen(SV_PORT, async () => {
  await conn.sync({ alter: true });
  await addAdmin();
  console.log(`Server listen on ${PORT}`); // eslint-disable-line no-console
});

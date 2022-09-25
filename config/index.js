// fetch dotenv as a requirement
require('dotenv').config();

// export them for use
module.exports = {
  SECRET: process.env.APP_SECRET,
  DB: process.env.APP_DB,
  PORT: process.env.PORT,
};

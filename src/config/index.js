require('dotenv').config();

let config = {
  port: process.env.PORT,
  cookie_key: process.env.COOKIE_KEY,
  secret_key: process.env.SECRET_KEY,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_secret_key: process.env.GITHUB_SECRET_KEY,
  github_callback_url: process.env.GITHUB_CALLBACK_URL,
};

let db = {
  mongo_local: process.env.MONGO_LOCAL,
  mongo_atlas: process.env.MONGO_ATLAS,
  dbName: process.env.DB_NAME,
};

module.exports = {
  config,
  db,
};

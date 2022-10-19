const randomToken = require("random-token");

const TOKEN_LENGTH = 20;

const userInput = {
  username: "test",
  password: "test",
};

const userPayload = {
  data: {
    id: expect.any(String),
    username: "username",
    password: "password",
    token: randomToken(TOKEN_LENGTH),
    created_at: "2020-05-01T00:00:00Z",
    updated_at: "2020-05-01T00:00:00Z",
  },
};

module.exports = { userInput, userPayload };

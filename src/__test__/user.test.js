const supertest = require("supertest");
const createServer = require("../utils/server");
const userService = require("../services/user_service");
const { userInput, userPayload } = require("../fixtures/user.fixtures");
const { truncateDatabase } = require("../utils/db");

const app = createServer();

describe("User", () => {
  AfterAll(async () => {
    await truncateDatabase();
  });

  describe("user registeration", () => {
    it("should return the user payload with status code 201", async () => {
      const createUserServiceMock = jest
        .spyOn(userService, "createUser")
        .mockReturnValueOnce(userPayload);

      const response = await supertest(app)
        .post("/api/v1/user/register")
        .send(userInput)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(userPayload);

      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    });

    it("should return an error with status code 400", async () => {
      const createUserServiceMock = jest
        .spyOn(userService, "createUser")
        .mockImplementation(() => {
          throw new Error("user already exists");
        });

      const response = await supertest(app)
        .post("/api/v1/user/register")
        .send(userInput)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("user already exists");

      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    });
  });

  describe("user login", () => {
    it("should return the user payload with status code 200", async () => {
      const authenticateUserServiceMock = jest
        .spyOn(userService, "authenticateUser")
        .mockReturnValueOnce(userPayload);

      const response = await supertest(app)
        .post("/api/v1/user/login")
        .send(userInput)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(userPayload);

      expect(authenticateUserServiceMock).toHaveBeenCalledWith(userInput);
    });

    it("should return an error with status code 400", async () => {
      const authenticateUserServiceMock = jest
        .spyOn(userService, "authenticateUser")
        .mockImplementation(() => {
          throw new Error("Invalid username or password");
        });

      const response = await supertest(app)
        .post("/api/v1/user/login")
        .send(userInput)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid username or password");

      expect(authenticateUserServiceMock).toHaveBeenCalledWith(userInput);
    });
  });
});

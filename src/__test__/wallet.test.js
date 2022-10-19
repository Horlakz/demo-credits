const supertest = require("supertest");
const createServer = require("../server");
const userService = require("../services/user_service");
const { userInput } = require("../fixtures/user.fixtures");
const { truncateDatabase } = require("../db/utils");

const app = createServer();

describe("Wallet", () => {
  afterAll(async () => {
    await truncateDatabase();
  });

  describe("wallet creation", () => {
    it("should return the wallet payload with status code 201", async () => {
      const user = await userService.createUser(userInput);

      const response = await supertest(app)
        .post("/api/v1/wallet")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.status).toBe(201);
    });
  });

  describe("wallet details", () => {
    it("should return the wallet details with status code 200", async () => {
      const user = await userService.authenticateUser(userInput);

      const response = await supertest(app)
        .get("/api/v1/wallet")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.status).toBe(200);
    });
  });

  describe("fund wallet", () => {
    it("should return the wallet details with status code 200", async () => {
      const user = await userService.authenticateUser(userInput);

      const response = await supertest(app)
        .post("/api/v1/wallet/fund")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${user.token}`)
        .send({ amount: 1000 });

      expect(response.status).toBe(200);
    });
  });

  describe("withdraw from wallet", () => {
    it("should return the wallet details with status code 200", async () => {
      const user = await userService.authenticateUser(userInput);

      const response = await supertest(app)
        .post("/api/v1/wallet/withdraw")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${user.token}`)
        .send({ amount: 700 });

      expect(response.status).toBe(200);
    });
  });

  describe("transfer to wallet", () => {
    it("should return the wallet details with status code 200", async () => {
      const newUser = await userService.createUser({
        username: "test2",
        password: "test2",
      });
      const user = await userService.authenticateUser(userInput);

      const response = await supertest(app)
        .post("/api/v1/wallet/transfer")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${user.token}`)
        .send({ amount: 100, username: "test2" });

      expect(response.status).toBe(200);
    });

    it("should return the wallet details with status code 400", async () => {
      const user = await userService.authenticateUser(userInput);

      const response = await supertest(app)
        .post("/api/v1/wallet/transfer")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${user.token}`)
        .send({ amount: 10000, username: "test2" });

      expect(response.status).toBe(400);
    });
  });
});

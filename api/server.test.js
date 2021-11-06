const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
const brcrypt = require("bcryptjs");

const leto = {
  username: "dukeletoatreides",
  password: "1234",
};
const hash = brcrypt.hashSync(leto.password, 8);

const gurney = {
  username: "gurneyhalleck",
  password: "1234",
};

const invalidUser = {
  name: "",
  password: "1234",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert({ username: leto.username, password: hash });
});

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

test("is the correct env for tests", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("[POST] /api/auth/register", () => {
  it("responds with 201 with good payload", async () => {
    const res = await request(server).post("/api/auth/register").send(gurney);
    expect(res.status).toBe(201);
  });
  it("responds with 422 with invalid payload", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send(invalidUser);
    expect(res.status).toBe(422);
  });
  it("responds with newly created user", async () => {
    const res = await request(server).post("/api/auth/register").send(gurney);
    expect(res.body.id).toBe(2);
    expect(res.body.username).toBe("gurneyhalleck");
  });
});

describe("[POST] /api/auth/login", () => {
  it("responds with a token if credentials are valid", async () => {
    const res = await request(server).post("/api/auth/login").send(leto);
    expect(res.body.token).toBeDefined();
  });
  it("responds with 401 invalid credentials if credentials are invalid", async () => {
    const res = await request(server).post("/api/auth/login").send(gurney);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("invalid credentials");
  });
});

describe("[GET] /api/jokes", () => {
  it("responds with 401 token required if no token send in auth headers", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("token required");
  });
  it("responds with correct number of jokes on login with valid creds", async () => {
    const login = await request(server).post("/api/auth/login").send(leto);
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", login.body.token);
    expect(res.body).toHaveLength(3);
  });
});

const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const leto = {
  username: "dukeletoatreides",
  password: "1234",
};

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
  await db("users").insert(leto);
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

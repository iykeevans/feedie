// sum.test.js
import { expect, describe, it } from "vitest";
import { getRandomUsers } from "./index";

describe("Random users test suite", async () => {
  //   expect(sum(1, 2)).toBe(3)
  const { data: response } = await getRandomUsers();
  console.log(response);

  it("should successfully fetch users", () => {
    expect(response.results).toBeTruthy();
  });

  it("should get 5 random users", () => {
    expect(response.results.length).toEqual(5);
  });

  it("should contain email", () => {
    expect(Object.keys(response.results[0])).toContain("email");
  });
});

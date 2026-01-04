const sum = require("../src/sum");

describe("sum function", () => {
  it("should sum two numbers correctly", () => {
    expect(sum(2, 3)).toBe(5);
  });
});

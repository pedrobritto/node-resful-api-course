const { fizzBuzz } = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw error if input not a number", () => {
    const args = [[], "", {}];

    args.map(a => {
      expect(() => fizzBuzz(a)).toThrow();
    });
  });

  it("should return FizzBuzz if input divisible by 3 and 5", () => {
    const result = fizzBuzz(15);
    expect(result).toEqual("FizzBuzz");
  });

  it("should return Fizz if input is divisible by 3 only", () => {
    const result = fizzBuzz(3);
    expect(result).toEqual("Fizz");
  });

  it("should return Buzz if input is divisible by 5 only", () => {
    const result = fizzBuzz(5);
    expect(result).toEqual("Buzz");
  });

  it("should return the input if it is not divisible by 3 or 5", () => {
    expect(fizzBuzz(1)).toBe(1);
  });
});

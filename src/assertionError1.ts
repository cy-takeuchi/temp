// function assertIsString(val: any): asserts val is string {
const assertIsString: (val: any) => asserts val is string = (val) => {
  if (typeof val !== "string") {
    throw new Error("Not a string!");
  }
};

(() => {
  // const value: string | number = 3;
  const value: string | number = "3";

  console.log(value);

  assertIsString(value);

  console.log(value);
})();

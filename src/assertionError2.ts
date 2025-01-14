import { AssertionError } from "assert";

const isPc = () => location.pathname.indexOf("/m/") === -1;

const getApp = () => {
  return isPc() ? kintone.app.getId() : kintone.mobile.app.getId();
};

const exists = <T>(v: T): v is NonNullable<T> => {
  return v !== undefined && v !== null;
};

const assertIsDefined: <T>(v: T) => asserts v is NonNullable<T> = (v) => {
  if (!exists(v)) {
    throw new AssertionError({
      message: `Expected 'value' to be defined, but received ${v}`,
    });
  }
};

(() => {
  // const app = getApp();
  // const app = null;
  const app = 123;

  assertIsDefined(app);

  console.log(app);
})();

import React, { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const fetchMessage = async (trueOrFalse: boolean) => {
  const endPoint = trueOrFalse
    ? "https://catfact.ninja/fact"
    : "https://ooooooo.cybozu.com/";

  await sleep(2000);

  const res = await fetch(endPoint);
  const text = await res.text();
  return text;
};

type Message19Props = {
  messagePromise: Promise<string>;
};
const Message19 = (props: Message19Props) => {
  const { messagePromise } = props;

  const message = use(messagePromise);

  return <div>message: {message}</div>;
};

type App19Props = {
  trueOrFalse: boolean;
};
export const App19 = (props: App19Props) => {
  const { trueOrFalse } = props;

  const messagePromise = fetchMessage(trueOrFalse);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Message19 messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
};

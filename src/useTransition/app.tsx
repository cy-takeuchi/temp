import {
  startTransition,
  StrictMode,
  Suspense,
  useActionState,
  useState,
  useTransition,
} from "react";
import ReactDOM from "react-dom/client";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { err, ok, Result, ResultAsync } from "neverthrow";
import { error } from "console";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const fetchFields = async (trueOrFalse: boolean) => {
  const endPoint = trueOrFalse
    ? "https://catfact.ninja/fact"
    : "https://ooooooo.cybozu.com/";

  await sleep(1000);

  const res = await fetch(endPoint);
  const text = await res.text();
  return text;
};

type AppProps = { trueOrFalse: boolean };

const App1 = ({ trueOrFalse }: AppProps) => {
  const [appId, setAppId] = useState("1");
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await fetchFields(trueOrFalse);
      setData(res);
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("unknown error");
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="appId"
          size="small"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
        />
        <Button onClick={onClick} variant="contained" disabled={isLoading}>
          Get
        </Button>
      </Stack>
      {isLoading && <CircularProgress size={24} />}
      {data !== "" && <Alert severity="success">{data}</Alert>}
      {error !== "" && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};

// const App2 = ({ trueOrFalse }: AppProps) => {
//   const [appId, setAppId] = useState("2");
//   const [data, setData] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const [isLoading, startTransition] = useTransition();

//   const onClick = async () => {
//     startTransition(async () => {
//       const res = await fetchFields(trueOrFalse);
//       setData(res);
//       // try {
//       //   const res = await fetchFields(trueOrFalse);
//       //   setData(res);
//       // } catch (error) {
//       //   console.log({ error });
//       //   if (error instanceof Error) {
//       //     setError(error.message);
//       //   } else {
//       //     setError("unknown error");
//       //   }
//       //   return;
//       // }
//     });
//   };

//   return (
//     <Stack spacing={2} sx={{ p: 4 }}>
//       <Stack direction="row" spacing={2}>
//         <TextField
//           value={appId}
//           onChange={(e) => setAppId(e.target.value)}
//           label="appId"
//           size="small"
//         />
//         <Suspense fallback={<h1>🌀 Loading...</h1>}>
//           <Button onClick={onClick} variant="contained" disabled={isLoading}>
//             Get
//           </Button>
//         </Suspense>
//       </Stack>
//       {isLoading && <CircularProgress size={24} />}
//       {data !== "" && <Alert severity="success">{data}</Alert>}
//       {error !== "" && <Alert severity="error">{error}</Alert>}
//     </Stack>
//   );
// };

const onClick2 = async (trueOrFalse: boolean) => {
  try {
    const res = await fetchFields(trueOrFalse);
    return { data: res, error: "" };
  } catch (error) {
    console.log({ error });
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "unknown error";
    }
    return { data: "", error: errorMessage };
  }
};

const App2 = ({ trueOrFalse }: AppProps) => {
  const [appId, setAppId] = useState("2");

  const [state, formAction, isLoading] = useActionState(
    () => onClick2(trueOrFalse),
    { data: "", error: "" }
  );
  console.log({ state });

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          label="appId"
          size="small"
        />
        <Button
          onClick={() => startTransition(formAction)}
          variant="contained"
          disabled={isLoading}
        >
          Get
        </Button>
      </Stack>
      {isLoading && <CircularProgress size={24} />}
      {!isLoading && state.data !== "" && (
        <Alert severity="success">{state.data}</Alert>
      )}
      {!isLoading && state.error !== "" && (
        <Alert severity="error">{state.error}</Alert>
      )}
    </Stack>
  );
};

const onClick3 = async (trueOrFalse: boolean) => {
  return ResultAsync.fromPromise(fetchFields(trueOrFalse), (error) => {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    }

    return "unknown error";
  });
};

const App3 = ({ trueOrFalse }: AppProps) => {
  const [appId, setAppId] = useState("3");

  const [state, formAction, isLoading] = useActionState(
    () => onClick3(trueOrFalse),
    null
  );
  console.log({ state });

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          label="appId"
          size="small"
        />
        <Button
          onClick={() => startTransition(formAction)}
          variant="contained"
          disabled={isLoading}
        >
          Get
        </Button>
      </Stack>
      {isLoading && <CircularProgress size={24} />}
      {!isLoading && state?.isOk() && (
        <Alert severity="success">{state.value}</Alert>
      )}
      {!isLoading && state?.isErr() && (
        <Alert severity="error">{state.error}</Alert>
      )}
    </Stack>
  );
};

{
  {
    const root = document.querySelector("#root1_success");
    if (root !== null && root.childNodes.length === 0) {
      ReactDOM.createRoot(root).render(
        <StrictMode>
          <App1 trueOrFalse={true} />
        </StrictMode>
      );
    }
  }
  {
    const root = document.querySelector("#root1_failure");
    if (root !== null && root.childNodes.length === 0) {
      ReactDOM.createRoot(root).render(
        <StrictMode>
          <App1 trueOrFalse={false} />
        </StrictMode>
      );
    }
  }

  {
    const root = document.querySelector("#root2_success");
    if (root !== null && root.childNodes.length === 0) {
      ReactDOM.createRoot(root).render(
        <StrictMode>
          <App2 trueOrFalse={true} />
        </StrictMode>
      );
    }
  }
  {
    const root = document.querySelector("#root2_failure");
    if (root !== null && root.childNodes.length === 0) {
      ReactDOM.createRoot(root).render(
        <StrictMode>
          <App2 trueOrFalse={false} />
        </StrictMode>
      );
    }
  }

  {
    const root = document.querySelector("#root3_success");
    if (root !== null && root.childNodes.length === 0) {
      ReactDOM.createRoot(root).render(
        <StrictMode>
          <App3 trueOrFalse={true} />
        </StrictMode>
      );
    }
  }
  {
    const root = document.querySelector("#root3_failure");
    if (root !== null && root.childNodes.length === 0) {
      ReactDOM.createRoot(root).render(
        <StrictMode>
          <App3 trueOrFalse={false} />
        </StrictMode>
      );
    }
  }
}

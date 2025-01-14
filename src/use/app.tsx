import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App19 } from "./react19";

{
  const root19_success = document.querySelector("#react19_success");
  if (root19_success !== null && root19_success.childNodes.length === 0) {
    ReactDOM.createRoot(root19_success).render(
      <StrictMode>
        <App19 trueOrFalse />
      </StrictMode>
    );
  }

  const root19_failure = document.querySelector("#react19_failure");
  if (root19_failure !== null && root19_failure.childNodes.length === 0) {
    ReactDOM.createRoot(root19_failure).render(
      <StrictMode>
        <App19 trueOrFalse={false} />
      </StrictMode>
    );
  }
}

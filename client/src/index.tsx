import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <div id="modal" />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

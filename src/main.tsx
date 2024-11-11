import "dreamland/dev";
import { Route, Router } from "dreamland-router";
import Home from "./routes/home";
import Login from "./routes/login";
import ViewClip from "./routes/viewclip";
import Error404 from "./routes/error404";
import "./tailwind.css";
import "./browser.css";

let router = new Router(
  (
    <Route>
      <Route path="/" show={<Home />} />
      <Route path="/login" show={<Login />} />
      <Route path="/c/:id" show={<ViewClip />} />
      <Route path="*" show={<Error404 />} />
    </Route>
  )
);
router.mount(document.getElementById("app")!);

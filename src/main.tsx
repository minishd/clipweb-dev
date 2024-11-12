import "dreamland/dev";
import { Route, Router } from "dreamland-router";
import Home from "./routes/home";
import Login from "./routes/login";
import ViewClip from "./routes/viewclip";
import Error404 from "./routes/error404";
import "./tailwind.css";
import "./browser.css";

const Root: Component<{}, { outlet?: HTMLElement }> = function () {
  return <div>{use(this.outlet)}</div>;
};

let router = new Router(
  (
    <Route>
      <Route path="/" show={<Root />}>
        <Route path="" show={<Home />} />
        <Route path="login" show={<Login />} />
        <Route path="c/:id" show={<ViewClip />} />
        <Route path="*" show={<Error404 />} />
      </Route>
    </Route>
  )
);
router.mount(document.getElementById("app")!);

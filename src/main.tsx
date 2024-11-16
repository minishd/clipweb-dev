import "dreamland/dev";
import { Route, Router } from "dreamland-router";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";
import ViewClip from "./routes/viewclip";
import PageNotFound from "./routes/page-not-found";
import "./tailwind.css";
import "./browser.css";
import "iconify-icon";
import { state } from "./state";

const NavBar: Component = function () {
  return (
    <div class="w-full pb-1.5 py-2 flex justify-between">
      <h1 class="text-xl font-bold">clip album</h1>
      <h1 class="text-md font-">
        <iconify-icon icon="fa:user" />{" "}
        {use(state.claimsCache, (cc) =>
          !!cc ? cc.username : "you're logged out!"
        )}
      </h1>
    </div>
  );
};

const Root: Component<{}, { outlet?: HTMLElement }> = function () {
  return (
    <div>
      <div id="bg" />
      <div class="relative p-5 pt-1">
        <NavBar />
        <div>{use(this.outlet)}</div>
      </div>
    </div>
  );
};

export let router = new Router(
  (
    <Route>
      <Route path="/" show={<Root />}>
        <Route path="" show={<Home />} />
        <Route path="login" show={<Login />} />
        <Route path="register" show={<Register />} />
        <Route path="c/:id" show={<ViewClip />} />
        <Route path="*" show={<PageNotFound />} />
      </Route>
    </Route>
  )
);
router.mount(document.getElementById("app")!);

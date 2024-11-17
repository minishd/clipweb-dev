import "dreamland/dev";
import { Link, Route, Router } from "dreamland-router";
import Home from "./routes/home";
import ViewClip from "./routes/viewclip";
import PageNotFound from "./routes/page-not-found";
import "./tailwind.css";
import "./browser.css";
import "iconify-icon";
import { state } from "./state";
import AuthPage from "./routes/auth";

const NavBar: Component = function () {
  return (
    <div class="w-full pb-2 py-2 flex justify-between">
      <h1 class="text-xl font-bold">
        <Link href="/">clip album</Link>
      </h1>
      <h1 class="text-md font-medium">
        {use(state.claimsCache, (cc) =>
          !!cc ? cc.username : "you're logged out!"
        )}{" "}
        <iconify-icon icon="fa:user" />
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
        <Route path="login" show={<AuthPage />} />
        <Route path="register" show={<AuthPage register />} />
        <Route path="c/:id" show={<ViewClip />} />
        <Route path="*" show={<PageNotFound />} />
      </Route>
    </Route>
  )
);
router.mount(document.getElementById("app")!);

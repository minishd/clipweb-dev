import { AxiosError } from "axios";
import { api } from "../api";
import { Link } from "dreamland-router";
import { sha256 } from "../util";
import { router } from "../main";

const LoginForm: Component<
  {},
  {
    username: string;
    password: string;
    error: string;
  }
> = function () {
  this.username = this.password = this.error = "";

  const doLogin = async () => {
    if (!this.username || !this.password) return "a field is empty";

    try {
      await api.login(this.username, await sha256(this.password));
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.status) {
          case 404:
            return "user not found";
          case 401:
            return "incorrect password";
        }
      }
      return "unknown error?";
    }

    router.navigate("/");

    return "";
  };

  return (
    <div class="ring-1 ring-zinc-50 py-4 px-6 bg-zinc-950/65">
      <div>
        <h1 class="text-2xl font-semibold underline underline-offset-2">
          Log In
        </h1>
      </div>

      <h2>username</h2>
      <input
        type="text"
        class="mt-1 mb-2 w-64"
        bind:value={use(this.username)}
        minlength="3"
        maxlength="20"
      />
      <br />

      <h2>password</h2>
      <input
        type="password"
        class="mt-1 mb-2 w-64"
        bind:value={use(this.password)}
      />
      <br />

      <div class="flex gap-3 items-center">
        <button
          class="mt-2 mb-2 w-20"
          on:click={async () => (this.error = await doLogin())}
        >
          sign in
        </button>
        {$if(
          use(this.error.length),
          <h3 class="text-red-400">{use(this.error)}</h3>,
          <p>
            or,{" "}
            <Link href="/register" class="hl">
              register
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

const Login: Component = function () {
  return (
    <div>
      <div class="fixed bottom-0 left-0 p-2 text-zinc-400 bg-zinc-950/15">
        <p>clip album v0.1.0</p>
      </div>
      <div class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

import { AxiosError } from "axios";
import { api } from "../api";
import { Link } from "dreamland-router";
import { sha256, sleep } from "../util";
import { router } from "../main";

const AuthForm: Component<
  {
    register?: boolean;
  },
  {
    username: string;
    password: string;
    invite: string;
    status: string;
    success: boolean;
  }
> = function () {
  const reset = () => {
    this.username = this.password = this.invite = this.status = "";
    this.success = false;
  }

  reset();

  const doRegister = async () => {
    try {
      await api.register(
        this.username,
        await sha256(this.password),
        this.invite
      );

      this.success = true;
      this.status = "account created!";

      await sleep(1000);

      reset();
      router.navigate("/login");
    } catch (err) {
      this.success = false;

      if (err instanceof AxiosError) {
        switch (err.status) {
          case 404:
            this.status = "invite not found";
            return;
          case 410:
            this.status = "invite already used";
            return;
        }
      }

      this.status = "unknown error?";
    }
  };

  const doLogin = async () => {
    try {
      await api.login(this.username, await sha256(this.password));

      this.success = true;
      this.status = "logged in!";

      reset();
      router.navigate("/");
    } catch (err) {
      this.success = false;

      if (err instanceof AxiosError) {
        switch (err.status) {
          case 404:
            this.status = "user not found";
            return;
          case 401:
            this.status = "incorrect password";
            return;
        }
      }

      this.status = "unknown error?";
    }
  };

  const doAuth = async () => {
    if (!this.username || !this.password || (this.register && !this.invite)) {
      this.success = false;
      this.status = "a field is empty";
      return;
    }

    if (this.register) {
      await doRegister();
    } else {
      await doLogin();
    }
  };

  return (
    <div class="ring-1 ring-zinc-50 py-4 px-6 bg-zinc-950/65 shadow-black shadow-md">
      <div>
        <h1 class="text-2xl font-semibold underline underline-offset-2">
          {this.register ? "Register" : "Log In"}
        </h1>
      </div>

      <form
        on:submit={async (ev: SubmitEvent) => {
          ev.preventDefault();
          await doAuth();
        }}
      >
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

        {$if(
          this.register,
          <>
            <h2>registration invite</h2>
            <input
              type="text"
              class="mt-1 mb-2 w-64"
              bind:value={use(this.invite)}
            />
            <br />
          </>
        )}

        <div class="flex gap-3 items-center">
          <input
            type="submit"
            value={this.register ? "register" : "sign in"}
            class="mt-2 mb-2 w-20"
          />
          {$if(
            use(this.status.length),
            <h3 class={use(this.success, (v) => (!v ? "text-red-400" : ""))}>
              {use(this.status)}
            </h3>,
            <p>
              or,{" "}
              {$if(
                this.register,
                <Link href="/login" class="hl">
                  log in
                </Link>,
                <Link href="/register" class="hl">
                  register
                </Link>
              )}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

const AuthPage: Component<{ register?: boolean }> = function () {
  return (
    <div>
      <div class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
        <AuthForm register={this.register} />
      </div>
    </div>
  );
};

export default AuthPage;

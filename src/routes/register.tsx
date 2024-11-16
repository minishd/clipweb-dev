import { AxiosError } from "axios";
import { api } from "../api";
import { Link } from "dreamland-router";
import { sha256 } from "../util";

const RegisterForm: Component<
  {},
  {
    username: string;
    password: string;
    invite: string;
    status: string;
    success: boolean;
  }
> = function () {
  this.username = this.password = this.invite = this.status = "";

  const doRegister = async () => {
    if (!this.username || !this.password || !this.invite) {
      this.success = false;
      this.status = "a field is empty";
      return;
    }

    try {
      await api.register(
        this.username,
        await sha256(this.password),
        this.invite
      );

      this.success = true;
      this.status = "account created!";
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

  return (
    <div class="ring-1 ring-zinc-50 py-4 px-6 bg-zinc-950/65">
      <div>
        <h1 class="text-2xl font-semibold underline underline-offset-2">
          Register
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

      <h2>registration invite</h2>
      <input type="text" class="mt-1 mb-2 w-64" bind:value={use(this.invite)} />
      <br />

      <div class="flex gap-3 items-center">
        <button
          class="mt-2 mb-2 w-20"
          on:click={async () => await doRegister()}
        >
          register
        </button>
        {$if(
          use(this.status.length),
          <h3 class={use(this.success, (v) => (!v ? "text-red-400" : ""))}>
            {use(this.status)}
          </h3>,
          <p>
            or,{" "}
            <Link href="/login" class="hl">
              log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

const Register: Component = function () {
  return (
    <div>
      <div class="fixed bottom-0 left-0 p-2 text-zinc-400 bg-zinc-950/15">
        <p>clip album v0.1.0</p>
      </div>
      <div class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;

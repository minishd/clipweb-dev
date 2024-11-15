const LoginForm: Component = function () {
  return (
    <div class="ring-1 ring-zinc-50 pl-5 pr-5 pb-2 pt-3">
      <div>
        <h1 class="text-2xl underline underline-offset-2">Log In</h1>
      </div>

      <h2>username</h2>
      <input type="text" class="mt-1 mb-2" />
      <br />

      <h2>password</h2>
      <input type="password" class="mt-1 mb-2" />
      <br />

      <button class="mt-2 mb-2" on:click={() => alert("okay")}>
        submit
      </button>
    </div>
  );
};

const Login: Component = function () {
  return (
    <div>
      <div class="absolute bottom-0 left-0 p-2 text-zinc-300 bg-inherit">
        <p>clip album v0.1.0</p>
      </div>
      <div class="flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

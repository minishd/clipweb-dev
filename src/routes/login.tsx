const LoginForm: Component = function () {
  return (
    <div class="ring-1 ring-zinc-50 pl-5 pr-5 pb-3 pt-3 flex flex-col items-center text-center">
      <span class="w-full">
        <div class="mb-3">
          <h1 class="text-2xl">welcome! </h1>
          <h2 class="text-lg">please log in</h2>
        </div>
        <input type="text" placeholder="your username.." />
        <br />
        <input type="password" placeholder="a password.." />
        <br />
        <button
          class="ring-zinc-50 ring-1 pl-1 pr-1 m-2 cursor-default hover:ring-2"
          on:click={() => alert("okay")}
        >
          submit
        </button>
      </span>
    </div>
  );
};

const Login: Component = function () {
  return (
    <span>
      <p class="absolute h-screen p-2 flex items-end justify-start text-zinc-600">clip album v0.1.0</p>
      <div class="flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </span>
  );
};

export default Login;

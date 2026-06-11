<script>
  let { form } = $props();
</script>

<div class="max-w-sm mx-auto mt-16">
  <h1 class="text-[#0d1117] text-4xl font-black tracking-tight text-center mb-6">Revi</h1>

  {#if form?.error}
    <p class="bg-red-50 border border-red-200 text-red-600 rounded px-4 py-3 mb-4 text-sm text-center">
      {form.error}
    </p>
  {/if}

  <form action="?/login" method="POST" class="bg-white border border-gray-300 rounded p-10 flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <input type="text" name="username" required
        placeholder="Phone number, username, or email"
        class="border border-gray-300 rounded bg-gray-50 px-3 py-2 text-xs focus:outline-none focus:border-gray-400 placeholder-gray-400"
      />
    </div>
    <div class="flex flex-col gap-1">
      <input type="password" name="password" required
        placeholder="Password"
        class="border border-gray-300 rounded bg-gray-50 px-3 py-2 text-xs focus:outline-none focus:border-gray-400 placeholder-gray-400"
      />
    </div>
    <button type="submit"
      class="bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-1.5 text-sm font-semibold transition cursor-pointer mt-1">
      Log in
    </button>
    <div class="flex items-center gap-3 my-1">
      <span class="flex-1 h-px bg-gray-300"></span>
      <span class="text-xs font-semibold text-gray-400 tracking-widest">OR</span>
      <span class="flex-1 h-px bg-gray-300"></span>
    </div>
    <p class="text-sm text-gray-500 text-center">
      Don't have an account? <a href="/register" class="text-pink-500 font-semibold hover:underline">Sign up</a>
    </p>
  </form>
</div>
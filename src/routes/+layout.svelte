<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  let { children, data } = $props();
</script>

<!-- Global Site Wrapper -->
<div class="flex min-h-screen flex-col bg-pink-50/70 antialiased selection:bg-pink-200 selection:text-pink-950">
  <!-- Navigation Bar -->
  <nav class="sticky top-0 z-50 border-b border-pink-100 bg-white/85 backdrop-blur-xl">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/30 transition-transform group-hover:scale-105">
          <span class="text-2xl font-black tracking-tighter">R</span>
        </div>
        <span class="text-3xl font-black tracking-tighter text-pink-950">Revi</span>
      </a>

      <!-- Navigation Links -->
      <div class="flex items-center gap-8 text-sm font-semibold">
        {#if data?.user}
          <!-- Logged In State -->
          <div class="flex items-center gap-8">
            <!-- Upload Button -->
            <a
              href="/upload"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-pink-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-pink-500/25 transition-all duration-200 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/40 active:scale-[0.97]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Upload
            </a>

            <!-- Profile -->
            <a
              href="/profile/{data.user.id}"
              class="group flex items-center gap-3 rounded-2xl py-1 pr-3 transition-all hover:bg-pink-100"
            >
              <!-- Avatar -->
              <div class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl border border-pink-200 bg-pink-50 text-sm font-bold uppercase text-pink-600 ring-2 ring-white transition-all group-hover:ring-pink-200 group-hover:bg-pink-100">
                {data.user.username[0]}
              </div>
              <div class="hidden md:block">
                <div class="font-semibold text-pink-950">{data.user.username}</div>
                <div class="text-[10px] text-pink-400 -mt-0.5">View profile</div>
              </div>
            </a>

            <!-- Logout -->
            <form method="POST" action="/?/logout">
              <button
                class="rounded-xl px-5 py-2 text-sm font-medium text-pink-400 transition-all hover:bg-pink-100 hover:text-rose-500"
              >
                Logout
              </button>
            </form>
          </div>
        {:else}
          <!-- Logged Out State -->
          <div class="flex items-center gap-4">
            <a
              href="/login"
              class="rounded-2xl px-6 py-2.5 font-semibold text-pink-700 transition-colors hover:text-pink-900 hover:bg-pink-100"
            >
              Log in
            </a>
            <a
              href="/register"
              class="inline-flex items-center justify-center rounded-2xl bg-pink-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:bg-pink-600 hover:shadow-xl active:scale-[0.97]"
            >
              Get started
            </a>
          </div>
        {/if}
      </div>
    </div>
  </nav>

  <!-- Page Content -->
  <main class="mx-auto w-full max-w-7xl flex-grow px-6 py-10 sm:py-14">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="mt-auto border-t border-pink-100 bg-white py-10">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex flex-col items-center justify-between gap-6 border-t border-pink-100 pt-8 text-xs text-pink-400 sm:flex-row">
        <p class="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Revi. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-pink-600 transition-colors">Privacy</a>
          <a href="#" class="hover:text-pink-600 transition-colors">Terms</a>
          <a href="#" class="hover:text-pink-600 transition-colors">Support</a>
        </div>
      </div>
    </div>
  </footer>
</div>
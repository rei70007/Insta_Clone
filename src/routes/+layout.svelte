<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  let { children, data } = $props();
</script>

<!-- Global Site Wrapper -->
<div class="min-h-screen bg-gray-50/50 flex flex-col antialiased selection:bg-pink-100 selection:text-pink-900">

  <!-- Navigation Bar -->
  <nav class="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-gray-100 h-16 flex items-center">
    <div class="max-w-6xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between">

      <a href="/" class="flex items-center gap-2">
        <span class="font-black text-gray-900 text-3xl ">Revi</span>
      </a>

      <!-- Navigation Links -->
      <div class="flex items-center gap-4 sm:gap-6 text-sm font-semibold">
        {#if data?.user}

          <!-- Logged In -->
          <div class="flex items-center gap-4 border-r border-gray-100 pr-4 sm:pr-6">
            <a href="/profile/{data.user.id}" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
              <!-- Initials Avatar -->
              <div class="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 font-bold flex items-center justify-center text-xs uppercase border border-pink-100 group-hover:border-pink-300 transition-colors">
                {data.user.username[0]}
              </div>
              <span class="hidden sm:inline font-bold">{data.user.username}</span>
            </a>

            <form method="POST" action="/?/logout" class="flex items-center">
              <button class="text-gray-400 hover:text-red-500 font-medium transition-colors py-1">
                Logout
              </button>
            </form>
          </div>

          <a href="/upload" class="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all duration-200 shadow-sm shadow-pink-500/10 hover:shadow-md hover:shadow-pink-500/20 active:scale-95">
            Upload
          </a>

        {:else}

          <!-- Logged Out -->
          <a href="/login" class="text-gray-600 hover:text-gray-900 font-bold transition-colors py-1">
            Login
          </a>
          <a href="/register" class="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold transition-all duration-200 active:scale-95 shadow-sm">
           Register
          </a>

        {/if}
      </div>

    </div>
  </nav>

  <!-- Page Content -->
  <main class="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t border-gray-100 bg-white py-6 mt-auto">
    <div class="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">
      <p>&copy; {new Date().getFullYear()} Revi. All rights reserved.</p>
    </div>
  </footer>

</div>
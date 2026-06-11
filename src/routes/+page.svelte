<script>
  const { data } = $props();
  let showTop = $state(false);
</script>

<!-- Page Header -->
<div class="mb-8">
  <h1 class="text-3xl font-black text-gray-900">Latest Posts</h1>
  <p class="text-gray-400 text-sm mt-1">See what people are sharing</p>
</div>

<!-- Toggle Buttons -->
<div class="flex gap-2 mb-8">
  <button
    onclick={() => showTop = false}
    class="px-4 py-2 rounded-xl text-sm font-bold transition-all {!showTop ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/20' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}"
  >
    Latest
  </button>
  <button
    onclick={() => showTop = true}
    class="px-4 py-2 rounded-xl text-sm font-bold transition-all {showTop ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/20' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}"
  >
    Top Voted
  </button>
</div>

<!-- Image Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {#each (showTop ? data.top : data.latest) as image}

    <!-- Card wrapper is a div, not an <a>, to avoid nested links -->
    <div class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-200">

      <!-- Clicking the image goes to image detail -->
      <a href="/image/{image.id}" class="block overflow-hidden aspect-square bg-gray-50">
        <img
          src={image.image}
          alt={image.description}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </a>

      <!-- Card Footer -->
      <div class="p-3 flex items-center justify-between">

        <!-- Clicking the author goes to their profile -->
        <a href="/profile/{image.author_id}" class="flex items-center gap-2 group/author">
          <div class="w-6 h-6 rounded-lg bg-pink-50 text-pink-600 font-bold flex items-center justify-center text-xs uppercase border border-pink-100">
            {image.username[0]}
          </div>
          <span class="text-sm font-semibold text-gray-700 group-hover/author:text-pink-500 transition-colors">
            {image.username}
          </span>
        </a>

        <!-- Votes -->
        <span class="text-xs font-bold text-gray-400">
          ❤️ {image.votes}
        </span>

      </div>
    </div>

  {:else}
    <!-- Empty State -->
    <div class="col-span-3 text-center py-20">
      <p class="text-4xl mb-3">📷</p>
      <p class="text-gray-500 font-medium">No images yet.</p>
      <a href="/upload" class="mt-4 inline-block text-pink-500 font-bold hover:underline">
        Be the first to upload
      </a>
    </div>
  {/each}
</div>
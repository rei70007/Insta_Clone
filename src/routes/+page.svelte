<script>
  // In runes mode, access incoming props via $props()
  const { data } = $props();
  const images = data?.images ?? [];
  const top = data?.top ?? [];
</script>

<script context="module">
</script>

<div class="max-w-5xl mx-auto px-4 py-8">

  <!-- Top Bilder -->
  {#if top.length > 0}
    <h2 class="text-lg font-semibold text-gray-800 mb-4">🔥 Beliebteste Bilder</h2>
    <div class="flex gap-3 overflow-x-auto pb-4 mb-10">
      {#each top as img}
        <a href={`/image/${img.id}`} class="flex-shrink-0 relative group">
          <img src={img.image} alt={img.description} class="w-32 h-32 object-cover rounded-lg" />
          <div class="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
            ▲ {img.votes}
          </div>
        </a>
      {/each}
    </div>
  {/if}

  <!-- Alle Bilder -->
  <h2 class="text-lg font-semibold text-gray-800 mb-4">Neueste Bilder</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    {#each images as img}
      <a href={`/image/${img.id}`} class="group relative overflow-hidden rounded-lg aspect-square bg-gray-100">
        <img src={img.image} alt={img.description} class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-end p-2 opacity-0 group-hover:opacity-100">
          <span class="text-white text-xs font-medium truncate">{img.description ?? ''}</span>
        </div>
      </a>
    {/each}
  </div>
</div>
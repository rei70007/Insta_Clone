<script>
  // Daten aus der load-Funktion übernehmen
  const { data } = $props();

  // Profilinformationen und Bilder extrahieren
  const { profileUser, images } = data;
</script>

<!-- Hauptcontainer -->
<div class="max-w-6xl mx-auto px-4 py-6">

  <!-- Profilbereich -->
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

    <!-- Benutzerinformationen -->
    <div class="flex items-center gap-4 sm:gap-6">

      <!-- Avatar mit erstem Buchstaben des Usernamens -->
      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-black flex items-center justify-center text-2xl sm:text-3xl uppercase shadow-md shadow-pink-500/10">
        {profileUser.username[0]}
      </div>

      <!-- Username und Rolle -->
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {profileUser.username}
          </h1>

          <span class="text-xs bg-gray-100 font-semibold px-2.5 py-1 rounded-full text-gray-500 border border-gray-200/50">
            Creator
          </span>
        </div>

        <p class="text-sm text-gray-400 mt-1 font-medium">
          Member of the Revi community
        </p>
      </div>
    </div>

    <!-- Statistiken -->
    <div class="flex gap-4 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">

      <!-- Anzahl Uploads -->
      <div class="bg-gray-50/80 border border-gray-100 px-5 py-3 rounded-2xl text-center min-w-[100px]">
        <span class="block text-2xl font-black text-gray-900">
          {images.length}
        </span>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Uploads
        </span>
      </div>

      <!-- Gesamtanzahl Likes -->
      <div class="bg-gray-50/80 border border-gray-100 px-5 py-3 rounded-2xl text-center min-w-[100px]">
        <span class="block text-2xl font-black text-rose-600">
          {images.reduce((sum, img) => sum + (img.votes || 0), 0).toLocaleString()}
        </span>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Total Likes
        </span>
      </div>

    </div>
  </div>

  <!-- Überschrift der Galerie -->
  <div class="border-b border-gray-100 pb-4 mb-6">
    <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">
      Gallery Collection
    </h2>
  </div>

  <!-- Prüfen, ob Bilder vorhanden sind -->
  {#if images.length > 0}

    <!-- Bildergalerie -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      <!-- Alle Bilder durchlaufen -->
      {#each images as image (image.id)}

        <div class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">

          <!-- Link zur Detailseite des Bildes -->
          <a href="/image/{image.id}" class="block overflow-hidden bg-gray-50 aspect-[4/3]">

            <!-- Bild anzeigen -->
            <img
              src={image.image}
              alt={image.description}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />

          </a>

          <!-- Bildinformationen -->
          <div class="p-4 bg-white border-t border-gray-50">

            <div class="flex items-center justify-between gap-2">

              <!-- Erstellungsdatum -->
              <span class="text-xs text-gray-400 font-medium">
                🕒 {new Date(image.created_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>

              <!-- Anzahl Likes -->
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
                ❤️ {image.votes}
              </span>

            </div>

            <!-- Beschreibung anzeigen, falls vorhanden -->
            {#if image.description}
              <p class="text-sm text-gray-600 line-clamp-1 mt-2 font-normal">
                {image.description}
              </p>
            {/if}

          </div>

        </div>

      {/each}
    </div>

  {:else}

    <!-- Anzeige, wenn keine Bilder vorhanden sind -->
    <div class="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
      <span class="text-4xl">📷</span>
      <p class="text-gray-500 font-bold mt-4">
        No uploads yet
      </p>
      <p class="text-sm text-gray-400 mt-1">
        This creator hasn't published any imagery portfolios.
      </p>
    </div>

  {/if}
</div>
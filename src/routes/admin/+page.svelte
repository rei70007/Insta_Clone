<script>
  // Daten aus der load-Funktion übernehmen
  const { data } = $props();

  // Bilder, Benutzer und aktuellen Admin extrahieren
  const { images, users, currentUser } = data;
</script>

<!-- Hauptcontainer -->
<div class="max-w-6xl mx-auto px-4 py-4">

  <!-- Überschrift des Dashboards -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-8">

    <div>
      <h1 class="text-3xl font-black text-gray-900 tracking-tight">
        Admin Dashboard
      </h1>

      <p class="text-sm text-gray-400 mt-1 font-medium">
        System overview and platform management tools.
      </p>
    </div>

    <!-- Aktuell eingeloggter Benutzer -->
    <div class="inline-flex items-center gap-2 bg-gray-100/80 border border-gray-200/40 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      Session:
      <strong class="text-gray-900">{currentUser.username}</strong>
    </div>

  </div>

  <!-- Statistik-Karten -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

    <!-- Anzahl Bilder -->
    <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          Total Uploaded Images
        </p>

        <p class="text-3xl font-black text-gray-900">
          {images.length.toLocaleString()}
        </p>
      </div>

      <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl">
        📸
      </div>
    </div>

    <!-- Anzahl Benutzer -->
    <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          Registered Users
        </p>

        <p class="text-3xl font-black text-gray-900">
          {users.length.toLocaleString()}
        </p>
      </div>

      <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl">
        👥
      </div>
    </div>

  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

    <!-- Benutzerverwaltung -->
    <div class="lg:col-span-1">

      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-extrabold text-gray-900 tracking-tight">
          User Registry
        </h2>

        <span class="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {users.length}
        </span>
      </div>

      <!-- Tabelle mit Benutzern -->
      <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        <table class="w-full text-sm text-left">

          <thead class="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <tr>
              <th class="py-3 px-4">User</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-50 font-medium text-gray-700">

            <!-- Alle Benutzer anzeigen -->
            {#each users as u}
              <tr>

                <td class="py-3 px-4">

                  <div class="flex items-center gap-2">

                    <!-- Avatar -->
                    <div class="w-6 h-6 rounded-md bg-gray-100 text-gray-600 font-bold text-[10px] flex items-center justify-center uppercase">
                      {u.username[0]}
                    </div>

                    <div>
                      <p class="text-gray-900 font-bold text-xs">
                        {u.username}
                      </p>

                      <p class="text-[10px] text-gray-400 font-mono">
                        ID: #{u.id}
                      </p>
                    </div>

                  </div>

                </td>

                <td class="py-3 px-4 text-right">

                  <div class="flex items-center justify-end gap-1">

                    <!-- Profil ansehen -->
                    <a
                      href="/profile/{u.id}"
                      class="inline-flex items-center px-2.5 py-1 text-xs font-bold text-pink-500 bg-pink-50 rounded-lg"
                    >
                      View
                    </a>

                    <!-- Benutzer löschen -->
                    <form method="POST" action="?/deleteUser">
                      <input type="hidden" name="userId" value={u.id} />

                      <button
                        class="inline-flex items-center px-2.5 py-1 text-xs font-bold text-red-400 bg-red-50 rounded-lg"
                        onclick={(e) => {
                          if (!confirm(`Delete user ${u.username}?`))
                            e.preventDefault();
                        }}
                      >
                        Delete
                      </button>
                    </form>

                  </div>

                </td>

              </tr>
            {/each}

          </tbody>

        </table>

      </div>

    </div>

    <!-- Bilderverwaltung -->
    <div class="lg:col-span-2">

      <div class="flex items-center justify-between mb-4">

        <h2 class="text-lg font-extrabold text-gray-900 tracking-tight">
          Global Asset Library
        </h2>

        <span class="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {images.length}
        </span>

      </div>

      <!-- Bildergitter -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">

        {#each images as image (image.id)}

          <div class="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">

            <!-- Link zur Bildseite -->
            <a href="/image/{image.id}" class="block aspect-[4/3] bg-gray-50 overflow-hidden">

              <img
                src={image.image}
                alt={image.description}
                class="w-full h-full object-cover"
                loading="lazy"
              />

            </a>

            <!-- Bildinformationen -->
            <div class="p-3 border-t border-gray-50">

              <div class="flex items-center justify-between gap-2 mb-2">

                <div class="truncate">
                  <p class="text-xs font-bold text-gray-800 truncate">
                    {image.username}
                  </p>

                  <p class="text-[10px] text-gray-400 font-medium">
                    Post ID: {image.id}
                  </p>
                </div>

                <!-- Likes -->
                <span class="inline-flex items-center gap-0.5 text-[11px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                  ❤️ {image.votes}
                </span>

              </div>

              <!-- Bild löschen -->
              <form method="POST" action="?/deleteImage">
                <input type="hidden" name="imageId" value={image.id} />

                <button
                  class="w-full text-xs font-bold text-red-400 bg-red-50 py-1.5 rounded-lg"
                  onclick={(e) => {
                    if (!confirm('Delete this image?'))
                      e.preventDefault();
                  }}
                >
                  Delete
                </button>

              </form>

            </div>

          </div>

        {/each}

      </div>

    </div>

  </div>

</div>
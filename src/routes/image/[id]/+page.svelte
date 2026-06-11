<script>
  const { data, form } = $props();
  const { image, comments, user } = data;
  let showDeleteConfirm = $state(false);
</script>

<div class="max-w-3xl mx-auto px-4 py-4">
  
  <div class="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm mb-8">
    
    <div class="relative bg-gray-900 flex justify-center items-center overflow-hidden max-h-[600px] aspect-[4/3] sm:aspect-auto">
      <img 
        src={image.image} 
        alt={image.description} 
        class="w-full h-full object-contain" 
      />
    </div>

    <div class="p-6 sm:p-8">
      <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-pink-50 text-pink-600 font-bold flex items-center justify-center text-sm border border-pink-100 uppercase">
            {image.username[0]}
          </div>
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Published by</p>
            <a href="/profile/{image.author_id}" class="text-sm font-bold text-gray-800 hover:text-pink-500 transition-colors">
              {image.username}
            </a>
          </div>
        </div>
        
        <span class="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
          {new Date(image.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {#if image.description}
        <p class="text-gray-700 text-lg leading-relaxed mb-6 font-normal">
          {image.description}
        </p>
      {/if}

      <div class="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-50">
        
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-50 text-rose-600 font-black text-sm shadow-inner">
            ❤️ {image.votes.toLocaleString()} {image.votes === 1 ? 'vote' : 'votes'}
          </span>

          {#if user}
            <form method="POST" action="?/upvote">
              <button class="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm">
                Upvote
              </button>
            </form>
          {/if}
        </div>

        <!-- Delete with inline confirmation -->
        {#if user && user.id === image.author_id}
          {#if showDeleteConfirm}
            <div class="flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-xl">
              <span class="text-xs font-semibold text-red-600">Delete this post?</span>
              <form method="POST" action="?/delete">
                <button class="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors">
                  Yes, delete
                </button>
              </form>
              <button
                onclick={() => showDeleteConfirm = false}
                class="text-xs font-bold text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          {:else}
            <button
              onclick={() => showDeleteConfirm = true}
              class="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 bg-red-50/50 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors duration-150"
            >
              Delete Post
            </button>
          {/if}
        {/if}

      </div>

      {#if form?.error}
        <div class="mt-4 bg-red-50 border border-red-100 text-red-600 p-4 text-sm font-medium rounded-xl flex items-center gap-2">
          ⚠️ {form.error}
        </div>
      {/if}

    </div>
  </div>

  <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
    <h2 class="text-xl font-black mb-6 text-gray-900 tracking-tight flex items-center gap-2">
       Comments <span class="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{comments.length}</span>
    </h2>

    <div class="space-y-4 mb-8">
      {#each comments as comment}
        <div class="bg-gray-50/70 border border-gray-100/80 rounded-2xl p-4 transition-all hover:bg-gray-50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-gray-800 hover:text-pink-500 cursor-pointer">{comment.username}</span>
            <span class="text-[11px] font-medium text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
        </div>
      {:else}
        <div class="text-center py-10 bg-gray-50/40 rounded-2xl border border-dashed border-gray-100">
          <span class="text-2xl">💬</span>
          <p class="text-sm text-gray-400 font-medium mt-2">No comments yet. Be the first to start the conversation!</p>
        </div>
      {/each}
    </div>

    {#if user}
      <form method="POST" action="?/comment" class="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
        <div class="relative w-full">
          <input
            type="text"
            name="text"
            placeholder="Share your thoughts about this photo..."
            required
            class="w-full bg-gray-50 text-sm text-gray-800 border border-gray-200/80 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 focus:bg-white transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          class="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 text-sm font-bold rounded-xl transition-colors duration-200 shadow-sm whitespace-nowrap"
        >
          Comment
        </button>
      </form>
    {:else}
      <div class="text-center p-4 bg-pink-50/30 rounded-2xl border border-pink-100/50">
        <p class="text-sm text-gray-600 font-medium">
          Want to engage? <a href="/login" class="text-pink-600 font-bold hover:underline transition-all">Log in</a> to favorite or drop a comment.
        </p>
      </div>
    {/if}
  </div>

</div>
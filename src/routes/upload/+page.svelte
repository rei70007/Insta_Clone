<script>
  const { form } = $props();
</script>

<div class="max-w-xl mx-auto">

  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-black text-gray-900">Upload Image</h1>
    <p class="text-gray-400 text-sm mt-1">Share a photo with the community</p>
  </div>

  <!-- Error message -->
  {#if form?.error}
    <p class="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium">
      {form.error}
    </p>
  {/if}

  <!-- Upload Form -->
  <!-- enctype="multipart/form-data" is required for file uploads -->
  <form
    method="POST"
    action="?/upload"
    enctype="multipart/form-data"
    class="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col gap-6"
  >

    <!-- File Input -->
    <div>
      <label class="block text-sm font-bold text-gray-700 mb-2">Image file</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        required
        class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-pink-50 file:text-pink-600 file:font-bold hover:file:bg-pink-100 transition-colors"
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-bold text-gray-700 mb-2">Description <span class="text-gray-400 font-normal">(optional)</span></label>
      <textarea
        name="description"
        rows="3"
        placeholder="Write something about this image..."
        class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-300 resize-none transition-colors"
      ></textarea>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-sm shadow-pink-500/20 hover:shadow-md hover:shadow-pink-500/30 active:scale-95"
    >
      Upload
    </button>

  </form>
</div>
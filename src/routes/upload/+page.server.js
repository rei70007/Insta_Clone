import  db  from '$lib/server/db.js';
import { put } from '@vercel/blob';
import { fail, redirect } from '@sveltejs/kit';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'; // ← add this

export async function load({ locals }) {
  if (!locals.user) throw redirect(303, '/login');
  return {};
}

export const actions = {
  upload: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'You must be logged in.' });

    const data = await request.formData();
    const file = data.get('image');
    const description = data.get('description') || '';

    if (!file || file.size === 0) {
      return fail(400, { error: 'Please select an image.' });
    }
    if (!file.type.startsWith('image/')) {
      return fail(400, { error: 'Only image files are allowed.' });
    }
    

    // Pass the token explicitly
    const blob = await put(file.name, file, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN // ← pass it here
    });

    await db.execute(
      'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
      [blob.url, description, locals.user.id]
    );

    redirect(303, '/');
  }
};
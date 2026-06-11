import  db  from '$lib/server/db.js'; 
import { redirect, error, fail } from '@sveltejs/kit';

const ADMIN_USERNAME = 'admin'; // change this to your username

export async function load({ locals }) {
  if (!locals.user) throw redirect(303, '/login');

  if (locals.user.username !== ADMIN_USERNAME) {
    throw error(403, 'You are not allowed to view this page.');
  }

  const [images] = await db.execute(
    `SELECT images.id, images.image, images.description, images.votes,
            images.created_at, users.username
     FROM images
     JOIN users ON images.author_id = users.id
     ORDER BY images.created_at DESC`
  );

  const [users] = await db.execute(
    'SELECT id, username FROM users ORDER BY id DESC'
  );

  return { images, users, currentUser: locals.user };
}

export const actions = {
  // Delete any image
  deleteImage: async ({ request, locals }) => {
    if (!locals.user || locals.user.username !== ADMIN_USERNAME) {
      return fail(403, { error: 'Not allowed.' });
    }

    const data = await request.formData();
    const imageId = data.get('imageId');

    await db.execute('DELETE FROM images WHERE id = ?', [imageId]);
  },

  // Delete any user
  deleteUser: async ({ request, locals }) => {
    if (!locals.user || locals.user.username !== ADMIN_USERNAME) {
      return fail(403, { error: 'Not allowed.' });
    }

    const data = await request.formData();
    const userId = data.get('userId');

    // Deletes user + their images/comments via CASCADE
    await db.execute('DELETE FROM users WHERE id = ?', [userId]);
  }
};
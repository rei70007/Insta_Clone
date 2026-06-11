import  db  from '$lib/server/db.js';
import { fail, redirect, error } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const [rows] = await db.execute(
    `SELECT images.*, users.username, users.id AS author_id
     FROM images
     JOIN users ON images.author_id = users.id
     WHERE images.id = ?`,
    [params.id]
  );

  const image = rows[0];
  if (!image) throw error(404, 'Image not found');

  const [comments] = await db.execute(
    `SELECT comments.*, users.username
     FROM comments
     JOIN users ON comments.user_id = users.id
     WHERE comments.image_id = ?
     ORDER BY comments.created_at ASC`,
    [params.id]
  );

  return { image, comments, user: locals.user };
}

export const actions = {
  upvote: async ({ params, locals }) => {
    if (!locals.user) return fail(401, { error: 'Login to vote.' });
    await db.execute(
      'UPDATE images SET votes = votes + 1 WHERE id = ?',
      [params.id]
    );
  },

  comment: async ({ params, request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Login to comment.' });

    const data = await request.formData();
    const text = data.get('text');

    if (!text || text.trim() === '') {
      return fail(400, { error: 'Comment cannot be empty.' });
    }

    await db.execute(
      'INSERT INTO comments (user_id, image_id, text) VALUES (?, ?, ?)',
      [locals.user.id, params.id, text]
    );
  },

  delete: async ({ params, locals }) => {
    if (!locals.user) return fail(401, { error: 'Not logged in.' });

    const [rows] = await db.execute(
      'SELECT author_id FROM images WHERE id = ?',
      [params.id]
    );

    if (!rows[0] || rows[0].author_id !== locals.user.id) {
      return fail(403, { error: 'You can only delete your own images.' });
    }

    await db.execute('DELETE FROM images WHERE id = ?', [params.id]);
    redirect(303, '/');
  }
};
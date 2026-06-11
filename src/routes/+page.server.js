import  db  from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
  // Latest 25 images
  const [latest] = await db.execute(
    `SELECT images.id, images.image, images.description, images.votes, images.created_at,
            users.username, users.id AS author_id
     FROM images
     JOIN users ON images.author_id = users.id
     ORDER BY images.created_at DESC
     LIMIT 25`
  );

  // Top 10 most voted
  const [top] = await db.execute(
    `SELECT images.id, images.image, images.description, images.votes,
            users.username, users.id AS author_id
     FROM images
     JOIN users ON images.author_id = users.id
     ORDER BY images.votes DESC
     LIMIT 10`
  );

  return { latest, top };
}

// Logout action lives here on the homepage
export const actions = {
  logout: async ({ cookies }) => {
    const sessionId = cookies.get('session');

    if (sessionId) {
      await db.execute('DELETE FROM sessions WHERE id = ?', [sessionId]);
      cookies.delete('session', { path: '/' });
    }

    redirect(303, '/');
  }
};
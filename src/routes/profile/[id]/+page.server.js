import  db  from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const [userRows] = await db.execute(
    'SELECT id, username FROM users WHERE id = ?',
    [params.id]
  );

  const profileUser = userRows[0];
  if (!profileUser) throw error(404, 'User not found');

  const [images] = await db.execute(
    `SELECT * FROM images
     WHERE author_id = ?
     ORDER BY created_at DESC`,
    [params.id]
  );

  return { profileUser, images };
}
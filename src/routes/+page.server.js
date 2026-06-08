
import { db } from '$lib/db.js';

export async function load() {
  // Neueste 25 Bilder
  const [images] = await db.execute(
    `SELECT i.id, i.image, i.description, i.votes, u.username
     FROM images i JOIN users u ON u.id = i.author_id
     ORDER BY i.created_at DESC LIMIT 25`
  );

  // Top 5 nach Votes
  const [top] = await db.execute(
    `SELECT id, image, description, votes FROM images
     ORDER BY votes DESC LIMIT 5`
  );

  return { images, top };
}
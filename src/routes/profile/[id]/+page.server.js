// Datenbankverbindung importieren
import db from '$lib/server/db.js';

// SvelteKit-Funktion für HTTP-Fehler importieren
import { error } from '@sveltejs/kit';

// Lädt die Daten für die Profilseite
export async function load({ params }) {

  // Benutzer anhand der ID aus der URL suchen
  const [userRows] = await db.execute(
    'SELECT id, username FROM users WHERE id = ?',
    [params.id]
  );

  // Ersten gefundenen Benutzer speichern
  const profileUser = userRows[0];

  // Falls kein Benutzer existiert, 404-Fehler ausgeben
  if (!profileUser) {
    throw error(404, 'User not found');
  }

  // Alle Bilder des Benutzers laden
  const [images] = await db.execute(
    `SELECT * FROM images
     WHERE author_id = ?
     ORDER BY created_at DESC`,
    [params.id]
  );

  // Daten an die Svelte-Seite zurückgeben
  return {
    profileUser,
    images
  };
}
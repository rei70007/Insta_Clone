// Datenbankverbindung importieren
import db from '$lib/server/db.js';

// SvelteKit-Funktionen für Weiterleitungen, Fehler und Formularfehler
import { redirect, error, fail } from '@sveltejs/kit';

// Benutzername des Administrators
const ADMIN_USERNAME = 'admin';

// Lädt die Daten für das Admin-Dashboard
export async function load({ locals }) {

  // Prüfen, ob ein Benutzer eingeloggt ist
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  // Nur der Admin darf die Seite aufrufen
  if (locals.user.username !== ADMIN_USERNAME) {
    throw error(403, 'You are not allowed to view this page.');
  }

  // Alle Bilder mit Benutzerinformationen laden
  const [images] = await db.execute(
    `SELECT images.id, images.image, images.description, images.votes,
            images.created_at, users.username
     FROM images
     JOIN users ON images.author_id = users.id
     ORDER BY images.created_at DESC`
  );

  // Alle Benutzer laden
  const [users] = await db.execute(
    'SELECT id, username FROM users ORDER BY id DESC'
  );

  // Daten an die Seite zurückgeben
  return {
    images,
    users,
    currentUser: locals.user
  };
}

// Actions für das Admin-Dashboard
export const actions = {

  // Beliebiges Bild löschen
  deleteImage: async ({ request, locals }) => {

    // Nur Admin darf Bilder löschen
    if (!locals.user || locals.user.username !== ADMIN_USERNAME) {
      return fail(403, { error: 'Not allowed.' });
    }

    // Formulardaten auslesen
    const data = await request.formData();

    // Bild-ID holen
    const imageId = data.get('imageId');

    // Bild aus der Datenbank löschen
    await db.execute(
      'DELETE FROM images WHERE id = ?',
      [imageId]
    );
  },

  // Beliebigen Benutzer löschen
  deleteUser: async ({ request, locals }) => {

    // Nur Admin darf Benutzer löschen
    if (!locals.user || locals.user.username !== ADMIN_USERNAME) {
      return fail(403, { error: 'Not allowed.' });
    }

    // Formulardaten auslesen
    const data = await request.formData();

    // Benutzer-ID holen
    const userId = data.get('userId');

    // Benutzer löschen
    // Zugehörige Bilder und Kommentare werden durch CASCADE ebenfalls gelöscht
    await db.execute(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );
  }
};
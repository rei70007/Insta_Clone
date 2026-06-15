// Datenbankverbindung importieren
import db from '$lib/server/db.js';

// Funktion zum Hochladen von Dateien in Vercel Blob Storage
import { put } from '@vercel/blob';

// SvelteKit Hilfsfunktionen für Fehler und Weiterleitungen
import { fail, redirect } from '@sveltejs/kit';

// Blob-Token aus den Environment-Variablen laden
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Wird beim Laden der Seite ausgeführt
export async function load({ locals }) {
  // Prüfen, ob der Benutzer eingeloggt ist
  if (!locals.user) throw redirect(303, '/login');

  return {};
}

// Form Actions
export const actions = {
  upload: async ({ request, locals }) => {
    
    // Benutzer muss eingeloggt sein
    if (!locals.user) {
      return fail(401, { error: 'You must be logged in.' });
    }

    // Formulardaten auslesen
    const data = await request.formData();

    // Bilddatei holen
    const file = data.get('image');

    // Beschreibung holen (leer, falls nichts eingegeben wurde)
    const description = data.get('description') || '';

    // Prüfen, ob eine Datei ausgewählt wurde
    if (!file || file.size === 0) {
      return fail(400, { error: 'Please select an image.' });
    }

    // Prüfen, ob die Datei ein Bild ist
    if (!file.type.startsWith('image/')) {
      return fail(400, { error: 'Only image files are allowed.' });
    }

    // Bild in Vercel Blob Storage hochladen
    const blob = await put(file.name, file, {
      access: 'public', // öffentlich zugänglich
      token: BLOB_READ_WRITE_TOKEN // Authentifizierung
    });

    // Bild-URL und Beschreibung in die Datenbank speichern
    await db.execute(
      'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
      [
        blob.url,          
        description,       
        locals.user.id     
      ]
    );

    // Nach erfolgreichem Upload zur Startseite weiterleiten
    throw redirect(303, '/');
  }
};
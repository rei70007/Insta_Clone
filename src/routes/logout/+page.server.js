// Datenbankverbindung importieren
import db from '$lib/server/db.js';

// SvelteKit-Funktion für Weiterleitungen importieren
import { redirect } from '@sveltejs/kit';

// Action für das Logout-Formular
export const actions = {
  default: async ({ cookies }) => {

    // Session-ID aus den Cookies holen
    const sessionId = cookies.get('session');

    // Prüfen, ob eine Session existiert
    if (sessionId) {

      // Session aus der Datenbank löschen
      await db.execute(
        'DELETE FROM sessions WHERE id = ?',
        [sessionId]
      );

      // Session-Cookie löschen
      cookies.delete('session', {
        path: '/'
      });
    }

    // Nach dem Logout zur Startseite weiterleiten
    throw redirect(303, '/');
  }
};
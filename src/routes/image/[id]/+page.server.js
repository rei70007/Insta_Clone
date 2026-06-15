// Datenbankverbindung importieren
import db from '$lib/server/db.js';
// SvelteKit-Funktionen für Fehler, Formularfehler und Weiterleitungen
import { fail, redirect, error } from '@sveltejs/kit';

// Lädt die Bilddetails und Kommentare
export async function load({ params, locals }) {
	// Bild mit Autorinformationen laden
	const [rows] = await db.execute(
		`SELECT images.*, users.username, users.id AS author_id
     FROM images
     JOIN users ON images.author_id = users.id
     WHERE images.id = ?`,
		[params.id]
	);
	const image = rows[0];

	// Falls Bild nicht existiert
	if (!image) {
		throw error(404, 'Image not found');
	}

	// Kommentare zum Bild laden
	const [comments] = await db.execute(
		`SELECT comments.*, users.username
     FROM comments
     JOIN users ON comments.user_id = users.id
     WHERE comments.image_id = ?
     ORDER BY comments.created_at ASC`,
		[params.id]
	);

	// Prüfen ob der eingeloggte User bereits gevotet hat ✅ NEW
	let hasVoted = false;
	if (locals.user) {
		const [voteRows] = await db.execute('SELECT 1 FROM votes WHERE user_id = ? AND image_id = ?', [
			locals.user.id,
			params.id
		]);
		hasVoted = voteRows.length > 0;
	}

	// Daten an die Seite zurückgeben
	return {
		image,
		comments,
		user: locals.user,
		hasVoted // ✅ NEW
	};
}

// Formularaktionen
export const actions = {
	// Bild liken/upvoten
	upvote: async ({ params, locals }) => {
		// Benutzer muss eingeloggt sein
		if (!locals.user) {
			return fail(401, { error: 'Login to vote.' });
		}

		// Prüfen ob bereits gevotet (Server-side check) ✅ NEW
		const [existing] = await db.execute('SELECT 1 FROM votes WHERE user_id = ? AND image_id = ?', [
			locals.user.id,
			params.id
		]);
		if (existing.length > 0) {
			return fail(400, { error: 'You already voted on this image.' });
		}

		// Vote in votes-Tabelle speichern ✅ NEW
		await db.execute('INSERT INTO votes (user_id, image_id) VALUES (?, ?)', [
			locals.user.id,
			params.id
		]);

		// Vote-Zähler erhöhen
		await db.execute('UPDATE images SET votes = votes + 1 WHERE id = ?', [params.id]);
	},

	// Kommentar hinzufügen
	comment: async ({ params, request, locals }) => {
		// Benutzer muss eingeloggt sein
		if (!locals.user) {
			return fail(401, { error: 'Login to comment.' });
		}

		// Formulardaten lesen
		const data = await request.formData();
		const text = data.get('text');

		// Kommentar darf nicht leer sein
		if (!text || text.trim() === '') {
			return fail(400, { error: 'Comment cannot be empty.' });
		}

		// Kommentar speichern
		await db.execute('INSERT INTO comments (user_id, image_id, text) VALUES (?, ?, ?)', [
			locals.user.id,
			params.id,
			text
		]);
	},

	// Bild löschen
	delete: async ({ params, locals }) => {
		// Benutzer muss eingeloggt sein
		if (!locals.user) {
			return fail(401, { error: 'Not logged in.' });
		}

		// Autor des Bildes abrufen
		const [rows] = await db.execute('SELECT author_id FROM images WHERE id = ?', [params.id]);

		// Prüfen, ob der Benutzer der Autor ist
		if (!rows[0] || rows[0].author_id !== locals.user.id) {
			return fail(403, { error: 'You can only delete your own images.' });
		}

		// Bild löschen
		await db.execute('DELETE FROM images WHERE id = ?', [params.id]);

		// Zur Startseite weiterleiten
		throw redirect(303, '/');
	}
};

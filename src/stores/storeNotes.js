import { defineStore } from 'pinia';

export const mockAPI = defineStore('mockAPI', {
	state: () => {
		return {
			notes: []
		}
	},
	actions: {
		async getNotes() {
			return await new Promise(done => {
				const json = [
					{
						"id": 1,
						"title": "Proposal, The",
						"content": "Comedy|Romance",
						"status": "New"
					},
					{
						"id": 2,
						"title": "Home of the Brave",
						"content": "Documentary",
						"status": "Completed"
					},
					{
						"id": 3,
						"title": "Fill the Void (Lemale et ha'halal)",
						"content": "Drama",
						"status": "Completed"
					},
					{
						"id": 4,
						"title": "Aces 'N' Eights",
						"content": "Action|Adventure|Drama|Romance|Western",
						"status": "Not completed"
					},
					{
						"id": 5,
						"title": "IMAX: Coral Reef Adventure",
						"content": "Children|Documentary|IMAX",
						"status": "Not completed"
					},
					{
						"id": 6,
						"title": "It Had to Be You",
						"content": "Comedy|Romance",
						"status": "New"
					},
					{
						"id": 7,
						"title": "Family Law (Derecho de familia)",
						"content": "Comedy|Drama",
						"status": "Completed"
					},
					{
						"id": 8,
						"title": "Jellyfish (Meduzot)",
						"content": "Drama",
						"status": "Completed"
					},
					{
						"id": 9,
						"title": "Original Sin",
						"content": "Drama|Romance|Thriller",
						"status": "New"
					},
					{
						"id": 10,
						"title": "Crips and Bloods: Made in America",
						"content": "Documentary",
						"status": "Not completed"
					}
				]
				this.notes = json;
			})
		},
		/**
		 * @returns {Number} Total count of notes
		 */
		getNotesTotal() {
			return this.notes.length;
		},
		/**
		 * @returns {Number} Total count of completed notes
		 */
		getNotesCompleted() {
			const notes = this.notes.filter(note => note.status.toLowerCase() === 'completed');
			return notes.length;
		},
		getNotesNotCompleted() {
			const notes = this.notes.filter(note => note.status.toLowerCase() !== 'completed');
			return notes.length;
		},
		/**
		 *
		 * @param {String} title title of note
		 * @param {String} content content of note
		 */
		setNote(title, content) {
			if (!title || !content) {
				return;
			}
			const id = this.notes.length + 1;
			const status = 'New';
			this.notes.push({
				id, title, content, status
			});
		},
		/**
		 * @param {Object} notes
		 */
		deleteNote(notes) {
			const notesToDelete = [];
			for (const key in notes) {
				if (Object.hasOwnProperty.call(notes, key)) {
					notesToDelete.push(notes[key]);
				}
			}
			this.notes = this.notes.filter(note => notesToDelete.indexOf(note.id) === -1);
		}
	}
})


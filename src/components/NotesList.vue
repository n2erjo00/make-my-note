<template>
<main class="container">
<section class="row mb-4">
	<NotesSummary v-model="api.notes.length" :label="'Total'"/>
	<NotesSummary v-model="api.notes.filter(note => note.status.toLowerCase() === 'completed').length" :label="'Completed'"/>
	<NotesSummary v-model="api.notes.filter(note => note.status.toLowerCase() !== 'completed').length" :label="'Not completed'"/>
</section>
<section class="row">
	<div class="col-12">
		<div class="table-responsive">
			<table class="table table-border">
				<thead>
					<tr>
						<th>
							<div class="d-flex align-items-center justify-content-between">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="" id="select-all-notes" @change="selectNotesAll" :checked="api.notes.length && modal.deleteNotes.length === api.notes.length" :disabled="!api.notes.length">
									<label class="form-check-label" for="select-all-notes">ID</label>
								</div>
								<button class="btn btn-sort" :class="{ 'is-desc': !sortingMap.id }" type="button" @click="sortByID('id')" v-if="api.notes.length">
									<span class="visually-hidden">Sort by id</span>
									<AngleIcon/>
									<AngleIcon/>
								</button>
							</div>
						</th>
						<th>
							<div class="d-flex align-items-center justify-content-between">
								<div>Title</div>
								<button class="btn btn-sort" :class="{ 'is-desc': !sortingMap.title }" type="button" @click="sortByID('title')" v-if="api.notes.length">
									<span class="visually-hidden">Sort by title</span>
									<AngleIcon/>
									<AngleIcon/>
								</button>
							</div>
						</th>
						<th>
							<div class="d-flex align-items-center justify-content-between">
								<div>Content</div>
								<button class="btn btn-sort" type="button" :class="{ 'is-desc': !sortingMap.content }" @click="sortByID('content')" v-if="api.notes.length">
									<span class="visually-hidden">Sort by content</span>
									<AngleIcon/>
									<AngleIcon/>
								</button>
							</div>
						</th>
						<th>
							<div class="d-flex align-items-center justify-content-between">
								<div>Status</div>
								<button class="btn btn-sort" type="button" :class="{ 'is-desc': !sortingMap.status }" @click="sortByID('status')" v-if="api.notes.length">
									<span class="visually-hidden">Sort by status</span>
									<AngleIcon/>
									<AngleIcon/>
								</button>
							</div>
						</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td class="text-right border-0" colspan="4">
							<div class="d-flex justify-content-end">
								<button class="btn btn-primary" type="button" @click="modal.addNote = true">Add</button>
							</div>
						</td>
					</tr>
				</tfoot>
				<tbody v-if="!api.notes.length">
					<tr>
						<td class="text-center py-4 lead" colspan="4">No notes. Please use "Add" button to add a note</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-for="note in api.notes" :key="note.id">
						<td>
							<div class="form-check">
								<input class="form-check-input" type="checkbox" :id="`note-${note.id}`" name="note_id" :value="note.id" :checked="modal.deleteNotes.indexOf(note.id) !== -1" v-model="modal.deleteNotes">
								<label class="form-check-label text-primary" :for="`note-${note.id}`">{{ note.id }}</label>
							</div>
						</td>
						<td>{{ note.title }}</td>
						<td>{{ note.content }}</td>
						<td>{{ note.status }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>
</main>
<DialogAddNote v-if="modal.addNote" v-model="modal.addNote"/>
<DialogDeleteNotes v-if="modal.deleteNotes.length > 0" v-model="modal.deleteNotes" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import NotesSummary from './NotesSummary.vue';
import DialogAddNote from './dialog/DialogAddNote.vue'
import DialogDeleteNotes from './dialog/DialogDeleteNotes.vue';
import { mockAPI } from '../stores/storeNotes';
import AngleIcon from './icons/AngleIcon.vue';
const api = mockAPI();
const modal = reactive({
	addNote: false,
	deleteNotes: [],
	total: api.notes.length
});
const selectNotesAll = (evt) => {
	if (evt.target.checked) {
		modal.deleteNotes = api.notes.map(note => note.id);
	} else {
		modal.deleteNotes = [];
	}
}
const sortingMap = ref({
	id: true,
	title: true,
	content: true,
	status: true
});
/**
 * @param {String} sortByKey
 */
const sortByID = (sortByKey) => {
	sortingMap.value[sortByKey] = !sortingMap.value[sortByKey];
	if (sortingMap.value[sortByKey]) {
		api.notes = api.notes.sort((a, b) => {
			if (a[sortByKey] < b[sortByKey]) {
				return -1;
			} else if (a[sortByKey] > b[sortByKey]) {
				return 1;
			} else {
				return 0;
			}
		});
	} else {
		api.notes = api.notes.sort((a, b) => {
			if (a[sortByKey] > b[sortByKey]) {
				return -1;
			} else if (a[sortByKey] < b[sortByKey]) {
				return 1;
			} else {
				return 0;
			}
		});
	}
}
</script>
<style scoped>
.table > thead > tr > th {
	background-color: #989898;
	color: var(--bs-white);
}
.table > thead > tr > th:not(:last-of-type) {
	border-right: 1px solid var(--bs-white);
}
.table > tbody > tr > td {
	background-color: var(--bs-white);
}
.btn-sort {
	background-color: transparent;
	border: 0 !important;
	padding: 0 .25rem
}
.btn-sort .angle {
	display: block;
	fill: var(--bs-white);
	height: auto;
	width: 12px;
}
.btn-sort .angle:last-of-type {
	opacity: .5;
	transform: rotate(180deg);
}
.btn-sort.is-desc .angle:first-of-type {
	opacity: .5;
}
.btn-sort.is-desc .angle:last-of-type {
	opacity: 1;
}
</style>
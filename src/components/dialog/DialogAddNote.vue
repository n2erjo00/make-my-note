<template>
	<div class="modal fade show" tabindex="-1">
		<div class="modal-dialog">
			<form class="modal-content" action="api/v1/setNote" method="post" @submit.prevent="setNoteValidate">
				<div class="modal-header">
					<h5 class="modal-title">Add note</h5>
				</div>
				<div class="modal-body">
					<div class="mb-4">
						<label class="visually-hidden" for="note-title">Note title</label>
						<input class="form-control" :class="{ 'is-invalid': !noteTitleIsValid, 'is-valid': noteTitleIsValid && noteTitle }" id="note-title" type="text" name="note_title" placeholder="Note title" v-model="noteTitle" v-autofocus>
						<span class="text-danger" v-if="!noteTitleIsValid">Please fill this field</span>
					</div>
					<div class="mb-4">
						<label class="visually-hidden" for="note-content">Note content</label>
						<textarea class="form-control" :class="{ 'is-invalid': !noteContentIsValid, 'is-valid': noteContentIsValid && noteContent }" id="note-content" name="note_content" placeholder="Note content" cols="10" rows="10" v-model="noteContent"></textarea>
						<span class="text-danger" v-if="!noteContentIsValid">Please fill this field</span>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" type="submit">Save</button>
					<button class="btn" type="button btn-link" @click="closeDialog">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { mockAPI } from '../../stores/storeNotes';
const api = mockAPI();
const properties = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	}
});
const noteTitle = ref('');
const noteContent = ref('');
const noteTitleIsValid = ref(true);
const noteContentIsValid = ref(true);
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
	emit('update:modelValue', false);
};
const vAutofocus = {
	mounted: (el) => {
		el.focus();
	}
};
const setNoteValidate = () => {
	noteTitleIsValid.value = noteTitle.value !== '';
	noteContentIsValid.value = noteContent.value !== '';
	if (noteTitleIsValid.value && noteContentIsValid.value) {
		api.setNote(noteTitle.value, noteContent.value);
		emit('update:modelValue', false);
	}
}
</script>
<style scoped>
.modal.show {
	background-color: rgba(0, 0, 0, .33);
	display: block;
}
.modal-header {
	border-bottom-color: transparent;
}
.modal-footer {
	border-top-color: transparent;
	justify-content: flex-start;
}
textarea.form-control {
	height: 100px;
}
</style>
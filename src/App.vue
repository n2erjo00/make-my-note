<script setup>
import { onMounted } from 'vue-demi';
import NotesList from './components/NotesList.vue';
import { mockAPI } from './stores/storeNotes';
const api = mockAPI();
onMounted(() => {
	const notes = api.getNotes()
		.catch(err => {
			// Luckily not a real API :D so can't fail
			console.error(`There was an error ${err}`);
		})
});
</script>

<template>
	<NotesList/>
</template>

<style>
@import './assets/base.css';
</style>

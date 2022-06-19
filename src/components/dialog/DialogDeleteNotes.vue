<template>
	<section class="danger-bar py-2">
		<div class="container d-flex align-items-center justify-content-between">
			<div class="d-flex align-items-center">
				<CautionSVG/>
				<p class="mb-0" v-if="modelValue.length === 1">Do you want to delete this note</p>
				<p class="mb-0" v-else>Do you want to delete these notes</p>
			</div>
			<div class="d-flex aling-items-center justify-content-end">
				<button class="btn btn-outline-light mr-2 px-6" type="button" @click="closeDialog">No</button>
				<button class="btn btn-light px-6" type="button" @click="deleteNotes(modelValue)">Yes</button>
			</div>
		</div>
	</section>
</template>
<script setup>
import { mockAPI } from '../../stores/storeNotes';
import CautionSVG from '../icons/CautionIcon.vue'
const notesAPI = mockAPI();
const properties = defineProps({
	modelValue: {
		type: Array,
		required: true
	}
});
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
	emit('update:modelValue', []);
};
const deleteNotes = (notes) => {
	notesAPI.deleteNote(notes)
	emit('update:modelValue', []);
}
</script>
<style scoped>
.danger-bar {
	background-color: var(--bs-danger);
	bottom: 0;
	color: var(--bs-white);
	left: 0;
	position: absolute;
	width: 100%;

}
.mr-2 {
	margin-right: 0.5rem;
}
.px-6 {
	padding-left: 1.5rem;
	padding-right: 1.5rem;
}
.danger-bar .caution-svg {
	fill: var(--bs-white);
	height: auto;
	margin-right: 1rem;
	width: 36px;
}
</style>

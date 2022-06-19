<template>
	<div class="col-2 bg-white py-4">
		<h2 class="text-muted h4">{{ label }}</h2>
		<p class="h2">{{ modelValue }}</p>
	</div>
</template>
<script setup>
const properties = defineProps({
	modelValue: {
		type: Number,
		required: true
	},
	label: {
		type: String,
		required: true
	}
});
</script>

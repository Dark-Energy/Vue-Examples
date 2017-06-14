<template>
	<a v-bind:href="link_item.href"> {{link_item.text}} </a>
</template>

<script>
export default {
		name: 'page-item',
		props: ['link_item'],
		
	}
</script>

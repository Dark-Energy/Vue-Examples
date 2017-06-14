<template>
<div id="message-block" class="error-message">
	<h1>Error</h1> 
	<p>{{page_content.message}}</p>
</div>
</template>

<script>
export default {
	props: ['page_content'],
	name: 'error-message',
}
</script>

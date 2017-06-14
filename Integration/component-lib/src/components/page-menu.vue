<template>
<div class="buttons-headers" id="page-menu"> 
	<my-routed-link v-for="item in tags" v-bind:url="item" v-bind:base_url="base_url">
	</my-routed-link> 
</div>
</template>
 
<script>
import my_routed_link from './routed-link.vue'
export default {
	name : 'page-menu',
	props: ["base_url",	"tags"],
	components: {
		'my-routed-link': my_routed_link
	}
	}
</script>

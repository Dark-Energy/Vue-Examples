<template>
<div class="top-line top-buttons">
	<my-routed-link v-for="item in category_list" v-bind:url="item" v-bind:base_url="base_url">
 	</my-routed-link>
</div>

</template>

<script>
import my_routed_link from './routed-link.vue'

export default 
  {
		props: ['category_list', 'base_url'],
		name: 'category-menu',
		components: {
			'my-routed-link': my_routed_link
		}
	}
</script>

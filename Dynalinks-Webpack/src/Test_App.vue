<template>
  <div id="app">
    <h1>My Components</h1>
	<category-menu v-bind:base_url="base_url" v-bind:category_list="category_list"></category-menu>

	<page-menu v-bind:tags="current_category.tags" v-bind:base_url="category_url">
	</page-menu>

		<page-view-grid :page_content="page_content"></page-view-grid>
	
<hr>
	<page-item :link_item="{'href':'test','text':'text'}"></page-item>

	<dynamic-link :base_url="'base'" :fragments="['one','two']"></dynamic-link>
	<page-view-table :page_content="data"></page-view-table>
	<page-menu :base_url="pages.base_url" :tags="pages.tags"></page-menu>
	<form-update :page_content="form_update_data"></form-update>
	
	
  </div>
</template>



<script>
import category_menu from './components/category-menu.vue'
import page_item from './components/page-item.vue'
import page_view_grid from './components/page-view-grid.vue'
import dynamic_link from './components/dynamic-link.vue'
import page_view_table from './components/page-view-table.vue'
import page_menu from './components/page-menu.vue'
import form_update from "./components/form-update.vue"
import Mock_Dynalinks from './mock_dynalinks'



export default {
  name: 'app',
  data () {
	var item = {href: "http", "text": "test text", "tag": "page"};
	var item_item = {item: item, category: "category 1"};
	var tags = ["AAA", "BBB", "CCC"];
	
	var dynalinks = new Mock_Dynalinks();	
    return {
		"category_list": dynalinks.category_list,
		"base_url": "view/",
		"page_content": {
			"data": dynalinks.current_category.pages[ dynalinks.current_category.tags[0] ],
			category: dynalinks.current_category.category_name			
		},
		"current_category": dynalinks.current_category,
		"category_url": dynalinks.current_category.category_name + "/",
		"data": {
			results: [ item_item],
		},
		"pages": {
			"base_url": "view",
			"tags": tags,
		},
		form_update_data: {
			"item": item,
			"tags": tags
		},
    }
  },
  
  components: {
	'page-item': page_item,
	'page-view-grid': page_view_grid,
	'dynamic-link': dynamic_link,
	'page-view-table': page_view_table,
	'page-menu': page_menu,
	'form-update': form_update,
	'category-menu': category_menu
  }
}


</script>




<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

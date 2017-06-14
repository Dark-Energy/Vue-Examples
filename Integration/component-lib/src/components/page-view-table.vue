<template>
	<div><p>результаты поиска</p>
		<h3>Найдено <span> {{page_content.results.length}} </span> записей </h3>
		<table class="search-result">
			<thead>
				<tr>
					<td>Ссылка</td>
					<td>Страница</td>
					<td>Категория</td>
					<td>Показать на странице</td>
				</tr>
			</thead>
			<tbody >
				<tr v-for="item in page_content.results">
					<td><a v-bind:href="item.item.href"> {{item.item.text}} </a></td>
					<td >{{item.item.tag}}</td>
					<td >{{item.category}}</td>
					<td> <dynamic-link v-bind:fragments="[item.category,item.item.tag]" v-bind:text="item.item.text" v-bind:base_url="'#view'"></dynamic-link> </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

import dynamic_link from './dynamic-link.vue'

export default {
	props: ['page_content'],
	name: 'page-view-table',
	components: {
		'dynamic-link': dynamic_link,
	},
}
</script>
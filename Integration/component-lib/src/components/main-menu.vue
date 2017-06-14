<template>
<div class="top-line top-buttons line-menu">
	<ul>
	<li><a href="javascript:void(0);" id="button-add" v-on:click="add_item">Добавить ссылку</a></li>
	<li><a href="javascript:void(0);" id="button-create-category" v-on:click="create_category">Создать категорию</a></li>
	<li><a href="javascript:void(0);" id="button-move" v-on:click="move_page">Перенести</a></li>
	<li><a href="javascript:void(0);"> Удалить</a>
		<ul>
			<li><a href="javascript:void(0);" id="button-remove-tag" v-on:click="remove_page"> страницу</a></li>
			<li><a href="javascript:void(0);" id="button-remove-category" v-on:click="remove_category"> категорию</a></li>
		</ul>
	</li>
	<li><A href="javascript:void(0);">Экспортировать</a>
		<ul>
		<li><a href="javascript:void(0);" id="button-export-tag" v-on:click="export_page"> страницу</a></li>
		<li><a href="javascript:void(0);" id="button-export-category" v-on:click="export_category"> категорию </a>	</li>
		</ul>
	</li>
	<li><a href="javascript:void(0);" id="button-edit-page" v-on:click="edit_mode">Правка</a></li>
	<li><a href="javascript:void(0);" id="button-save" v-on:click="save_all"> Сохранить всё</a></li>
	<li><input type="text" id="search-box" v-model="search_text" placeholder="искать..."><button type="button" id="search-button" v-on:click="search_record">искать</button></li>
	</ul>
</div>
</template>

<script>
export default {
	name: 'main-menu',
	props: ['application'],
	data: function () {
		return {'search_text': ''};
	},
	methods: {
		save_all: function () 
		{
			this.application.save_to_file();
		},
		add_item: function ()
		{
			this.application.add_item();
		},
		create_category: function ()
		{
			this.application.create_category();
		},
		remove_page: function ()
		{
			this.application.remove_tag();
		},
		remove_category: function ()
		{
			this.application.remove_category();
		},
		move_page: function ()
		{
			this.application.move_tag();
		},
		export_category: function ()
		{
			this.application.export_category();
		},
		export_page: function ()
		{
			this.application.export_tag();
		},
		search_record: function ()
		{
			this.application.search(this.search_text);
		},
		edit_mode: function ()
		{
			this.application.turn_edit_mode();
		}
	}
}
</script>
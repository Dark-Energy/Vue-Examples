function register_main_menu(application) 
{

var main_menu_template = '<div class="top-line top-buttons line-menu">\
	<ul>\
	<li><a href="javascript:void(0);" id="button-add" v-on:click="add_item">Добавить ссылку</a></li>\
	<li><a href="javascript:void(0);" id="button-create-category" v-on:click="create_category">Создать категорию</a></li>\
	<li><a href="javascript:void(0);" id="button-move" v-on:click="move_page">Перенести</a></li>\
	<li><a href="javascript:void(0);"> Удалить</a>\
		<ul>\
			<li><a href="javascript:void(0);" id="button-remove-tag" v-on:click="remove_page"> страницу</a></li>\
			<li><a href="javascript:void(0);" id="button-remove-category" v-on:click="remove_category"> категорию</a></li>\
		</ul>\
	</li>\
	<li><A href="javascript:void(0);">Экспортировать</a>\
		<ul>\
		<li><a href="javascript:void(0);" id="button-export-tag" v-on:click="export_page"> страницу</a></li>\
		<li><a href="javascript:void(0);" id="button-export-category" v-on:click="export_category"> категорию </a>	</li>\
		</ul>\
	</li>\
	<!--li><a href="javascript:void(0);" id="button-edit-page" v-on:click="edit_mode">Правка</a></li-->\
	<li><a href="javascript:void(0);" id="button-save" v-on:click="save_all"> Сохранить всё</a></li>\
	<li><input type="text" id="search-box" v-model="search_text" placeholder="искать..."><button type="button" id="search-button" v-on:click="search_record">искать</button></li>\
	</ul>\
</div>';



var Application_Main_Menu = {
	data: function () {
		return {'search_text': ''};
	},
	template: main_menu_template,
	methods: {
		save_all: function () 
		{
			application.save_to_file();
		},
		add_item: function ()
		{
			application.add_item();
		},
		create_category: function ()
		{
			application.create_category();
		},
		remove_page: function ()
		{
			application.remove_tag();
		},
		remove_category: function ()
		{
			application.remove_category();
		},
		move_page: function ()
		{
			application.move_tag();
		},
		export_category: function ()
		{
			application.export_category();
		},
		export_page: function ()
		{
			application.export_tag();
		},
		search_record: function ()
		{
			application.search(this.search_text);
		},
        /*
		edit_mode: function ()
		{
			application.turn_edit_mode();
		}
        */
	}
};
	
var main_menu_app = new Vue( {
	el: "#main-menu-app",
	components: {
		"application-main-menu": Application_Main_Menu 
	},
	});
	
}


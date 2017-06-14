import main_menu from './components/main-menu.vue'



export function create_main_menu(application) {
	var app_main_menu = new Vue( {
			el: "#main-menu-app",
			data: {
				"application": application,
			},
			components: {
				"application-main-menu": main_menu
			},
		});
		return app_main_menu;
}

import page_item from './components/page-item.vue'
import page_view_grid from './components/page-view-grid.vue'
import dynamic_link from './components/dynamic-link.vue'
import page_view_table from './components/page-view-table.vue'
import page_menu from './components/page-menu.vue'
import form_update from "./components/form-update.vue"
import category_menu from "./components/category-menu.vue"



export function create_vue_app(application)
{
	var category_list = application.dynalinks.category_list;
	var categories = application.dynalinks.categories;
	

	var current_category_name = category_list[0].href;
	var current_category = categories[current_category_name];

	var app = new Vue({
		el: '#app',
		components: {'page-item': page_item,
			'page-view-grid': page_view_grid,
			'dynamic-link': dynamic_link,
			'page-view-table': page_view_table,
			'page-menu': page_menu,
			'form-update': form_update,
			'category-menu': category_menu,
		},
		
		data: {
			//"current_category": current_category,		
			//"category_url": "view/" + current_category_name,			
			//"tags": current_category.tags,			
			//"pages": current_category.pages,
			//"current_page": current_category.pages[get_first_key(current_category.pages)],
			//"current_category_name" : current_category_name,			
			"current_category": {},
			"category_url": "",
			"tags": {},
			"pages": {},
			"current_page": {},
			"current_category_name" : "",
			
			"base_url": "view/",
			"category_list": category_list,
			"categories": categories,
			"page_content_view": "page-view-grid",
			"error_message": {},
			"page_content": {},
			"main_page_view": "page-view-grid",
			"features": {},

		},
		methods: {
			"show_error": function (error)
			{
				this.error_message.message = error;
				this.page_content_view = 'error-message';
				this.page_content = this.error_message;
				this.current_category = {};
			},
			"restore_page_view": function ()
			{
				if (this.page_content_view !== this.main_page_view){
					this.page_content_view = this.main_page_view;
				}
			},
			"show_update_form": function (item, category, callback) 
			{
				this.show_category(category);
				this.page_content_view = "form-update";
				this.page_content = {
					item: item,
					callback: callback,
					tags: this.tags
				};
			},
			"check_error": function () 
			{
				if (this.error_message.message) {
					this.error_message.message = '';
					this.page_content_view = "page-view-grid";
				}
			},
			"select_category": function (category)
			{
				this.current_category_name = category;
				this.current_category = this.categories[category];
				this.tags = this.current_category.tags;
				this.category_url = this.base_url + category + "/";
				this.active_page_name = '';	
				this.features = this.current_category.favorites;
			},
			//show category frame only
			"show_category": function (category)
			{
				//this.restore_page_view();
				
				if (!this.categories[category] || category === this.current_category_name) {
					return;
				}
			
				this.select_category(category)
			},
			"show_page": function (page) 
			{
				if (!this.current_category_name) {
					return;
				}

				
				if (this.active_page_name !== page || this.page_content_view !== this.main_page_view) {
					this.main_page_view = this.page_content_view = "page-view-grid";
					this.restore_page_view();
					this.active_page_name = page;
					this.current_page = this.categories[this.current_category_name].pages[page];
					this.page_content = {
						"data": this.current_page,
						"category": this.current_category_name
					};
				}
			},
			
			"show_search_result": function (results)
			{
				this.change_page_view("page-table-view");
				this.page_content_view = "page-table-view";
				this.page_content = {results:results};
			},
			
			"change_page_view": function (new_view)
			{
				this.main_page_view = new_view;
				//this.page_content_view = new_view;
				this.show_page(this.active_page_name);
			},
			
		}
	});
	return app;
}


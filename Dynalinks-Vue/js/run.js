!(function () {
	if (typeof my_links === 'undefined') {
		var my_links = {
		database: {},
		names: {}
		};
	}
})();


function Vue_Application(data)
{
	Application.call(this, data);
	this.dynalinks.Database_Var = "my_links";
}

Vue_Application.prototype = Object.create( Application.prototype );
Vue_Application.prototype.constructor = Vue_Application;


var event_bus;

Vue_Application.prototype.initialize = function ()
{
	event_bus = new Vue();
	if (typeof dynalinks_vue === 'object') {
		this.main_menu = dynalinks_vue.create_main_menu(this);
		this.vue = dynalinks_vue.create_vue_app(this);
	} else {
		register_main_menu(this);
		this.vue = create_vue_app(dynalinks);		
	}

	this.init_router();	
	var self = this;
	event_bus.$on("delete-record", function (id) {
		self.remove_item( id );		
	});
}

Vue_Application.prototype.add_item = function ()
{
	var context = this.dynalinks.get_active_context();
	if (context) {
		var category = context.category_name;
		mr.navigate('add/'+category, true);
	} else {
		console.log("Error add record! Category not found!", this.dynalinks.category_name);
	}
}

Vue_Application.prototype.turn_edit_mode = function ()
{
	if (this.vue.main_page_view === "grid-edit") {
		this.vue.change_page_view("page-content-grid");
	} else {
		this.vue.change_page_view("grid-edit");
	}
}


Vue_Application.prototype.show_category_page = 	function (category, page)
{
	if (!category || !this.vue.categories[category]) {
		console.log("Error! Category " + category + " not found!");
		this.vue.show_error("Error! Category " + category + " not found!");
	} else {
	
		if (this.vue.current_category 
		&& this.vue.current_category !== category) {
			this.dynalinks.set_category(category);
			this.vue.show_category(category);				
		}
		
		if (page) {
			this.dynalinks.set_page(page);	
			this.vue.show_page(page);
		} else {
			var name = dynalinks.get_first_page_from_category(category);
			this.dynalinks.set_page(name);				
			this.vue.show_page(name);
		}
	}
}

Vue_Application.prototype.show_search_result = function (value)
{
	var results = this.dynalinks.search(["text", "href"], value);
	this.search_results = results;
	this.vue.show_search_result(results);
}




Vue_Application.prototype.add_record_to_category = function (category)
{
	var cat = this.dynalinks.categories[category];
	if (!cat) {
		this.vue.show_error("Category " + category + " not found!");
		return;
	}
	var self = this;
	var item = 
	{
		tag: this.vue.active_page_name,
		text: '',
		href: '',
		favorite: false,
		favorite_text: '',
	}
	this.vue.show_update_form(item, category,
		function (value) {
			var item = clone_fields(value, ["href", "text", "tag", "favorite", "favorite_text"]);
			//var item = create_clone_object(value);
			//item.tag = value.item.new_tag || item.tag;
			//var item = value;
			self.dynalinks.add_link_to_category(item, category);
			var tag = item.tag;
			mr.navigate(self.dynalinks.create_url(category, tag), true);
	});
}

Vue_Application.prototype.update_record = function (category, id)
{
	var self = this;
	var cat = self.dynalinks.categories[category];
	if (!cat) {
		console.log("Error update record!");
		return;
	}
	var record = cat.hash[id];
	if (!record) {
		console.log("Error update record!");
		return;
	}
	self.vue.show_update_form(record, category, function (value ) {
		mr.navigate(self.dynalinks.create_url(category, value.tag), true);			
	});
}

Vue_Application.prototype.init_router = function ()
{
	var self = this;
	
	mr = new My_Router();	

	mr.add_route("view/:category", this.show_category_page, this);
	mr.add_route("view/:category/:page", this.show_category_page, this);
	
	mr.add_route("update/:category/:id", this.update_record, this);
	mr.add_route("add/:category", this.add_record_to_category, this);
	
		
	mr.add_default( function (url) 
		{
			name = self.vue.category_list[0].href;
			this.show_category_page(name);
		}, this);
		
		
	mr.add_route("search/:value", function (value) {
		self.show_search_result(decodeURIComponent(value));
	}, this);
		
	mr.start(true);	
}



var app = new Vue_Application(my_links);
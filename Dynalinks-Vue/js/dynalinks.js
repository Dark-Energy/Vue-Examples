Dynalinks.Utils = {};

Dynalinks.Utils.create_id = function ()
{
	return Math.random().toString(36).substr(2, 9) + Date.now().toString();
}

Dynalinks.Utils.check_item = function (item)
{
	if (! item._id) {
		item._id = Dynalinks.Utils.create_id();
	}
	if (item.favorite && !item.favorite_text) {
		item.favorite_text = item.text;
	}
	if (!item.favorite && item.favorite_text) {
		item.favorite = true;
	}
}

Dynalinks.Utils.check_database = function (data)
{
	for(var cat in data) {
		arr = data[cat];
		for(var i =0; i < arr.length; i++) {
			Dynalinks.Utils.check_item(arr[i]);
		}
	}
}

/*
names = dictionary of {hash: name}
categories = dictionary of {hash: Context}
category_list = array of {href: hash, text: name}
*/
function Dynalinks(data, lazy_parse)
{
	this.database = data.database;
	//Dynalinks.Utils.check_database(data.database);
	this.names = data.names;
	this.categories = {};
	if (!lazy_parse) {
		this.parse_database();	
	}
}

Dynalinks.prototype.create_url = function(category, tag)
{
	var a = Array.prototype.slice.call(arguments, 0);
	a.unshift("view");
	return create_url.apply(this, a);
}

Dynalinks.prototype.Database_Name = "database.txt";

/*
	CONTEXT
	
class Context
{
	category_name: string,
	pages : dictionary of Array of Record,
	favorites : array,
	tags: array oi String,
}
	
*/
Dynalinks.Context = function (data, category)
{
	this.category_name = category;
	this.pages = {};
	this.favorites = new Array();
	this.tags = new Array();
	this.hash = {};
	
	if (!data) {
		return;
	}
	
	var item, tag;
	for(var i = 0; i < data.length; i++)
	{
		item = data[i];
		//#check integrity
		//Dynalinks.Utils.check_item(item);
		this.hash[item._id] = item;
		
		tag = item["tag"];
		
		if (!this.pages[tag])
		{
			this.pages[tag] = new Array();
			this.tags.push(tag);
		}
		this.pages[tag].push(item);
		if (item.favorite) {
			this.favorites.push(item);
		}
	}
}


Dynalinks.Context.prototype.move_item = function (item, new_tag)
{
	var page = this.get_page(item.tag);
	var new_page = this.get_page(new_tag);
	new_page.push(item);
	item.tag = new_tag;
	remove_by_field_value(page, '_id', item._id);
}


Dynalinks.Context.prototype.change_favorite = function(item, favorite, favorite_text)
{
	if (item.favorite === favorite && item.favorite_text === favorite_text) {
		return;
	}
	
	function get_new_favorite_text(item, favorite, favorite_text)
	{
		var new_favorite_text = "";
		if (favorite) {
			var new_favorite_text = favorite_text ||  item.favorite_text || item.text;
			if (favorite_text && favorite_text !== new_favorite_text) {
				new_favorite_text = favorite_text;
			}
		}
		return new_favorite_text;
	}
	
	//fix it
	//observable 'favorites' array must contains particular 'favorite' structure with observable fields 
	//this very shit
	function hack(list, item) 
	{
		remove_by_field_value(list, '_id', item._id);
		list.push( item );
	}
	
	var new_favorite_text = get_new_favorite_text(item, favorite, favorite_text);
	
	var list_unchange = true;
	
	//remove or add to favorites
	if (item.favorite !== favorite) {
		item.favorite = favorite;	
		if (!item.favorite) {
			remove_by_field_value(this.favorites, '_id', item._id);
			delete item.favorite_text;
		}
		else {
			item.favorite_text = new_favorite_text;
			this.favorites.push( item );
		}
		list_unchange = false;
	}

	if (item.favorite && item.favorite_text !== new_favorite_text) 	{
		item.favorite_text = new_favorite_text;
		if (list_unchange) {
			hack(this.favorites, item);
		}
	}
	
	this.favorites.valueHasMutated();
}


//create new page if doen't exists
Dynalinks.Context.prototype.get_page = function (tag)
{
	var page = this.pages[tag];
	if (!page) {
		this.pages[tag] = page = new Array();
		this.tags.push(tag);
	}
	return page;
} 

Dynalinks.Context.prototype.remove_page = function (tag)
{
	//remove page from page list
	var page = this.pages[tag];
	delete this.pages[tag];
	if (!page) return;
	
	//remove items from hash
	for(var i = 0; i < page.length; i++) {
		delete this.hash[page._id];
	}
	
	//remove page tag from tag list
	remove_by_value(this.tags, tag);
	
	//clean favorite list
	remove_by_field_value(this.favorites, "tag", tag)
}

//1) add to page; 2) add to favorites, if marked; 3) add to hash
Dynalinks.Context.prototype.add_item = function (item)
{
	Dynalinks.Utils.check_item(item);
	
	if (this.hash[item._id]) {
		return;
	}
	var page = this.get_page(item.tag);
	page.push(item);
	if (item.favorite) {
		this.favorites.push(item);
	}
	this.hash[item._id] = item;
}

Dynalinks.Context.prototype.remove_item = function (item)
{
	//remove from hash
	if (!this.hash[item._id]){
		return;
	}
	
	//remove from favorite list
	if (item.favorite) {
		remove_by_field_value(this.favorites, '_id', item._id);
	}
	
	//remove from page 
	var page = this.get_page(item.tag);
	remove_by_field_value(page, '_id', item._id);
	
	//remove from hash
	delete this.hash[item._id];
}

/*
CONTEXT MANAGEMENT
*/
Dynalinks.prototype.create_context = function (category)
{
	var links = this.database[category];
	if (!links) {
		console.log("error create context! Not found category ", category);
		return null;
	}
	var context = new Dynalinks.Context(links, category);	
	
	return context;
}

Dynalinks.prototype.get_category_context = function(category, force)
{
	var context = this.categories[category];
	if (!context || force) {
		this.categories[category] = context = this.create_context(category);
	}
	return context;
}

Dynalinks.prototype.get_active_context = function ()
{
	return this.get_category_context(this.current_category);
}

function check_key(obj, key)
{
	for(var k in obj) {
		if (k === key) {
			return true;
		}
	}
	return false;
}

Dynalinks.prototype.get_page_template = function ()
{
	return this.templates[this.display_mode];
}



Dynalinks.prototype.get_first_page_from_category = function (category)
{
	var cat = this.get_category_context(category);
	return cat.tags[0];
}

Dynalinks.prototype.get_page_from_category = function (category, page)
{
	var cat = this.get_category_context(category);
	return cat.pages[page];
}

Dynalinks.prototype.set_category = function (name)
{
	var context = this.get_category_context(name);
	this.context = context;
	this.current_category = name;	
}

Dynalinks.prototype.set_page = function (name)
{
	this.context = this.get_active_context();
	//empty data
	if (!this.context) {
		return;
	}
	if (!name || !this.context.pages[name]) {
		var old_name = name;
		name = get_first_key_secure(this.context.pages);
		//console.log("page " + old_name + " not found, show page "+name);
		if (!name) {
			console.log("category is empty, there are not page for show they");
		}
	}
	this.context.current_tag = name;
	this.current_page = this.context.pages[name];
}

Dynalinks.prototype.parse_database = function ()
{
	for (var catname in this.names) {
		if (Object.prototype.hasOwnProperty.call(this.names, catname)) {
			this.get_category_context(catname);
		}
	}
	this.category_list = dictionary_to_array(this.names, "href", "text");
	if (this.category_list.length > 0) {
		catname = this.category_list[0].href;
		this.set_category(catname);
	}
}


//category should exits
Dynalinks.prototype.add_link_to_category = function (item, category)
{
	//first add to database
	if (!this.database[category]) {
		console.log("Error! This category doesn't exits!", category);
	}
	/*
	//we must push the item in context and database
	//first push it to the context
	//second push it to the database
	*/
	this.database[category].push(item);	
	var context = this.get_category_context(category);
	context.add_item(item);
}


Dynalinks.prototype.remove_by_id = function (id)
{
	var item = remove_by_field_value(this.database[this.context.category_name], '_id', id);
	this.context.remove_item(item);	
}

Dynalinks.prototype.add_category = function (name)
{
	if (this.database[name]) {
		alert("Категория с таким названием уже существует!");
		return;
	}
	if (!name)  {
		alert("Имя новой категории не задано!");
		return;
	}
	this.database[name] = new Array();
	this.names[name] = name;
	this.get_category_context(name);
	
	this.category_list.push({href:name, text: name});
}

Dynalinks.prototype.remove_tag = function (category, tag)
{
	remove_all_by_field_value(this.database[category], "tag", tag);
	
	var context = this.get_category_context(category);
	context.remove_page(tag);
}

Dynalinks.prototype.move_tag = function (tag, old_category, new_category)
{
	if (old_category === new_category) {
		return;
	}
	//1. update database
	if (!this.names[new_category]) {
		this.add_category(new_category);
	}
	var src = this.database[old_category];
	var dest = this.database[new_category];
	var i = 0;
	while( i < src.length) {
		if (src[i].tag === tag) {
			dest.push(src[i]);
			src.splice(i, 1);
		}
		else {
			i++;
		}
	}
	//2. update viewmodel, we just destroy existed contexts and create they again, too poor
	var old_context = this.get_category_context(old_category, true);	
	var new_context = this.get_category_context(new_category, true);
	//this.context = new_context;
	
	//if this tag exists, then need join it with moving tag
	//logic behind removing and inserting too complexity
	//new_context.insert_page(tag, old_context.pages[tag]);
	//old_context.remove_page(tag);
	
}


Dynalinks.prototype.save_data_to_file = function(filename, data, varname)
{
	var text = JSON.stringify(data, null, " ");
	text = "var " + varname + " = " + text + ";\n";
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});	
	saveAs(blob, filename); 
}

Dynalinks.prototype.save_to_file = function (filename, varname)
{
	var db = {database: this.database, names: this.names};
	this.save_data_to_file(filename || this.Database_Name, db, this.Database_Var);
}

Dynalinks.prototype.get_from_active_context = function(_id)
{
	return find_by_field_value(this.database[this.context.category_name], '_id', _id);
}

//TODO: move special field to inner object 'special'
//or move user fields to suboject 'user_data'?
//or create 'favorites' struct for each category
//this need restruct database
Dynalinks.prototype.update_item = function(old, new_value)
{
	//check favorite status
	//this very shit
	//if (old.favorite !== new_value.favorite) 
	{
		this.context.change_favorite(old, new_value.favorite, new_value.favorite_text);
	}
	for(var key in new_value) {
		if (Object.prototype.hasOwnProperty.call(old, key) &&
			key !== 'new_tag' && key !== 'tag' && key !== "favorite_text" && key !== "favorite")
		{
			old[key] = new_value[key];
		}
	}
	
	//check tag changes
	if (old.tag !== new_value.tag || new_value.new_tag) {
		this.context.move_item(old, new_value.new_tag || new_value.tag);
	}
	return {"category": this.context.category_name, "tag": old.tag};
	
}

Dynalinks.prototype.export_category = function (name)
{
	this.save_data_to_file(name + ".txt", this.database[name], "my_cat");
}



Dynalinks.prototype.export_tag = function (category, tag)
{
	var context = this.get_category_context(category);
	var data = context.pages[tag];
	this.save_data_to_file(tag + ".txt", data, "my_page");
}


Dynalinks.prototype.remove_category = function (name)
{
	if (this.database[name]) {
		delete this.database[name];
	}
	if (this.categories[name]) {
		delete this.categories[name];
	}
	if (this.names[name]) {
		delete this.names[name];
	}
	remove_by_field_value(this.category_list, 'href', name);
}

/*
return Array of {item: record, category: name of category}
*/
Dynalinks.prototype.search = function (fields, value)
{
	value = value.toUpperCase();
	var cat;
	var result = new Array;
	var name;
	for(var i=0; i < this.category_list.length; i++) {
		name = this.category_list[i].href;
		cat = this.database[name];
		cat.forEach( function (item) {
			fields.every( function (field) { 
				var tmp = item[field].toUpperCase();
				if (tmp.search(value) !== -1) {
					result.push( {"item": item, "category": name});
					return false;
				}
				return true;
			});
		});
	}
	return result;
}

import my_links from "./test_data.js"

export default  function ()
{
	this.names = my_links.names;
	this.category_list = [
		{"href":"English", "text":"English"},
		{"href":"English", "text":"English"}
	]
	var context	 = {
			"category_name": "English",
			"favorites": [],
			"pages": {},
			"tags": [],
	}
	var data = my_links.database["English"];
	for(var i = 0; i < data.length; i++)
	{
		var item = data[i];
	
		var tag = item["tag"];
		
		if (!context.pages[tag])
		{
			context.pages[tag] = new Array();
			context.tags.push(tag);
		}
		context.pages[tag].push(item);
		if (item.favorite) {
			context.favorites.push(item);
		}
	}
	
	this.categories = {"English": context};
	this.current_category = context;
}
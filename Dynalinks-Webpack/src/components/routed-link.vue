<script>
	//rough hack!
export default {
			name: 'my-routed-link' ,
			props: ['base_url','url'],
			render: function (createElement) {
				var href = '#' + this.base_url;
				var text = this.url.text || this.url;
				if (this.url.href) {
					href += this.url.href;
				} else {
					href += this.url;
				}
				var elem = createElement('a', 
					{attrs: {
						"href":  href
					}},
					text);
				return elem;
			}
		}
</script>
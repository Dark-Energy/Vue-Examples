<script>
//url, params and fragments is mutual exludes
export default { 
	name: 'dynamic-link',
			props: ['base_url','url','fragments', 'text', 'params'],
			render: function (createElement) {
				var url = this.params && this.params.href || this.url;				
				
				var href = '';
				if (this.fragments && this.fragments.length > 0) {
					href = this.fragments.join('/');
				} else {
					href = url;
				}
				
				if (this.base_url) {
					href = this.base_url + '/'+href;
				}
				
				var text = this.params && this.params.text || this.url || this.text || href;								
				var elem = createElement('a', 
					{attrs: {
						"href":  href
					}},
					text);
				return elem;
			}
		};

</script>

<script>
export default {name: 'dropdown-category-menu',
		props: ['category_list', 'base_url', 'categories'],
}
</script>

<template>
		<div class="line-menu">
        <ul class="top-line top-buttons">
        <li v-for="item in category_list">
            <routed-link  v-bind:url="item" v-bind:base_url="base_url"> </routed-link>
            <ul v-if="categories[item.href]" class="submenu">
                <li v-for="link in categories[item.href].favorites">
                    <a :href="link.href">{{link.favorite_text || link.text}}</a>
                </li>
            </ul>
        </li>
		</ul></div>
</template>

    

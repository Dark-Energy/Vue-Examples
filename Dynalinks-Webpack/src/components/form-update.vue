<template>
<div class="update-form" id="update-form">
	<h3>Создание новой записи</h3>
	<div v-if="message" class="warning-message">
		{{message}}
	</div>
	<div class="required-fields fields"> 
		<h3>Обязательно заполните эти поля</h3>
		<p>
			Адрес <br>
			<input type="text" v-model="page_content.item.href" size=60>
		</p>
		<p> 
			Текст <br> 
			<input type="text" v-model="page_content.item.text" size=60>
		</p>
		<p> 
			Выберите тег 
			<select class="select-tag" v-model="page_content.item.tag"> 
				<option v-for="tag in page_content.tags" v-bind:value="tag"> {{tag}} </option>
			</select>
			или создайте новый 
			<input type="text" v-model="new_tag">
		</p>
	</div>
	<div class="other-fields fields">
		<p>
			Избранное 
			<input type="checkbox" v-model="page_content.item.favorite" >
			Текст для избранного 
			<input v-model="page_content.item.favorite_text" v-bind:disabled="!page_content.item.favorite">
		</p>
	</div>
	<button class="save-button" type="button" v-on:click="save" id="update-form-save-button">Save</button>
	<button class="cancel-button" type="button" v-on:click="cancel">Отмена</button>
</div>
</template>


<script>
	export default {
	name: 'form-update', 
	props: ["page_content"],
	methods: {
		cancel: function () {
			if (this.page_content.cancel_callback) {
				this.page_content.cancel_callback();
			} else {
				console.log("Error cancel add new record! Not given cancel callback!");
			}
		},
		save: function () {
			if (this.message) {
				this.message = '';
			}
			if ((!this.page_content.item.tag && !this.new_tag) 
			|| !this.page_content.item.href || !this.page_content.item.text) {
				this.message = 'Одно или несколько обязательных полей не заполнены!';
			} else {
				this.page_content.item.tag = this.new_tag || this.page_content.item.tag;
				if (this.page_content.callback) {
					this.page_content.callback(this.page_content.item);
				}
			}
		},
	},
	
	data: function () {
		var data = {};
		data.message = '';
		data.new_tag = undefined;
		return data;
	},
	}
</script>
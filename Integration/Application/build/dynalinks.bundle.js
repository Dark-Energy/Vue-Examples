!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.dynalinks_vue=e():t.dynalinks_vue=e()}(this,function(){return function(t){function e(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=19)}([function(t,e){t.exports=function(t,e,n,a,r){var i,o=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(i=t,o=t.default);var c="function"==typeof o?o.options:o;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns),a&&(c._scopeId=a);var _;if(r?(_=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=_):n&&(_=n),_){var u=c.functional,l=u?c.render:c.beforeCreate;u?c.render=function(t,e){return _.call(e),l(t,e)}:c.beforeCreate=l?[].concat(l,_):[_]}return{esModule:i,exports:o,options:c}}},function(t,e,n){var a=n(0)(n(11),null,null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(18),null,null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(10),n(24),null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(12),n(23),null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(13),n(22),null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(14),n(20),null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(15),n(26),null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(16),n(21),null,null,null);t.exports=a.exports},function(t,e,n){var a=n(0)(n(17),n(25),null,null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),r=n.n(a);e.default={props:["category_list","base_url"],name:"category-menu",components:{"my-routed-link":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"dynamic-link",props:["base_url","url","fragments","text","params"],render:function(t){var e=this.params&&this.params.href||this.url,n="";return n=this.fragments&&this.fragments.length>0?this.fragments.join("/"):e,this.base_url&&(n=this.base_url+"/"+n),t("a",{attrs:{href:n}},this.params&&this.params.text||this.url||this.text||n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"form-update",props:["page_content"],methods:{cancel:function(){this.page_content.cancel_callback?this.page_content.cancel_callback():console.log("Error cancel add new record! Not given cancel callback!")},save:function(){this.message&&(this.message=""),(this.page_content.item.tag||this.new_tag)&&this.page_content.item.href&&this.page_content.item.text?(this.page_content.item.tag=this.new_tag||this.page_content.item.tag,this.page_content.callback&&this.page_content.callback(this.page_content.item)):this.message="Одно или несколько обязательных полей не заполнены!"}},data:function(){var t={};return t.message="",t.new_tag=void 0,t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"main-menu",props:["application"],data:function(){return{search_text:""}},methods:{save_all:function(){this.application.save_to_file()},add_item:function(){this.application.add_item()},create_category:function(){this.application.create_category()},remove_page:function(){this.application.remove_tag()},remove_category:function(){this.application.remove_category()},move_page:function(){this.application.move_tag()},export_category:function(){this.application.export_category()},export_page:function(){this.application.export_tag()},search_record:function(){this.application.search(this.search_text)},edit_mode:function(){this.application.turn_edit_mode()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"page-item",props:["link_item"]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),r=n.n(a);e.default={name:"page-menu",props:["base_url","tags"],components:{"my-routed-link":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default={props:["page_content"],name:"page-view-grid",data:function(){return{edit_mode:!1}},methods:{turn_edit:function(t){this.edit_mode=!this.edit_mode},delete_record:function(t){"object"===("undefined"==typeof event_bus?"undefined":a(event_bus))&&event_bus.$emit("delete-record",t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),r=n.n(a);e.default={props:["page_content"],name:"page-view-table",components:{"dynamic-link":r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"my-routed-link",props:["base_url","url"],render:function(t){var e="#"+this.base_url,n=this.url.text||this.url;return this.url.href?e+=this.url.href:e+=this.url,t("a",{attrs:{href:e}},n)}}},function(t,e,n){"use strict";function a(t){return new Vue({el:"#main-menu-app",data:{application:t},components:{"application-main-menu":o.a}})}function r(t){var e=t.dynalinks.category_list,n=t.dynalinks.categories,a=e[0].href;n[a];return new Vue({el:"#app",components:{"page-item":c.a,"page-view-grid":u.a,"dynamic-link":p.a,"page-view-table":d.a,"page-menu":f.a,"form-update":h.a,"category-menu":b.a},data:{current_category:{},category_url:"",tags:{},pages:{},current_page:{},current_category_name:"",base_url:"view/",category_list:e,categories:n,page_content_view:"page-view-grid",error_message:{},page_content:{},main_page_view:"page-view-grid",features:{}},methods:{show_error:function(t){this.error_message.message=t,this.page_content_view="error-message",this.page_content=this.error_message,this.current_category={}},restore_page_view:function(){this.page_content_view!==this.main_page_view&&(this.page_content_view=this.main_page_view)},show_update_form:function(t,e,n){this.show_category(e),this.page_content_view="form-update",this.page_content={item:t,callback:n,tags:this.tags}},check_error:function(){this.error_message.message&&(this.error_message.message="",this.page_content_view="page-view-grid")},select_category:function(t){this.current_category_name=t,this.current_category=this.categories[t],this.tags=this.current_category.tags,this.category_url=this.base_url+t+"/",this.active_page_name="",this.features=this.current_category.favorites},show_category:function(t){this.categories[t]&&t!==this.current_category_name&&this.select_category(t)},show_page:function(t){this.current_category_name&&(this.active_page_name===t&&this.page_content_view===this.main_page_view||(this.main_page_view=this.page_content_view="page-view-grid",this.restore_page_view(),this.active_page_name=t,this.current_page=this.categories[this.current_category_name].pages[t],this.page_content={data:this.current_page,category:this.current_category_name}))},show_search_result:function(t){this.change_page_view("page-table-view"),this.page_content_view="page-table-view",this.page_content={results:t}},change_page_view:function(t){this.main_page_view=t,this.show_page(this.active_page_name)}}})}Object.defineProperty(e,"__esModule",{value:!0}),e.create_main_menu=a,e.create_vue_app=r;var i=n(5),o=n.n(i),s=n(6),c=n.n(s),_=n(8),u=n.n(_),l=n(1),p=n.n(l),v=n(9),d=n.n(v),g=n(7),f=n.n(g),m=n(4),h=n.n(m),y=n(3),b=n.n(y)},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("a",{attrs:{href:t.link_item.href}},[t._v(" "+t._s(t.link_item.text)+" ")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-content",attrs:{id:"page-content"}},[n("div",[n("button",{attrs:{type:"button"},on:{click:t.turn_edit}},[t._v("Правка")])]),t._v(" "),t._l(t.page_content.data,function(e){return n("div",{staticClass:"editable-link"},[t.edit_mode?n("div",{staticClass:"button-panel"},[n("a",{key:e._id,staticClass:"edit-btn",attrs:{href:"#update/"+t.page_content.category+"/"+e._id}},[t._v("\tПравка\t")]),t._v(" "),n("button",{key:e._id,staticClass:"delete-btn",on:{click:function(n){t.delete_record(e._id)}}},[t._v(" \t\t\tУдалить \t")])]):t._e(),t._v(" "),n("a",{key:e._id,attrs:{href:e.href}},[t._v(" "+t._s(e.text))])])})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"top-line top-buttons line-menu"},[n("ul",[n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-add"},on:{click:t.add_item}},[t._v("Добавить ссылку")])]),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-create-category"},on:{click:t.create_category}},[t._v("Создать категорию")])]),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-move"},on:{click:t.move_page}},[t._v("Перенести")])]),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);"}},[t._v(" Удалить")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-remove-tag"},on:{click:t.remove_page}},[t._v(" страницу")])]),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-remove-category"},on:{click:t.remove_category}},[t._v(" категорию")])])])]),t._v(" "),n("li",[n("A",{attrs:{href:"javascript:void(0);"}},[t._v("Экспортировать")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-export-tag"},on:{click:t.export_page}},[t._v(" страницу")])]),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-export-category"},on:{click:t.export_category}},[t._v(" категорию ")])])])],1),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-edit-page"},on:{click:t.edit_mode}},[t._v("Правка")])]),t._v(" "),n("li",[n("a",{attrs:{href:"javascript:void(0);",id:"button-save"},on:{click:t.save_all}},[t._v(" Сохранить всё")])]),t._v(" "),n("li",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search_text,expression:"search_text"}],attrs:{type:"text",id:"search-box",placeholder:"искать..."},domProps:{value:t.search_text},on:{input:function(e){e.target.composing||(t.search_text=e.target.value)}}}),n("button",{attrs:{type:"button",id:"search-button"},on:{click:t.search_record}},[t._v("искать")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"update-form",attrs:{id:"update-form"}},[n("h3",[t._v("Создание новой записи")]),t._v(" "),t.message?n("div",{staticClass:"warning-message"},[t._v("\n\t\t"+t._s(t.message)+"\n\t")]):t._e(),t._v(" "),n("div",{staticClass:"required-fields fields"},[n("h3",[t._v("Обязательно заполните эти поля")]),t._v(" "),n("p",[t._v("\n\t\t\tАдрес "),n("br"),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.page_content.item.href,expression:"page_content.item.href"}],attrs:{type:"text",size:"60"},domProps:{value:t.page_content.item.href},on:{input:function(e){e.target.composing||(t.page_content.item.href=e.target.value)}}})]),t._v(" "),n("p",[t._v(" \n\t\t\tТекст "),n("br"),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.page_content.item.text,expression:"page_content.item.text"}],attrs:{type:"text",size:"60"},domProps:{value:t.page_content.item.text},on:{input:function(e){e.target.composing||(t.page_content.item.text=e.target.value)}}})]),t._v(" "),n("p",[t._v(" \n\t\t\tВыберите тег \n\t\t\t"),n("select",{directives:[{name:"model",rawName:"v-model",value:t.page_content.item.tag,expression:"page_content.item.tag"}],staticClass:"select-tag",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.page_content.item.tag=e.target.multiple?n:n[0]}}},t._l(t.page_content.tags,function(e){return n("option",{domProps:{value:e}},[t._v(" "+t._s(e)+" ")])})),t._v("\n\t\t\tили создайте новый \n\t\t\t"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.new_tag,expression:"new_tag"}],attrs:{type:"text"},domProps:{value:t.new_tag},on:{input:function(e){e.target.composing||(t.new_tag=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"other-fields fields"},[n("p",[t._v("\n\t\t\tИзбранное \n\t\t\t"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.page_content.item.favorite,expression:"page_content.item.favorite"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.page_content.item.favorite)?t._i(t.page_content.item.favorite,null)>-1:t.page_content.item.favorite},on:{__c:function(e){var n=t.page_content.item.favorite,a=e.target,r=!!a.checked;if(Array.isArray(n)){var i=t._i(n,null);r?i<0&&(t.page_content.item.favorite=n.concat(null)):i>-1&&(t.page_content.item.favorite=n.slice(0,i).concat(n.slice(i+1)))}else t.page_content.item.favorite=r}}}),t._v("\n\t\t\tТекст для избранного \n\t\t\t"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.page_content.item.favorite_text,expression:"page_content.item.favorite_text"}],attrs:{disabled:!t.page_content.item.favorite},domProps:{value:t.page_content.item.favorite_text},on:{input:function(e){e.target.composing||(t.page_content.item.favorite_text=e.target.value)}}})])]),t._v(" "),n("button",{staticClass:"save-button",attrs:{type:"button",id:"update-form-save-button"},on:{click:t.save}},[t._v("Save")]),t._v(" "),n("button",{staticClass:"cancel-button",attrs:{type:"button"},on:{click:t.cancel}},[t._v("Отмена")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"top-line top-buttons"},t._l(t.category_list,function(e){return n("my-routed-link",{attrs:{url:e,base_url:t.base_url}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("результаты поиска")]),t._v(" "),n("h3",[t._v("Найдено "),n("span",[t._v(" "+t._s(t.page_content.results.length)+" ")]),t._v(" записей ")]),t._v(" "),n("table",{staticClass:"search-result"},[t._m(0),t._v(" "),n("tbody",t._l(t.page_content.results,function(e){return n("tr",[n("td",[n("a",{attrs:{href:e.item.href}},[t._v(" "+t._s(e.item.text)+" ")])]),t._v(" "),n("td",[t._v(t._s(e.item.tag))]),t._v(" "),n("td",[t._v(t._s(e.category))]),t._v(" "),n("td",[n("dynamic-link",{attrs:{fragments:[e.category,e.item.tag],text:e.item.text,base_url:"#view"}})],1)])}))])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("td",[t._v("Ссылка")]),t._v(" "),n("td",[t._v("Страница")]),t._v(" "),n("td",[t._v("Категория")]),t._v(" "),n("td",[t._v("Показать на странице")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"buttons-headers",attrs:{id:"page-menu"}},t._l(t.tags,function(e){return n("my-routed-link",{attrs:{url:e,base_url:t.base_url}})}))},staticRenderFns:[]}}])});
//# sourceMappingURL=dynalinks.bundle.js.map
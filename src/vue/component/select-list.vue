<template>
    <remote-select :value="value" @input="change" :remote-data="remoteData"
                   :multiple="multiple" :placeholder="placeholder"
                   track-by="id" label="name" :loadbefore ="loadbefore">
        <div slot="item" slot-scope="{data}" >
            <span>{{data.name}}</span>
        </div>
    </remote-select>
</template>

<script>
    export default {
        name: 'SelectList',
        props: {
            'value': null,
            'multiple': {
                type: Boolean,
                default: false,
            },
            'placeholder': {
                type: String,
                default: 'Tìm kiếm',
            },
            'state': {
                type: String,
                default: 'active',
            },
            'merchant': {
                type: Number,
            },
            'merchants': {
                type: Array,
            },
            'store': {
                type: Number,
            },
            'tag': {
                type: Number,
            },
            'categorycode': {
                type: String,
            },
            'name':{
            	type: String,
            	required: true,
            },
            'category': {
                type: Number,
            },
            'type': {
                type: Number,
            },
            'typeobj': {
                type: Object,
            },
            'loadbefore': {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            change: function (value) {
                this.$emit('input', value);
            },

            remoteData: async function (query) {
                let r = await this.$api.get({
                    url: this.name,
                    showProgress: false,
                    showError: false,
                    data: {
                        search: query,
                        not_category: this.category ? this.category : null,
                        store_id:this.store ? this.store : null,
                        state: this.state ? this.state : null,
                        merchant:this.merchant ? this.merchant : null,
                        merchants: this.merchants? this.merchants.map(x => x.id).join() : null,
                        store_id:this.store ? this.store : null,
                        category_code:this.categorycode ? this.categorycode : null,
                        type:this.type ? this.type : null,
                        tag: this.tag ? this.tag : null,
                        type_obj:this.typeobj ? this.typeobj.id : null
                    }
                });

                if (!r.meta.success)
                    return [];
                if(r.data.length > 0){
                    return r.data
                }
                else{
                	return  [
	                	{
		                	id: 0,
		                	name: query,
	                	}
                	]
                }
            },
        },
        mounted: function () {
            
        }
    }
</script>
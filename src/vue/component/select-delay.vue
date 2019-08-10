<template>
    <remote-select :value="value" @input="change" :remote-data="remoteData"
                   :multiple="multiple" :placeholder="placeholder"
                   track-by="id" label="name" :loadbefore ="loadbefore">
        <div slot="item" slot-scope="{data}" >
            <span v-if="data.template_id">[templateID: {{data.template_id}}] - {{data.name}}</span>
            <span v-if="!data.template_id">{{data.name}}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px" v-if="data.priority !== null">
                <el-input v-model="data.priority" type="number" style="width: 80px" size="mini"  :min="0" :max="50"></el-input>
            </span> -->
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
            'product': {
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
            'type': {
                type: Number,
            },
            'pagesize': {
                type: Number,
            },
            'category': {
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
                        page_size: this.pagesize ? this.pagesize : null,
                        state: this.state ? this.state : null,
                        merchant:this.merchant ? this.merchant : null,
                        merchants: this.merchants? this.merchants.map(x => x.id).join() : null,
                        not_category: this.category ? this.category : null,
                        store_id:this.store ? this.store : null,
                        product_id:this.product ? this.product : null,
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
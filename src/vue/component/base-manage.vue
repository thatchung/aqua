<template>
    <div>
        <div class="callout callout-info" v-if="stateType === 'loading'">
            <p>Đang tải dữ liệu...</p>
        </div>
        <div class="callout callout-danger" v-if="stateType === 'error'">
            <h4>Lỗi</h4>
            <p>{{stateText}}</p>
        </div>
        <div v-if="mode === 'list'">
            <slot name=filter ></slot>
            <div class="box box-default" >
                <div class="box-body">
                    <div class="form-group">
                        <router-link :to="this.addUrl">
                            <el-button type="primary" size="small">
                                <i class="fa fa-plus"></i> {{this.addLable}}
                            </el-button>
                        </router-link>
                    </div>
                    
                    <table-view v-model="list" @load="loadData">
                        <slot name=table ></slot>
                    </table-view>
                </div>
            </div>
        </div>
        <div v-if="['edit', 'add'].includes(mode)">
            <el-form ref="form" v-model="form" :model="form" :rules="rules" label-position="top"
                    v-if="['ready', 'loading'].includes(stateType)" v-show="stateType === 'ready'">
                <box :title="mode === 'add' ? `${addLable}` : `ID: ${form.id} - ${form.name}`" >
                    <el-row :gutter="20"  v-if="stateType === 'ready'" slot="body">
                        <slot name=field :form="form"></slot>
                        <!-- <el-col :md="24">
                            <el-form-item label="Tên Tag" prop="name">
                                <el-input v-model="form.name" placeholder="Nhập tên Banner" clearable></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <div slot="footer"  class="pull-right">
                        <router-link :to="this.listUrl">
                            <el-button :loading="loading"  type="danger" >Trở về</el-button>
                        </router-link>
                        <el-button :loading="loading" type="warning" v-if="mode === 'edit'" @click="loadData">Hủy</el-button>
                        <slot name=button :load="loading" :mode="mode"></slot>
                    </div>
                </box>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BaseManage',

    props: {
        // mode: {
        //     type: String,
        //     required: true,
        //     validator: value => ['list', 'add', 'edit'].includes(value),
        // },

        'list-url': {
            type: String,
            // required: true,
        },

        'edit-url': {
            type: String,
            // required: true,
        },

        'add-lable': {
            type: String,
            // required: true,
        },

        'add-url': {
            type: String,
            // required: true,
        },

        'url': {
            type: String,
            // required: true,
        },

        'list-api': {
            type: String,
            // required: true,
        },

        'detail-api': {
            type: String,
            // required: true,
        },

        'edit-api': {
            type: String,
            // required: true,
        },

        'add-api': {
            type: String,
            // required: true,
        },

        'data-list': {
            type: Object,
            // required: true,
        },

        'data-edit': {
            type: Object,
            // required: true,
        },

        'data-add': {
            type: Object,
            // required: true,
        },

        'name': {
            type: String,
            // required: true,
        },

        'permission': {
            type: String,
            // required: true,
        },

        'field': {
            type: Array,
            // required: true,
        },

        'filter': {
            type: Object,
            // required: true,
        },

        'id': {
            type: Number,
            // required: true,
        },
    },

    data: () => ({
        mode: null,
        rules: {
            id: [
                {required: true, message: 'Không được bỏ trống'},
            ],
            name: [
                {required: true, message: 'Không được bỏ trống'},
            ],
        },
        form: {
            name: null,
            id: null,
        },
        URL: null,
        // filter: this.filter,
        list: {
            page: 1,
            pageSize: 10,
            total: 0,
            items: []
        },
        stateType: 'ready',
        stateText: null,
        loading:false,
    }),
    methods: {
        validateForm: async function () {
            await this.$util.validateForm(this);
        },
        loadData: async function () {
            // if (this.)
            this.loading=true;
            // if(this.$route.path.slice(this.$route.path.lastIndexOf('/')+1) === 'list') {
            if(this.$route.path.slice(this.$route.path.lastIndexOf('/')+1) === 'list') {
                this.mode = 'list';
                let data = this.dataList;
                let list = await this.$api.get({
                    url: `${this.listApi}`,
                    data: data,
                });
                if (list.meta.success) {
                    this.list.total = list.meta.total;
                    this.list.items = list.data;
                } else {
                    this.list.total = 0;
                    this.list.items = [];
                }
                this.stateType = 'ready';
                this.loading=false;
            }
            else if(this.$route.path.slice(this.$route.path.lastIndexOf('/')+1) === 'new') {
                this.mode = 'add';
                this.stateType = 'ready';
                this.loading=false;
            }
            else if(this.$route.path.slice(this.$route.path.lastIndexOf('/')+1) % 1 === 0) {
                let r = await this.$api.get({
                    url: `${this.detailApi}`,
                    data: {
                        id: this.id,
                    },
                });
                if (r.meta.success) {
                    this.form = r.data;
                } else {
                    return;
                }
                this.stateType = 'ready';
                this.mode = 'edit';
                this.loading=false;
            } 
            else {
                this.mode = null,
                this.stateType = 'error';
                this.stateText = `Không tìm thấy dữ liệu mang id ${this.$route.params.id}`;
                this.$notify.error({title: 'Lỗi', message: 'Dữ liệu đầu vào của trang không tồn tại'});
                return;
            }
        },
        submitLoad: async function () {
            await this.loadData();
        },
        submitEdit: async function () {
            this.loading = true;
            let r = await this.$api.put({
                url: `${this.editApi}`,
                data: this.dataEdit,
            });
            this.loading = false;
            if (!r.meta.success) 
                await this.loadData();
            else 
                this.$notify.success({title: 'Thành công', message: 'Đã cập nhật thành công Merchant tag'});
                await this.loadData();
        },
        
        submitAdd: async function () {
            this.loading = true;
            let r = await this.$api.post({
                url: `${this.addApi}`,
                data: this.dataAdd,
            });
            this.loading = false;

            if (!r.meta.success)
                await this.loadData();
            else 
                this.$notify.success({title: 'Thành công', message: 'Tạo mới thành công Merchant tag'});
                this.$router.push({
                    path: `/shop/merchant/tags/demo/detail/${r.data.id}`,
                });
        },
    },
    loaded: async function () {
        await this.loadData();
    },
}
</script>


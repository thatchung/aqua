<template>
    <el-form ref="form" :model="form" :rules="formRules" label-position='top' :status-icon="true">
        <input style="display: none">
        <box :title="title">
            <div slot="body">
                <!-- <el-form-item :label="textType" prop="reason_type">
                    <el-select  prop="reason_type" v-model="form.reason_type" clearable>
                        <el-option v-for="value in ['other']"
                                   :key="value" :value="value"
                                   :label="value | cancelOrder">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="Lý do" prop="cancel_reason">
                    <select-list :name="'select/cancel_reason'" v-model="form.cancel_reason" :loadbefore="true">
                    </select-list>
                </el-form-item>
               <!--  <el-form-item :label="text" prop="reason" >
                    <el-input :type="type" v-model="form.reason"></el-input>
                </el-form-item> -->
            </div>
            <div slot="footer" class="text-center">
                <el-button type="primary" @click="submit">Ghi nhận</el-button>
                <el-button type="default" @click="close">Thoát</el-button>
            </div>
        </box>
    </el-form>
</template>

<script>
    export default {
        name: 'ModalCancelOrder',

        props: {
            type: {
                type: String,
                default: 'text',
                validator: value => {
                    return value === 'text' || value === 'number';
                }
            },
            title: String,
            text: String,
            textType: String,
            rules: Array,
            order_id: String,
            product_type:String,
            submitModal: {
                type: Function,
                required: true,
            },
            cancelSubmitModal: {
                type: Function,
                required: true,
            },
        },
        data: () => ({
            form: {
                order_id: null,
                product_type:null,
                cancel_reason:null
            },
            formRules: {
                reason_type: [
                    {required: true, message: 'Không được bỏ trống'},
                ],
                reason: [
                    {required: true, message: 'Không được bỏ trống'},
                ],
            },

        }),

        methods: {
            close: function () {
                this.$emit('close');
                this.cancelSubmitModal();
            },
            submit: async function () {
                await this.$util.validateForm(this);
                this.$emit('close');
                
                var data = {
                    order_id : this.order_id,
                    product_type :  this.product_type,
                    cancel_reason : this.form.cancel_reason.name,
                    cancel_reason_id : this.form.cancel_reason.id,
                }
                this.submitModal(data);
            },
        },

        created: function () {
            if (this.rules)
                this.formRules.data = this.rules;
        },
    }
</script>

<style lang="scss" scoped>
    .box {
        margin-bottom: 0;
    }
</style>
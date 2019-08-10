<template>
    <el-form ref="form" :model="form" :rules="formRules" label-position='top' :status-icon="true">
        <input style="display: none">
        <box :title="title">
            <div slot="body">
                <p v-if="text">{{text}}</p>
                <el-form-item prop="data">
                    <el-input :type="type" v-model="form.data"></el-input>
                </el-form-item>
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
        name: 'ModalInput',

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
            rules: Array,
            done: {
                type: Function,
                required: true,
            },
            cancel: {
                type: Function,
                required: true,
            },
        },

        data: () => ({
            form: {
                data: null,
            },
            formRules: {},
        }),

        methods: {
            close: function () {
                this.$emit('close');
                this.cancel();
            },

            submit: async function () {
                await this.$util.validateForm(this);

                this.$emit('close');
                this.done(this.form.data);
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
<template>
    <div class="image-single">
        <el-form>
            <el-col :md="6" >
                <div class="image-container" :style="{width: `${imageWidth}px`, height: `${imageHeight}px`, 'border-radius': `${imageradius}px`}">
                    <div v-if="!value" class="new" title="Thêm ảnh" @click="add">
                        <i class="fa fa-plus" :style="{'font-size': `${imageHeight * 0.7}px`}"></i>
                    </div>
                    <img :src="value" @click="add()">
                </div>
            </el-col>
            <el-col :md="18" >
                <el-form-item label="Link"  >
                    <el-input slot-scope="{data}" @change="changeLink" v-model="value" ></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>

<script>
    import ImageEditor from './image-editor'

    export default {
        name: 'ImageSingle',

        props: {
            'value': {
                type: null,
                required: true
            },
            'allow-add': {
                type: Boolean,
                default: true,
            },
            'linkedit': {
                type: String,
            },
            'image-width': {
                type: Number,
                default: 100,
                validator: value => {
                    return value > 0;
                }
            },
            'image-height': {
                type: Number,
                default: 100,
                validator: value => {
                    return value > 0;
                }
            },
            'imageradius': {
                type: Number,
                default: 5,
                validator: value => {
                    return value > 0;
                }
            }
        },

        data: () => ({}),

        methods: {
            changeLink: function () {
                this.$emit('input', this.value);
            },
            add: function () {
                this.$modal.show(ImageEditor, {
                    value: this.newImage,
                    mode: 'add',
                    'link-only': this.linkOnly,
                    'image-width': this.imageWidth,
                    'image-height': this.imageHeight,
                    done: (data) => {
                        if (this.type === 'object')
                            this.$emit('input', data);
                        else
                            this.$emit('input', data.link);
                    },
                }, {
                    clickToClose: false,
                    width: 480,
                    height: 'auto',
                });
            },

            edit: function () {
                let data = {
                    value: this.newImage,
                    mode: 'edit',
                    'link-only': this.linkOnly,
                    'image-width': this.imageWidth,
                    'image-height': this.imageHeight,
                    done: (data) => {
                        if (this.type === 'object')
                            this.$emit('input', data);
                        else
                            this.$emit('input', data.link);
                    },
                };
                if (this.type === 'object')
                    data['image-id'] = this.value.id;
                else if (this.type === 'link')
                    data['image-link'] = this.value;

                this.$modal.show(ImageEditor, data, {
                    clickToClose: false,
                    width: 520,
                    height: 'auto',
                });
            },
        },
        mounted: function () {
            if(this.linkedit)
                this.value = this.linkedit;
        }
    }
</script>

<style lang="scss" scoped>
    .image-single {
        display: inline-block;
        width: 100%;
    }

    .image-container {
        position: relative;
        // border-radius: 5px;
        float: left;
        margin: 5px;
        border: 1px solid #d4d7e0;
        background-color: #d4d7e0;
        overflow: hidden;

        .new {
            width: 100%;
            height: 100%;
            cursor: pointer;

            i {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        &:hover {
            border-color: #d64a2e;
        }

        &:active {
            border-color: #d0370f;
            background-color: #d0370f;

            .new {
                color: #fff;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: pointer;
        }
    }
</style>
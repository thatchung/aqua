<template>
    <div>
        <ul class="image-list">
            <li v-for="item of value" :style="{width: `${imageWidth}px`, height: `${imageHeight}px`}"
                :title="`${item.id} - ${item.name}`">
                <i v-if="allowRemove" class="remove fa fa-minus-circle" title="Xóa ảnh" @click="remove(item)"></i>
                <div :class="['image-container', allowEdit ? 'editable' : '']" @click="allowEdit && select(item)">
                    <img :src="item.link">
                </div>
            </li>
            <li v-if="allowAdd" class="new" :style="{width: `${imageWidth}px`, height: `${imageHeight}px`}"
                title="Thêm ảnh" @click="add">
                <i class="fa fa-plus" :style="{'font-size': `${imageHeight * 0.7}px`}"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    import ImageEditor from './image-editor'

    export default {
        name: 'ImageList',

        props: {
            'value': {
                type: Array,
                required: true
            },
            'allow-add': {
                type: Boolean,
                default: false,
            },
            'allow-edit': {
                type: Boolean,
                default: false,
            },
            'allow-remove': {
                type: Boolean,
                default: false,
            },
            'image-type': {
                type: String,
                required: true,
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
            }
        },

        data: () => ({}),

        methods: {
            add: function () {
                this.$modal.show(ImageEditor, {
                    value: this.newImage,
                    mode: 'add',
                    'image-type': this.imageType,
                    'image-width': this.imageWidth,
                    'image-height': this.imageHeight,
                    done: (data) => this.value.push(data),
                }, {
                    clickToClose: false,
                    width: 520,
                    height: 'auto',
                });
            },

            select: function (image) {
                this.$modal.show(ImageEditor, {
                    value: this.newImage,
                    mode: 'edit',
                    'image-type': this.imageType,
                    'image-width': this.imageWidth,
                    'image-height': this.imageHeight,
                    'image-id': image.id,
                    done: (data) => {
                        let cloneValue = this.value.slice(0);

                        for (let i = 0; i < cloneValue.length; i++) {
                            if (cloneValue[i].id !== image.id)
                                continue;

                            cloneValue[i] = data;
                            this.$emit('input', cloneValue);
                        }
                    },
                }, {
                    clickToClose: false,
                    width: 520,
                    height: 'auto',
                });
            },

            remove: function (image) {
                for (let i = 0; i < this.value.length; i++) {
                    if (this.value[i].id !== image.id)
                        continue;

                    this.value.splice(i, 1);
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .image-list {
        margin: 0;
        padding: 0;
        list-style-type: none;

        &::after {
            content: "";
            clear: both;
            display: table;
        }

        li {
            position: relative;
            border-radius: 5px;
            float: left;
            margin: 5px;

            &.new {
                border: 1px solid #d4d7e0;
                background-color: #d4d7e0;
                cursor: pointer;

                &:hover {
                    border-color: #d64a2e;
                }

                i {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                &:active {
                    border-color: #d0370f;
                    background-color: #d0370f;
                    color: #fff;
                }
            }

            .remove {
                position: absolute;
                top: 0;
                right: 0;
                padding: 3px;
                font-size: 15px;
                background-color: #d4d7e0;
                border-bottom-left-radius: 10px;
                cursor: pointer;
            }

            .image-container {
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: inherit;
                border: 1px solid #d4d7e0;
                background-color: #d4d7e0;

                &.editable {
                    cursor: pointer;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            &:hover {
                .image-container.editable {
                    border-color: #d64a2e;
                }

                .remove {
                    background-color: #d64a2e;
                    color: #fff;
                }
            }
        }
    }
</style>
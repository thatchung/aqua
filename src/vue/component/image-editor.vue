<template>
    <div class="content">
        <el-tabs v-model="currentTab">
            <el-tab-pane name="upload" :label="mode === 'add' ? 'Đăng ảnh mới' : 'Chỉnh sửa ảnh'">
                <el-form ref="form" :model="form" :rules="rules" label-position="top">
                    <el-row :gutter="20">
                        <el-col :md="24">
                            <el-form-item prop="image">
                                <div class="image-container">
                                    <img :src="form.image" >
                                    <span v-if="!form.image">Click để chọn ảnh</span>
                                    <input v-if="allowEdit" type="file" accept="image/*" @change="loadFile" >
                                </div>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :md="8" v-if="imageMeta">
                            <el-form-item label="Chiều ngang ảnh">
                                <span class="form-control">{{imageMeta.width | number}} px</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" v-if="imageMeta">
                            <el-form-item label="Chiều dọc ảnh">
                                <span class="form-control">{{imageMeta.height | number}} px</span>
                            </el-form-item>
                        </el-col> -->
                        <el-col :md="16" v-if="!imageLink">
                            <el-form-item label="Tên ảnh" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="allowEdit">
                            <el-button type="primary" style="width: 100%" :loading="loading" @click="uploadImage">Ghi
                                nhận
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <!-- <el-tab-pane name="gallery" label="Thư viện ảnh" v-if="showGallery">
                <filter-panel class="filter-panel" :value="filterGallery" @submit="loadGallery">
                    <filter-item field="search" title="ID hoặc từ khóa" item-class="col-xs-12">
                        <el-input slot-scope="{data}" v-model="data.value" clearable></el-input>
                    </filter-item>
                </filter-panel>

                <ul class="image-list">
                    <li v-for="item of gallery.items" :title="`${item.id} - ${item.name}`" @click="gallerySelect(item)">
                        <img :src="item.link">
                    </li>
                </ul>

                <el-pagination background
                               class="text-center"
                               layout="total, prev, pager, next"
                               :total="gallery.total"
                               :current-page.sync="gallery.page"
                               :page-size="gallery.pageSize"
                               @current-change="loadGallery">
                </el-pagination>
            </el-tab-pane> -->
        </el-tabs>

        <el-button class="close-button" size="mini" type="default" @click="$emit('close')">
            <i class="fa fa-times"></i>
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'ImageEditor',

        props: {
            mode: {
                type: String,
                required: true,
                validator: value => {
                    return value === 'add' || value === 'edit';
                }
            },
            'allow-edit': {
                type: Boolean,
                default: true,
            },
            'show-gallery': {
                type: Boolean,
                default: true,
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
            'image-id': Number,
            'image-link': String,
            done: {
                type: Function,
                required: true,
            },
        },

        data: () => ({
            form: {
                name: null,
                priority: 0,
                image: null,
            },

            rules: {
                image: [
                    {required: true, message: 'Không được bỏ trống'},
                ],
            },

            filterGallery: {
                search: {value: null},
            },

            gallery: {
                page: 1,
                pageSize: 9,
                total: 0,
                items: []
            },
            avatar: false,
            currentTab: 'upload',
            isNewImage: false,
            imageMeta: null,
            loading: false,
            list_image: [],
        }),

        computed: {
            aspectRatio: function () {
                let gcd = this.$util.greatestCommonDivisor(this.imageWidth, this.imageHeight);
                if(`${this.imageWidth / gcd}:${this.imageHeight / gcd}` === `77:100`)
                    return `7:9`;
                return `${this.imageWidth / gcd}:${this.imageHeight / gcd}`;
            },
        },

        methods: {
            validateForm: async function () {
                await this.$util.validateForm(this);
            },

            loadImageMeta: async function () {
                await (() => {
                    return new Promise((res, rej) => {
                        try {
                            let self = this;
                            let img = new Image();
                            img.onload = function () {
                                self.imageMeta = {
                                    width: this.width,
                                    height: this.height,
                                    isGoodAspectRatio: Math.abs((this.width / this.height) - (self.imageWidth / self.imageHeight)) < 0.01,
                                    isNewAspectRatio: Math.abs((this.width / this.height) - (self.imageWidth / self.imageHeight)) % 0.229 < 0.01,
                                };
                                res();
                            };

                            img.src = this.form.image;
                        } catch (e) {
                            rej(e);
                        }
                    })
                })();
            },

            loadFile: async function (e) {
                let file = e.target.files[0];
                if(file.size >= 3000000) {
                    this.$notify.warning({title: 'Chú ý!', message: `File ảnh tải lên có dung lượng vượt mức 3MB!`});
                    return;
                }
                else {
                    this.form.name = file.name;
                    this.form.image = await this.$util.fileToBase64(file);
                    await this.loadImageMeta();
                    this.isNewImage = true;
                }

                await this.validateForm();
            },

            uploadImage: async function () {
                try {
                    await this.validateForm()
                }
                catch (e) {
                    this.$notify.error({title: 'Lỗi', message: 'Dữ liệu đầu vào bị lỗi, xin kiểm tra lại'});
                    return;
                }

                this.loading = true;
                let r;
                r = await this.$api.post({
                        url: 'photo/add',
                        data: {
                            name: this.form.name,
                            image: this.form.image.substring(this.form.image.indexOf(',') + 1),
                        },
                    });
                this.loading = false;

                if (!r.meta.success)
                    return;

                this.$emit('close');
                this.done(r.data);
            },

            loadGallery: async function () {
                
            },

            gallerySelect: function (item) {
                this.$emit('close');
                this.done(item);
            },
        },

        mounted: async function () {
            if (this.mode === 'add')
                return;

            if (!this.imageId && !this.imageLink) {
                this.$notify.error({title: 'Lỗi', message: 'Không tìm thấy dữ liệu'});
                return;
            }

            if (this.imageLink) {
                this.form.name = 'image link';
                this.form.priority = 0;
                this.form.image = this.imageLink;
                await this.loadImageMeta();
            } else {
                let data;
                try {
                    let r = await this.$api.get({
                        url: `gallery/image/detail`,
                        showProgress: false,
                        data: {id: this.imageId},
                    });
                    data = r.data;
                } catch (e) {
                    this.$emit('close');
                }

                this.form.name = data.name;
                this.form.priority = data.priority;
                this.form.image = data.link;
                await this.loadImageMeta();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-tabs {
        margin-top: -15px;
    }

    .close-button {
        position: absolute;
        top: 5px;
        right: 15px;
    }

    .image-container {
        position: relative;
        width: 100%;
        height: 270px;
        float: left;
        margin: 5px;
        border: 1px solid #d4d7e0;
        background-color: #d4d7e0;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;

        input, img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        imgs {
            position: absolute;
            top: 0;
            left: 0;
            width: 770px;
            height: 1000px;
        }


        span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        input {
            cursor: pointer;
            opacity: 0;
        }

        img {
            border: 0;
            object-fit: contain;
        }
        imgs {
                width: 770px;
                height: 1000px;
                object-fit: contain;
        }
    }

    .filter-panel {
        border: 0;
    }

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
            float: left;
            width: 153px;
            height: 86px;
            overflow: hidden;
            border-radius: 5px;
            border: 1px solid #d4d7e0;
            background-color: #d4d7e0;
            margin: 5px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            imgs {
                width: 770px;
                height: 1000px;
                object-fit: contain;
            }

            &:hover {
                border-color: #d64a2e;
            }
        }
    }
</style>
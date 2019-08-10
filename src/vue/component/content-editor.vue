<template>
    <div>
        <div class="callout callout-info" v-if="loading">
            <p>Đang tải dữ liệu...</p>
        </div>
        <div v-show="!loading">
            <textarea :id="`ck-editor-${_uid}`"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Editor',

        props: {
            'value': null,
        },

        data: () => ({
            loading: true,
            editor: null,
        }),

        mounted: async function () {
            this.editor = CKEDITOR.replace(`ck-editor-${this._uid}`, {
                language: 'vi',
                toolbarCanCollapse: true,
                resize_enabled: false,
                removeButtons: 'Anchor',
                filebrowserImageUploadUrl: `${process.env.api}/ckeditor/upload`,
                extraPlugins: 'image2',
                removePlugins: [
                    'save', 'newpage', 'preview', 'print', 'templates',
                    'pastefromword', 'selectall', 'wsc', 'scayt', 'forms',
                    'blockquote', 'div', 'bidi', 'language', 'flash',
                    'horizontalrule', 'smiley', 'specialchar', 'pagebreak', 'iframe',
                    'stylescombo', 'format', 'showblocks', 'about', 'elementspath',
                ].join(),
                toolbarGroups: [
                    'tools', 'undo', 'clipboard', 'styles', 'basicstyles', 'colors',
                    'indent', 'align', 'list', 'insert', 'links', 'find', 'mode',
                ],
            });
            this.editor.setData(this.value);

            this.editor.on('change', () => {
                this.$emit('input', this.editor.getData());
            });

            this.loading = false;
        },

        destroyed: function () {
            if (this.editor)
                this.editor.destroy();
        },

        watch: {
            value: function (value) {
                if (this.editor.getData().localeCompare(value) === 0)
                    return;

                this.loading = true;
                setTimeout(() => {
                    this.editor.setData(value);
                    this.loading = false;
                }, 500);
            }
        },
    }
</script>

<style lang="scss">
    .ck-editor {
        .ck-editor__editable {
            padding: 1em;

            & > :first-child {
                margin-top: 0;
            }

            & > :last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
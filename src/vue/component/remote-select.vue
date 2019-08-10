<template>
    <multiselect :multiple="multiple" :placeholder="placeholder"
                 @search-change="search" :loading="loading"
                 :searchable="true" :preserve-search="true" :internal-search="false"
                 :value="value" @input="change" :options="data"
                 :track-by="trackBy" :label="label" :customLabel="itemLabel"
                 :select-label="''" :selected-label="''" :deselect-label="''"
                 :hide-selected="multiple" :allow-empty="allowEmpty" @open="search">
        <template slot="option" slot-scope="{option}">
            <span v-if="!customOptionTemplate">{{option.name}}</span>
            <slot name="item" :data="option"></slot>
        </template>
        <template slot="noResult">Không có kết quả phù hợp</template>
    </multiselect>
</template>

<script>
    export default {
        name: 'RemoteSelect',

        props: {
            'value': null,
            'allow-empty': {
                type: Boolean,
                default: true,
            },
            'remote-data': {
                type: Function,
                required: true,
            },
            'multiple': {
                type: Boolean,
                default: false,
            },
            'placeholder': {
                type: String,
                default: 'Tìm kiếm',
            },
            'track-by': {
                type: String,
                required: true,
            },
            'label': {
                type: String,
                required: true,
            },
            'loadbefore': {
                type: Boolean,
                default: false,
            },
        },

        data: () => ({
            data: [

            ],
            customOptionTemplate: false,
            loading: false,
        }),

        methods: {
            itemLabel: function (item) {
                if(item.parentCategory) {
                    return `${item.name} / ${item.parentCategory.name} `;
                }
                else if(item.template_id) {
                    return `[templateID: ${item.template_id}] - ${item.id} - ${item.name}`;
                }
                else
                    return `${item.name}`;
            },

            change: function (value) {
                this.$emit('input', value);
            },

            search: async function (query) {
                this.loading = true;
                
                this.data = await this.remoteData(query);
                
                this.loading = false;
            },
        },

        watch: {
            value: function () {
                if (!this.value || this.data.length > 0)
                    return;
                this.data = this.multiple ? this.value : [this.value];
            }
        },

        mounted: function () {
            this.customOptionTemplate = this.$scopedSlots.item;
            // if(this.loadbefore)
            //     this.search();
        }
    }
</script>
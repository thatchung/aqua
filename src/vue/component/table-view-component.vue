<template>
    <div>
        <data-tables :data='value.items' :pagination-def="{show: false}" :show-action-bar="true" >
            <slot :data="value.data"></slot>
        </data-tables>

        <el-pagination background
                       class="text-center"
                       layout="total, prev, pager, next"
                       :total="value.total"
                       :current-page.sync="value.page"
                       :page-size="value.pageSize"
                       @current-change="pageChange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'TableView',
        props: ['value'],
        methods: {
            pageChange: function () {
                this.$emit('load');
            }
        }
    }
</script>
<style>
    .el-pagination__editor.el-input .el-input__inner {
        display: none !important
    }

    .sc-table .pagination-wrap {
      display: none !important;
    }
</style>

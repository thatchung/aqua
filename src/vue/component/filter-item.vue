<template>
    <div :class="['form-group', (itemClass || 'col-sm-6 col-md-4 col-lg-3')]">
        <label>{{title}}</label>
        <slot :data="$parent.value[field]"></slot>
    </div>
</template>

<script>
    export default {
        name: 'FilterItem',
        props: ['field', 'title', 'label-type', 'item-class'],
        mounted: function () {
            this.$parent.value[this.field].title = this.title;
            this.$parent.value[this.field].labelType = this.labelType;
        },
    }
</script>
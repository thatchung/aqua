<template>
    <div class="box box-default" :class="{'collapsed-box': collapse}">
        <slot></slot>

        <div class="box-header with-border"  v-if="title" :data-widget="canCollapsable ? 'collapse' : ''">
            <i class="fa" :class="{'fa-plus': collapse, 'fa-minus': !collapse}" v-if="canCollapsable"></i>
            <h3 class="box-title">{{title}}</h3>
        </div>

        <div class="box-body" v-if="$slots.body">
            <slot name="body"></slot>
        </div>

        <div class="box-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Box',

        props: {
            'title': String,
            'can-collapsable': {
                type: Boolean,
                default: false,
            },
            'collapse': {
                type: Boolean,
                default: false,
            },
        },

        mounted: function () {
        }
    }
</script>
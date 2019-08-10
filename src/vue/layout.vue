<template>
    <div class="wrapper" style="overflow-y: auto;height: auto">
        <layout-header></layout-header>
        <layout-sidebar></layout-sidebar>

        <div class="content-wrapper" style="min-height: 1500px !important">
            <router-view></router-view>
        </div>
        <div class="footer-data">
            <img class="img-footer" src="/static/img/smlogo.png" />
            <div class="text-footer">Copyright Movitel. Power by SmartEnergy</div>
        </div>
    </div>
</template>

<script>
    import LayoutHeader from './component/layout-header'
    import LayoutSidebar from './component/layout-sidebar'
    

    export default {
        name: 'Layout',

        components: {
            LayoutHeader,
            LayoutSidebar
        },

        mounted: function () {
            $(window).trigger('resize');
           

            }
    }
</script>

<style lang="scss" scoped>
    .content-wrapper{
        min-height: 1500px !important
    }
    .footer-data{
        position: fixed;
        left: 0px;
        width: 100%;
        bottom: 0px;
        background-color: #989898;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        z-index: 999;
        .img-footer{
            width: 50px;
            height: 20px;
            float: left;
            margin-top: 5px;
        }
        .text-footer{
            float: right;
        }
    }
</style>
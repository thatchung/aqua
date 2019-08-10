<template>
    <div class="main-header">
        <router-link to="/" style="background-color:#bb5833" class="logo hidden-xs">
            <span class="logo-mini"><b>Fuel Management System</b></span>
            <span class="logo-lg"><b>Fuel Management System</b></span>
        </router-link>

        <nav class="navbar navbar-static-top" style="background-color:#dd6639">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <!-- <span class="sr-only">Toggle navigation</span> -->
            </a>

            <span class="view-title">{{title}}</span>
            
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown" v-if="$util.checkAccountPermission('delivery_management')">
                        <router-link to="/delivery" class="dropdown-toggle" data-toggle="dropdown"
                           style="padding: 0px;line-height: 28px;">
                            
                            <!-- <audio controls="controls" onloadeddata="audioSoundFunction()" autoplay hidden>
                                <source src="file.mp3" type="audio/mp3">
                            </audio> -->
                        </router-link>
                    </li>
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img :src="$store.state.profile.avatar" class="user-image" alt="Avatar">
                            <span class="hidden-xs">{{$store.state.profile.name}}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-header">
                                <img :src="$store.state.profile.avatar" class="img-circle" alt="Avatar">
                                <p> {{$store.state.profile.name}} </p>
                            </li>

                            <li class="user-footer">
                                <div class="pull-left">
                                    <router-link to="/profile" class="btn btn-default btn-flat">Tài khoản</router-link>
                                </div>

                                <div class="pull-right">
                                    <a href="#" class="btn btn-default btn-flat" @click="logout">Đăng xuất</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
       
    export default {
        name: 'LayoutHeader',
        
        data: () => ({
            
        }),
        computed: {
            title: function () {
                return this.$router.options.routes
                    .filter(x => x.name === 'layout')[0].children
                    .filter(x => x.name === this.$route.name || (x.children && x.children.filter(y => y.name === this.$route.name)))[0]
                    .meta.title;
            },
        },

        mounted() {
            
            let event = 'connection/admin_join';
            let listenEvent = ['user_order/state_changed'];  
            let data = {
                admin_authorization: this.$store.state.session,
            };

            // this.$util.socket_IO();

            
        },
        methods: {
            logout: async function () {
                this.$store.commit('toggleLoader', true);
                let r = await this.$api.delete({
                    url: 'auth/logout',
                    header: {
                        authorization: this.$store.state.session,
                    }
                });

                if (!r.meta.success) {
                    this.$store.commit('toggleLoader', false);
                    return;
                }

                this.$store.commit('clearSession');
                this.$router.replace('/login');
                this.$store.commit('toggleLoader', false);
            },            
        },
    }
</script>

<style lang="scss" scoped>
    .view-title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        white-space: nowrap;
    }
    .div-extention{
        width: 80px;
        display: inline-block;
        position: absolute;
        top: 5px;
        right: calc(240px);
    }
</style>
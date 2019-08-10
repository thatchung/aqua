<template>
    <div class="main-sidebar">
        <div class="sidebar">
            <form class="sidebar-form" @submit.prevent>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm..." v-model="search">
                    <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form>

            <ul class="sidebar-menu">
                <li v-for="item in menus"
                    :class="{header: item.type === 'label', actived: item.type === 'link' && isActivedMenu(item)}">
                    <span class="span-group-title" v-if="item.type === 'label'">{{item.title}}</span>

                    <router-link :to="item.path" v-if="item.type === 'link'">
                        <span>{{item.title}}</span>
                    </router-link>
                    <div  v-if="item.numcount > 0" style="position: absolute;right: 10px;top: 10px;width: 25px;height: 25px;background-color: #b20d0d;border-radius: 5px;text-align: center;color: white;font-size: 15px;font-weight: 600;padding: 2px;">{{item.numcount}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import routerMenus from '../../router/menus'
    
    export default {
        name: 'LayoutSidebar',

        data: () => ({
            search: null,
            userInfo:{
                id:null,
            },
            listInCall:[],
            menus:null,
        }),
        dependencies : ['reloadDataCCService'],
        computed: {
            
        },

        methods: {
            isActivedMenu: function (menu) {
                return this.$route.name.trim().toLowerCase() === menu.name.trim().toLowerCase();
            }
        },
        created: async function () {
            
            let result = [];

            let menus = await routerMenus.filter(x => {
                return true;
                if (x.requireRoot && !this.$store.state.profile.is_root)
                    return false;


                if (!this.$store.state.profile.permission.includes(x.name))
                    return false;


                return true;
            });

            for (let menu of menus) {
                
                let labelMenu = {
                    type: 'label',
                    name: menu.name,
                    title: menu.title,
                };



                let childrenMenus = await menu.children.filter(x => {
                    return true;
                    if (x.requireRoot && !this.$store.state.profile.is_root)
                        return false;

                    // for (let permission of x.permission) {
                    //     if (!this.$store.state.profile.permission.includes(permission))
                    //         return false;
                    // }

                    return !this.search || x.title.toLowerCase().includes(this.search.toLowerCase());
                });

                childrenMenus = await Promise.all(childrenMenus.map(async item => {
                    var numcount = 0;

                    return {
                        type: 'link',
                        name: item.name,
                        title: item.title,
                        path: item.path,
                        numcount:numcount
                    }
                }));
                if (childrenMenus.length === 0)
                    continue;

                await result.push(labelMenu);
                result = await result.concat(childrenMenus);
            }
            this.menus = result;

            }

    }
</script>

<style lang="scss">
    .sidebar-menu {
        & > li {
            &.actived > a {
                border-left-color: #dd4b39;
            }

            &.active > a > .fa-angle-left, &.active > a > .pull-right-container > .fa-angle-left {
                animation-name: rotate;
                animation-duration: .2s;
                animation-fill-mode: forwards;
            }

            & > a {
                padding: 12px 15px 12px 15px;
            }
        }
        li {
            .span-group-title{
                font-size: 20px;
                font-weight: bold;
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-90deg);
        }
    }
</style>
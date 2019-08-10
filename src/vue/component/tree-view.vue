<template>
   	<ul data-widget="tree">
		 <li>
		 	<a href="#">One Level</a>
		 </li>
		 <li class="treeview">
		    <a href="#">Multilevel</a>
		    <ul class="treeview-menu">
		      <li><a href="#">Level 2</a></li>
		    </ul>
		 </li>
	</ul>
</template>

<script>
    export default {
        name: 'AccountSelect',
        props: {
            'value': null,
            'multiple': {
                type: Boolean,
                default: false,
            },
            'placeholder': {
                type: String,
                default: 'Tìm kiếm',
            },
        },

        methods: {
            change: function (value) {
                this.$emit('input', value);
            },

            remoteData: async function (query) {
                let r = await this.$api.get({
                    url: 'account',
                    showProgress: false,
                    showError: false,
                    data: {
                        search: query,
                    }
                });

                if (!r.meta.success)
                    return [];
                return r.data;
            },
        },
    }
</script>
<template>
	<div class="content">
		<div id="chart"></div>
	</div>
</template>

<script>
	import moment from 'moment'

	export default {
		routing: {
			title: '3D Chart',
			path: '/chart_3d',
			group: ['home'],
		},
		data: () => ({
			data : null,
		}),

		methods: {
            loadListData: async function () {
            	this.data = [];
	            for(let i=0;i<10;i++)
	                this.data.push(Array(10).fill().map(() => Math.random()))
            },
			loadChart3d:async function () {
				Plotly.newPlot('chart', [{
	               z: this.data,
	               type: 'surface'
	        	}]);
			},
		},

		loaded: async function () {
			await this.loadListData();
			await this.loadChart3d();
		},
	}

</script>

<style lang="scss" scoped>
	

</style>
<template>
	<div class="content">
		<div id="74718a79-c93a-42a6-b586-efb0ad842c31" style="width: 100%; height: 100%;" class="plotly-graph-div"></div>
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
            
			loadChart3d:async function () {
				var gd = document.getElementById('74718a79-c93a-42a6-b586-efb0ad842c31')
                var resizeDebounce = null;

                function resizePlot() {
                    var bb = gd.getBoundingClientRect();
                    Plotly.relayout(gd, {
                        width: bb.width,
                        height: bb.height
                    });
                }

                
                window.addEventListener('resize', function() {
                    if (resizeDebounce) {
                        window.clearTimeout(resizeDebounce);
                    }
                    resizeDebounce = window.setTimeout(resizePlot, 100);
                });
                

                
                Plotly.plot(gd,  {
                    data: figure.data,
                    layout: figure.layout,
                    frames: figure.frames,
                    config: {"showLink": true, "linkText": "Export to plot.ly", "mapboxAccessToken": "pk.eyJ1IjoiY2hyaWRkeXAiLCJhIjoiY2lxMnVvdm5iMDA4dnhsbTQ5aHJzcGs0MyJ9.X9o_rzNLNesDxdra4neC_A"}
                });
			},
		},

		loaded: async function () {
			await this.loadChart3d();
		},
	}

</script>

<style lang="scss" scoped>
	

</style>
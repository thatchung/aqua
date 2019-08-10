<script>
    import VueChart from 'vue-chartjs'

    const {reactiveProp} = VueChart.mixins;

    export default {
        name: 'ChartBar',
        extends: VueChart.Bar,
        mixins: [reactiveProp],
        props: ['options','yTicks'],

        mounted: function () {
            self = this;
            this.addPlugin({
              id: 'horizontalLine',
              beforeDraw: function(chart) {
                if (typeof chart.config.options.lineAt != 'undefined') {
                    var ctxPlugin = chart.chart.ctx;
                    var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
                    var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];
                    if(yAxe.min != 0) return;

                    let listLineAt = chart.config.options.lineAt;
                    ctxPlugin.beginPath();
                    if(Array.isArray(listLineAt))
                    {
                        listLineAt.forEach(function(element) {
                            ctxPlugin.strokeStyle = "red";
                            
                            element = (element - yAxe.min) * (100 / yAxe.max);
                            element = (100 - element) / 100 * (yAxe.height) + yAxe.top;
                            ctxPlugin.moveTo(xAxe.left, element);
                            ctxPlugin.lineTo(xAxe.right, element);
                            
                        });
                    }
                    ctxPlugin.stroke();
                }
              }
            });
            this.renderChart(this.chartData, 
            //     Object.assign({
            //     responsive: true,
            //     maintainAspectRatio: false,
            //     legend: {display: false},
            //     scales: {
            //         yAxes: [
            //             {
            //                 ticks: {
            //                     callback: (label, index, labels) => this.$util.formatNumber(label),
            //                 }
            //             }
            //         ]
            //     },
            //     tooltips: {
            //         callbacks: {
            //             label: (tooltipItem, data) => this.$util.formatNumberDefault(tooltipItem.yLabel),
            //         }
            //     }
            // }, this.options)
            {
                "hover": {
                  "animationDuration": 0
                },
                "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function(bar, index) {
                            if(dataset.data[index] > 0){
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 2);
                            }
                        });
                    });
                  }
                },
                legend: {
                    display: true
                  },
                responsive: true, 
                maintainAspectRatio: false,
                lineAt: this.$attrs.lineAt,
                scales: {
                    yAxes: [{
                        ticks: {
                               min: this.yTicks ? this.yTicks.min : 0,
                               // max: this.yTicks  ? this.yTicks.max : 100,
                               // max: Math.max(...data.datasets[0].data) + 10,
                            // callback: (label, index, labels) => this.$util.formatNumber(label),
                        }
                    }]
                },
                // scales: {
                //     xAxes: [{
                //         stacked: true,
                //         categoryPercentage: 0.5,
                //         barPercentage: 1
                //     }],
                //     yAxes: [{
                //         stacked: true,
                //         ticks: {
                //             // min: 0
                //             callback: (label, index, labels) => this.$util.formatNumber(label),
                //         }
                //     }]
                //   }
                }
            );
        }
    }
</script>
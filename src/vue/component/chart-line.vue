<script>
    import VueChart from 'vue-chartjs'

    const {reactiveProp} = VueChart.mixins;

    export default {
        name: 'ChartLine',
        extends: VueChart.Line,
        mixins: [reactiveProp],
        props: ['options'],

        mounted: function () {

            this.renderChart(this.chartData, Object.assign({
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
                    ctx.fillStyle = "#838383";
                    // this.data.datasets.forEach(function(dataset, i) {
                    //   var meta = chartInstance.controller.getDatasetMeta(i);
                    //   meta.data.forEach(function(bar, index) {
                    //     if(dataset.data[index] > 0){
                    //         var data = dataset.data[index];
                    //         ctx.fillText(data, bar._model.x, bar._model.y - 2);
                    //     }
                    //   });
                    // });
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                datasetFill:false,
                // legend: {display: false},
                scales: {
                    yAxes: [
                        {
                            id: 'A',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                // Math.max(...data.datasets[0].data) + 10,
                                callback: (label, index, labels) => this.$util.formatNumber(label),
                            },
                            gridLines: {
                                display: true
                            }
                        }, 
                        // {
                        //     id: 'B',
                        //     type: 'linear',
                        //     position: 'right',
                        //     gridLines: {
                        //         display: false
                        //     }
                        // }
                    ]
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => this.$util.formatNumberDefault(tooltipItem.yLabel),
                    }
                }
            }, this.options));
        }
    }
</script>
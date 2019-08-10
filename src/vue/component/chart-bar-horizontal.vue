<script>
    import VueChart from 'vue-chartjs'

    const {reactiveProp} = VueChart.mixins;

    export default {
        name: 'ChartBar',
        extends: VueChart.Bar,
        mixins: [reactiveProp],
        props: ['options'],

        mounted: function () {

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
                scales: {
                    yAxes: [{
                        stacked: false
                    }],
                    xAxes: [{
                        stacked: true
                    }]
                  }
                },
                {
                    type: 'horizontalBar'
                }
            );
        }
    }
</script>
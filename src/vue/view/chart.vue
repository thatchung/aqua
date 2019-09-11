<template>
	<div class="content">
		<div style="width:60%;height: 40px;">
			<el-col :md="12">
				<el-date-picker  @change="changeType()" v-model="dateget" type="date" placeholder="Chọn ngày xem"></el-date-picker>
			</el-col>
			<el-col :md="12">
				<el-select v-model="type" @change="changeType()">
		            <el-option v-for="value in ['01','02']"
		                       :key="value" :value="value"
		                       :label="value | filterType">
		            </el-option>
		        </el-select>
		    </el-col>
	    </div>
	    <div style="float: left;background-color: #6b4122;
    padding-top: 30px;
    padding-left: 30px;
    margin-left: 35px;
    margin-top: 35px;
    width: calc(100% - 40px);
    height: 313px;">
	        <chart-line style="margin-top: -62px;margin-left: -63px;width: calc(100% + 70px);" :height="400" :chartData="dataPoint"></chart-line>
	    </div>
	</div>
</template>

<script>
	import moment from 'moment'

	export default {
		routing: {
			title: 'Chart',
			path: '/chart',
			group: ['home'],
		},
		data: () => ({
			dateget : moment(),
			listData : [],
			listData2 : [],
			labels_chart: [],
			type : '02'
		}),
		computed: {
			dataPoint: function () {
                return {
                  labels  : this.labels_chart,
                  datasets: [
                    {
                      	label               	: 'No. 1',
                      	borderColor         : 'rgba(255,99,132,1)',
                      	backgroundColor	  	: '#479cab',
                      	borderWidth         : 1,
                      	fill                : true,
                      	data                : this.listData,
                      	pointBackgroundColor: "rgba(98, 166, 214, 0)",
                      	pointBorderWidth	: 1,
                      	pointRadius			: 0,
      					tension				: 0,
                    },
                     {
                      	label               	: 'No. 1',
                      	borderColor         : 'rgba(255,99,132,1)',
                      	backgroundColor	  	: '#479cab',
                      	borderWidth         : 1,
                      	fill                : true,
                      	data                : this.listData2,
                      	pointBackgroundColor: "rgba(98, 166, 214, 0)",
                      	pointBorderWidth	: 1,
                      	pointRadius			: 0,
      					tension				: 0,
                    },
                    // {
                    //   label               : 'Vol Dc 2',
                    //   borderColor         : 'rgba(40,34,165,1)',
                    //   borderWidth         : 1,
                    //   fill                : false,
                    //   data                : this.dataVolValue_2
                    // }
                  ],
                  elements: { 
				      point: { 
				        radius: 0,
				        hitRadius: 10, 
				        hoverRadius: 5,
				      } 
				    } 
                }
            },
		},
		filters: {
			filterType(state) {
	            let states = {
	                '01': 'Lần 1',
	                '02': 'Lần 2'
	            };
	            return state in states ? states[state] : state;
	        },
	    },
		methods: {
            loadListData: async function () {
            	let day = moment(this.dateget).format('DDMMYYYY');

                let rs = await this.$api.get({
					url: 'chart2d?keyid=' + day + this.type,
					header: {
						token: "0123456789abcdef0123456789abcdef"
					}
                });
                this.labels_chart = [];
                this.listData = [];
                if (rs.meta.success && rs.data) {
                	let jarray = JSON.parse(rs.data.array);
                	for(let item of jarray){
                		console.log(item);
                		if(item.y < 100 && item.y > 0){
	                		this.labels_chart.push(item.x.toFixed(1));
	                		this.listData.push(0 - item.y.toFixed(1));
	                	}
                	}

                }
                else{
                	this.$notify.warning({title: 'Chú ý', message: "Chưa có thông tin lượt đo này"});
                }
            },
			changeType:async function () {
				this.loadListData();
			},
		},

		loaded: async function () {
			await this.loadListData();
		},
	}

</script>

<style lang="scss" scoped>
	

</style>
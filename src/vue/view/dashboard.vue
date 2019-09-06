<template>
	<div class="content"> 
        <div class="map-content" style="width: 100%;height: calc(100vh - 110px)" v-if="current_data">
			<GmapMap
			  :center="{lat:current_data.lat, lng:current_data.long}"
			  :zoom="14"
			  map-type-id="terrain"
			  style="width: 100%; height: 100%"
			>
			  <GmapMarker
			    :key="index"
			    v-for="(m, index) in markers"
			    :position="m.position"
			    :clickable="true"
			    :draggable="false"
			    :icon="m.icon"
			    @click="toggleInfoWindow(m,index)"
		        @mouseover="statusText = m.text"
		        @mouseout="statusText = null"
			  />
			   <gmap-info-window
			        :options="infoOptions"
			        :position="infoWindowPos"
			        :opened="infoWinOpen"
			        @closeclick="infoWinOpen=false"
			      >
			        <div v-html="infoContent"></div>
			      </gmap-info-window>
			</GmapMap>
        </div>
	</div>
</template>

<script>
	import moment from 'moment'
	import SocketIO from 'socket.io-client'

	export default {
		routing: {
			title: 'Dashboard',
			path: '/dashboard',
			isDefault: true,
			group: ['home'],
		},
		data: () => ({
			listdevice:[],
			current_data:
			{
		        long: 106.306728,
		        lat: 10.255142
			},
			markers:[],
			statusText:null,
			infoContent: '',
	        infoWindowPos: {
	          lat: 0,
	          lng: 0
	        },
	        infoWinOpen: false,
	        currentMidx: null,
	        infoOptions: {
	          pixelOffset: {
	            width: 0,
	            height: -35
	          }
	        },
		}),
		filters: {
			pwrType(state) {
	            let states = {
	                'EDM': 'GEN',
	                'AC': 'GRID'
	            };
	            return state in states ? states[state] : state;
	        },
	    },
		methods: {
            loadListDevice: async function () {
                let list = await this.$api.get({
					url: 'device',
					header: {
						token: "0123456789abcdef0123456789abcdef"
					}
                });
                if (list.meta.success) {
					this.listdevice = list.data;
                } else {
                    this.listarea = [];
                }
            },
			connectSocket: async function () {
				const socket = SocketIO(`http://27.71.232.111:8101`, {
					path: '/log_aqua/live',
					query: {
						device_id: this.listdevice[0].id
					}
				});
				socket.on('data', this.onEvent);
				socket.on('connect', () => {
					console.log('connected');
				});
			},
			onEvent: async function (data) {
				this.markers.push({
			    	position: {
			            lat: data.lat,
			            lng: data.long,
			    	},
			    	icon: {
			    		url: 'https://png.pngtree.com/svg/20170331/92e8cc0f9c.svg',
					    size: {width: 30, height: 30, f: 'px', b: 'px'},
					    scaledSize: {width: 15, height: 15, f: 'px', b: 'px'}
			    	},
			    	depth: data.depth,
			        ph: data.ph,
			        do: data.do,
			        orp: data.orp,
			        temp: data.temp,
			        level: data.level,
			        salinity: data.salinity
				});
				this.current_data = data;
			},
			getDataTest:async function(){
				this.current_data =  {
			        long: 106.306728,
			        lat: 10.255142,
			        depth: 10,
			        ph: 10,
			        do: 10,
			        orp: 10,
			        temp: 10,
			        level: 10,
			        salinity: 10
			    }
			    this.markers.push({
			    	position: {
			            lat: 10.255142,
			            lng: 106.306728,
			    	},
			    	icon: {
			    		url: 'https://png.pngtree.com/svg/20170331/92e8cc0f9c.svg',
					    size: {width: 30, height: 30, f: 'px', b: 'px'},
					    scaledSize: {width: 15, height: 15, f: 'px', b: 'px'}
			    	},
			    	depth: 10,
			        ph: 10,
			        do: 10,
			        orp: 10,
			        temp: 10,
			        level: 10,
			        salinity: 10
			    })
			},
			toggleInfoWindow: function (marker, idx) {
		        this.infoWindowPos = marker.position;
		        this.infoContent = this.getInfoWindowContent(marker);
		        

		        //check if its the same marker that was selected if yes toggle
		        if (this.currentMidx == idx) {
		          this.infoWinOpen = !this.infoWinOpen;
		        }
		        //if different marker set infowindow to open and reset current marker index
		        else {
		          this.infoWinOpen = true;
		          this.currentMidx = idx;
		        }
		      },

      		getInfoWindowContent: function (marker) {
        		return (`<div class="card">
				  			<div class="card-image">
							    <figure class="image is-4by3">
							      <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/49039/preview.svg" alt="Placeholder image">
							    </figure>
							  </div>
							  <div class="card-content">
							    
							    <div class="popup-content">
							      Độ sâu : ${marker.depth}
							      <br>
							      Độ ph : ${marker.ph}
							      <br>
							      Nhiêt độ : ${marker.temp}
							      <br>
							      Orp : ${marker.orp}
							      <br>
							    </div>
							  </div>
							</div>`);
      		},
		},

		loaded: async function () {
			await this.loadListDevice();
			await this.connectSocket();
			// await this.getDataTest();
		},
	}

</script>

<style lang="scss" scoped>
	.info-box{
		min-height: 50px;
	    height: 50px;
	}
	.info-box-icon{
		height: 50px;
	    width: 50px;
	    font-size: 25px;
	    line-height: 50px;
	}
	.info-box-content{
		padding: 2px 0px;
		margin-left: 60px;
	}
	.h3-t{
		margin-top: 10px;
	}
	.info-box{
		padding-bottom: 10px;	
	}
	.div-title{
		display: inline-block;
	    float: left;
	    font-size: 16px;
	    font-weight: 600;
	}
	.div-value{
		display: inline-block;
	    float: left;
	    font-size: 16px;
	    margin-left: 30px;
	    font-weight: 500;
	}
	.div-chart{
		width: calc(100%);
		display: inline-block;
		.div-data-chart{
			width: calc(100% - 300px);
			display: inline-block;
		}
		.div-info-unit{
			width:250px;
			display: inline-block;
			float:right;
			color:#9E9E9E;
			.title-unit{
				font-size: 18px;
				font-weight: 600;
				border-bottom: 1px solid #9E9E9E;
			}
			.row-unit{
				width: 100%;
				display: inline-block;
				.text-unit-right{
					display: inline-block;
					float: right;
				}
				.text-unit-left{
					display: inline-block;
					float: left;
				}
			}
			
		}
	}

</style>
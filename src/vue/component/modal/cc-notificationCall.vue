<template>
    <el-form ref="form" :model="form" label-position='bottom right' :status-icon="true">
        <input style="display: none">
        <box title='Bạn ơi có người gọi nè' class='noti-box'>
            <div slot="body" class='noti-div'>
                <h3 class='noti-h3'>{{calleridNum}}</h3>
            </div>
            <div slot="footer" class="text-center">
                <el-button type="primary" @click="onOpenCall">Xem thông tin người gọi</el-button>
                <el-button type="default" @click="close">Thoát</el-button>
            </div>
        </box>
    </el-form>
</template>

<script>
	var webSocket;

    export default {
        name: 'ModalNotifiCall',

        props: {
            eventName: String,
            calleridNum: String,
            extension: String,
            channelStateDesc: String
        },
        data: () => ({
            form: {
                reason: null,
                reason_type: null,
                order_id: null,
            },
        }),

        methods: {
            onOpenCall: function (event) {
            	if($('#std').val()){
            		var numUser = this.calleridNum;
            		this.$router.go({ path: `/callcenter?phone=${numUser}` });
            	}
            	else{
	            	var numUser = this.calleridNum;
	                this.$router.push({ path: `/callcenter?phone=${numUser}` });
				}
                this.$emit('close');
            },
            close: function () {
                this.$emit('close');
            },
        },

        created: function () {
            
        },
    }
</script>

<style lang="scss" scoped>
    .noti-box{
        margin-bottom: 0;
        .noti-div{
	        .noti-h3{
	    	    text-align: center;
				margin: 5px;
	        }
	    }
    }
</style>
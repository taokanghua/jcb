<template>
	<div :style="{color,display:'inline-block', fontSize, marginLeft}">
		<span class="time-item" 
		:style="{backgroundColor:bgColor}" :class="{crowd}">{{time[0]}}</span>
		<span class="colon">:</span>
		<span class="time-item" 
		:style="{backgroundColor:bgColor}" :class="{crowd}">{{time[1]}}</span>
		<span class="colon">:</span>
		<span class="time-item" 
		:style="{backgroundColor:bgColor}" :class="{crowd}">{{time[2]}}</span>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				timer:null,
				time:['00','00','00']
			}
		},
		methods:{
			countingDown(){
				let now = Date.now()
				let end = 0
				if(isNaN(this.endTime)){
					end = new Date(this.endTime.replace(/-/g, '/')).getTime()
				}else{
					end = this.endTime
				}
				
				let leftTime = (end - now) / 1000
				// console.log(this.endTime)
				
				this.timer = setInterval(()=>{
					leftTime --
					this.time = [leftTime/3600|0, leftTime/60%60|0, leftTime%60|0].map(item=>item.toString().padStart(2, 0))
					// 判断时间是否已到
					if(leftTime <= 0){
						clearInterval(this.timer)
						this.time = ['00','00','00']
					}
				}, 1000)
			}
		},
		watch:{
			endTime(n){
				clearInterval(this.timer)
				this.countingDown()
			}
		},
		props:{
			endTime:{
				//结束时间
				type:[String, Number],
				default:''
			},
			bgColor:{
				//背景色
				type: String,
				default:''
			},
			color:{
				//字体颜色
				type: String,
				default:'#fff'
			},
			crowd:{
				//冒号间隔 拥挤模式
				type: Boolean,
				default: false
			},
			fontSize:{
				type: String,
				default: '0.18rem'
			},
			marginLeft:{
				type: String,
				default:'0rpx'
			}
		},
		mounted(){
			this.countingDown()
		},
		
		beforeDestroy(){
			clearInterval(this.timer)
		}
	}
</script>

<style lang="less" scoped>
	.time-item{
		// font-size: 24rpx;
		line-height: 1;
		padding: 0.02rem 0.03rem;
		border-radius: 1px;
  }
  .colon{
    color: black;
    margin: 0 0.03rem;
  }
	.crowd{
		padding: 0;
		.colon{
      
			margin-left: 0;
		}
	}
</style>

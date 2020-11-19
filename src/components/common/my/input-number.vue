<template>
	<div class="input-number">
		<i class="iconfont iconjian" @click.stop="clickHandle(-1)"></i>
		<input :value="value" @input="checkEnter" type="number" @blur="checkValue" disabled>
		<i class="iconfont iconjia" @click.stop="clickHandle(1)"></i>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				input: 0,
			}
		},
		methods:{
			clickHandle(n){
				// if(this.disabled) return
				// if(this.max==0){
					// uni.showToast({
					// 	icon:'none',
					// 	title:'暂无库存'
					// })
					// return
				// }
				if(n>0){
					//加1
					if(this.value == this.max) return
					this.input = this.value +1
				}else{
					if(this.value <= this.min) return
					this.input = this.value -1 
        }
        // this.value = this.input
				this.$emit('input', this.input) //触发v-model
			},
			checkValue(e){
				let {value} = e.target
				if(value<=0){
					// uni.showToast({
					// 	icon:"none",
					// 	title:'数量不能等于或小于零!'
					// })
					this.$emit('input', 1)
					e.target.value = 1 //备用
					return '1' //仅微信小程序可用 重置输入框的值
				}
				this.$emit('input', value)
			},
			checkEnter(e){
				//验证用户输入是否符合规则
				// if(isNaN(e.target.value)||e.target.value>this.max){
				// 	uni.showToast({
				// 		icon:'none',
				// 		duration:2500,
				// 		title:'请输入有效数量'
				// 	})
				// 	/* 这里就神奇了 
				// 	给this.value赋值 有时候还清不掉input的值 
				// 	但是value值变了
				// 	return 就没有上面的问题
				// 	*/
				   // this.$emit('input', '') //用户违规输入 清为0后 价格没有变化
				   // this.input = '' //只用这个 input有时候不能重置
				   // return '' //只用这个 value只是表面重置 值还是以前的值
				// }
				// this.input = e.target.value
				// console.log(e)
				// this.$emit('input', e.target.value)
			},
			
		},
		watch:{
			value(n){
				this.$emit('change')
			}
		},
		props:{
			value: {
        type:[Number],
        default:1
      },
			max:[Number, String],
			min:{
				type:[Number, String],
				default: 1
			},
			disabled:{
				type:Boolean,
				default: false
			}
		}
	}
</script>

<style lang="less" scoped>
	.input-number{
		// width: 0.9rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		i{
			font-size: 0.17rem;
			color: #b5b5b5;
			font-weight: bold;
			// height: 38rpx;
			// width: 40rpx;
			text-align: center;
			// line-height: 38rpx;
		}
		.iconjia{
			color: #1a1a1a;
		}
		input{
			width: 0.45rem;
			height:0.24rem;
			background-color: #f7f7f7;
			text-align: center;
      font-size: 0.21rem;
      margin: 0 0.06rem;
		}
	}
</style>

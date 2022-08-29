<template>
	<view>
		<view class="mask " :class="value?'show':''" @touchmove.prevent>
			<view class="toast">
				<view class="titleArea">
					<view class="icon-question-fill"></view>
					<view class="title">{{title}}</view>
				</view>
				<view class="line"></view>
				<view class="btnArea">
					<button @click="confirm()">确认</button>
					<button class="btn-line" @click="cancel()">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'myModal',
		props: {
			value: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '您是否确认取消预约？'
			}
		},
		data() {
			return {
				confirm(){
					this.$emit('click')
				},
				cancel(){
					this.$emit('input',false)
				},
			}
		},
	}
</script>

<style>
</style>

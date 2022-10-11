<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<image style="width: 100%;height: 386rpx;" :src="data.courseware_img_path" mode="aspectFill"></image>
		<!-- <image style="width: 100%;height: 386rpx;" v-if="data" :src="data.cover[0].url" mode="aspectFill"></image> -->
		<view class="u-p-lr-40" v-if="data">
			<view class="title u-m-t-20">{{data.courseware_name}}</view>
			<view class="u-flex space-between u-m-tb-20">
				<view class="text-black icon-map-pin-user-line">{{data.student_count}}/{{data.site_capacity}}人已报名</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课日期:</view>
				<view class="content u-m-l-10">{{data.date}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课时间:</view>
				<view class="content u-m-l-10">{{data.time_section_name}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课地点:</view>
				<view class="content u-m-l-10">{{data.site_name}}</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;">
				<view class="title u-font-28">上课教师:</view>
				<view class="content u-m-l-10">{{data.teacher_name}}</view>
			</view>

		</view>

		<view class="bottom" v-if="isEdit">
			<button @click="submit()" :class="isApplyed?'btn-disabled':''" :disabled="isApplyed">{{applyBtn}}</button>
			<!-- <button v-else class="btn-disabled">参加人数已满</button> -->
		</view>
<<<<<<< HEAD
		<u-toast ref="uToast"></u-toast>
=======

>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
	</view>
</template>

<script>
	import myModal from '../../component/modal.vue'
	export default {
		components: {
			myModal
		},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				id: null,
				data: null,
				isEdit: false,
				list: [{
						name: '是',
						disabled: false
					},
					{
						name: '否',
						disabled: false
					}
				],
<<<<<<< HEAD
				applyBtn: '立即报名',
				isApplyed: false
=======
				applyBtn:'立即报名',
				isApplyed:false
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.getData()
			}
			if (option.isEdit) {
				this.isEdit = option.isEdit
			}

			let user = uni.getStorageSync('user')
<<<<<<< HEAD

=======
			
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
			if (user.type == 102) {
				this.isEdit = true
			}
		},
		methods: {
			getData() {
				this.http.get('/api/course', {
					id: this.id
				}, 2).then((data) => {
					data.courseware_img_path = getApp().globalData.domain + data.courseware_img_path
<<<<<<< HEAD
					if (data.is_apply) {
=======
					if(data.is_apply){
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
						this.applyBtn = '已报名'
						this.isApplyed = true
					}
					this.data = data
				})
			},
			submit() {
<<<<<<< HEAD
				var that = this
				this.isApplyed = true //提交用来禁用
				this.http.post1('/api/course/student/apply', {
					id: this.id
				}, 2).then((data) => {
					// uni.navigateTo({
					// 	url: 'success?type=0&&id=' + this.id
					// })

					if (data.status == 1) {
						that.$refs.uToast.show({
							title: '报名成功',
							position: 'center',
							type: 'success',
							icon: 'true',
							callback() {
								that.getData()
							}
						});
					} else {
						that.$refs.uToast.show({
							title: data.msg,
							position: 'center',
							type: 'error',
							icon: 'true'
						});
						this.isApplyed = false
					}
=======
				this.http.post1('/api/course/student/apply', {
					id: this.id
				}, 2).then((data) => {
					uni.navigateTo({
						url: 'success?type=0&&id=' + this.id
					})
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
				})
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: calc(248upx + env(safe-area-inset-bottom));
	}

	/* .bottom {
		padding-bottom: 30rpx;
	} */
</style>

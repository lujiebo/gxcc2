<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<view class="u-p-lr-40" v-if="data">
			<view class="title u-m-t-20"></view>
			<view class="u-flex space-between u-m-tb-20">
				<view class="text-black "></view>
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
			<view class="u-flex u-m-tb-10">
				<view class="title u-font-28">确认结果:</view>
				<view class="content u-m-l-10">
					<u-radio-group v-model="value" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.value"
							:disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="u-flex u-m-tb-10" style="align-items: baseline;" v-if="showCourse">
				<view class="title u-font-28">选择课件:</view>
				<view class="content u-m-l-10">
					<u-input v-model="courseware" placeholder="点击选择课件" type="select" @click="toChoose()" />
				</view>
			</view>
		</view>

		<view class="bottom" v-if="!isEdit">
<<<<<<< HEAD
			<button @click="submit()" :disabled="isAble">立即确认</button>
=======
			<button @click="submit()">立即确认</button>
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
			<!-- <button v-else class="btn-disabled">参加人数已满</button> -->
		</view>
		<u-toast ref="uToast"></u-toast>

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
				show: false,
				value: '1',
				courseware_id: '',
				courseware: '',
				showCourse: false,
<<<<<<< HEAD
				isAble: false,
=======
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
				list: [{
						name: '通过',
						value: '1',
						disabled: false
					},
					{
						name: '不通过',
						value: '0',
						disabled: false
					}
				]
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
			this.role = user.type
			if (user.type == 103) {
				this.showCourse = true
			} else if (user.type == 102) {
				this.showCourse = false
			}

			uni.$on('chooseCourseware', (data) => {
<<<<<<< HEAD
				this.courseware_id = data.id
				this.courseware = data.name
=======
				console.log(data.text)
				this.courseware_id = data.value
				this.courseware = data.text
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
			})

		},
		methods: {
			radioChange() {
				console.log(this.value)
			},
			radioGroupChange() {
				if (this.value == '1' && this.role == 103) {
					this.showCourse = true
				} else {
					this.showCourse = false
				}
			},
			getData() {
				this.http.get('/api/course', {
					id: this.id
				}, 2).then((data) => {
					this.data = data
				})
			},
			toChoose() {
				uni.navigateTo({
					url: '../teacher/chooseCourseware'
				})
			},
			submit() {
<<<<<<< HEAD
				this.isAble = true //防止多次提交

=======
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
				if (this.role == 103) {
					this.http.post1('/api/course/teacher/affirm', {
						id: this.id,
						courseware_id: this.courseware_id,
						result: this.value
					}, 2).then((data) => {
						if (data.status == 1) {

							this.$refs.uToast.show({
								title: '确认成功',
								position: 'center',
								type: 'success',
								icon: 'true',
								callback() {
<<<<<<< HEAD
									uni.redirectTo({
										url: 'confirmList?current=0'
									})
									// uni.navigateBack({
									// 	delta: 1
									// })

									// uni.$emit('onReload')
=======
									uni.navigateBack({
										delta: 2
									})

									uni.$emit('onReload')
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
								}
							});

						} else {

							this.$refs.uToast.show({
								title: data.msg,
								position: 'center',
								type: 'success',
								icon: 'true'
							});
<<<<<<< HEAD
							this.isAble = false
=======
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
						}

					})

				} else if (this.role == 102) {
					this.http.post1('/api/course/student/affirm', {
<<<<<<< HEAD
						id: this.id,
						result: this.value
=======
						id: this.id
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
					}, 2).then((data) => {
						if (data.status == 1) {

							this.$refs.uToast.show({
								title: '确认成功',
								position: 'center',
								type: 'success',
								icon: 'true',
								callback() {
<<<<<<< HEAD
									uni.redirectTo({
										url: 'confirmList?current=0'
									})
									// uni.navigateBack({
									// 	delta: 1
									// })

									// uni.$emit('onReload')
=======
									// uni.navigateTo({
									// 	url:'confirmList?current=0'
									// })
									uni.navigateBack({
										delta: 2
									})

									uni.$emit('onReload')
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
								}
							});

						} else {

							this.$refs.uToast.show({
								title: data.msg,
								position: 'center',
								type: 'success',
								icon: 'true'
							});
<<<<<<< HEAD
							this.isAble = false
=======
>>>>>>> 81459a5ebd717a118cd68effca4824bb0990f641
						}

					})
				}

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

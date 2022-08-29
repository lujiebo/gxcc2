<template>
	<view :class="uiStyle=='normal'?'':'elder'">
		<u-form :model="form" ref="uForm" :border-bottom="true" label-width="184">
			<u-form-item label="报修器材地址" required prop="schoolid" label-position="top" :border-bottom="false">
				<view class="picker" @click="toChoose()">
					<view :class="schoolName?'':'placeholder'">
						{{schoolName?schoolName:'请选择报修地址'}}
					</view>
					<view class="icon-arrow-right-s-line"></view>
				</view>
			</u-form-item>
			<u-form-item label="报修器材" required prop="infrastructurename" label-position="top" :border-bottom="false">
				<u-picker mode="selector" v-model="show" @confirm="DateChange2" :range="sportsList" range-key="text"
					:safe-area-inset-bottom="true"></u-picker>
				<view class="picker" @click="show = true">
					<view :class="sports?'':'placeholder'">
						{{sports?sports:'请选择器材'}}
					</view>
					<view class="icon-arrow-right-s-line"></view>
				</view>
			</u-form-item>
			<u-form-item label="报修描述" required prop="description" label-position="top" :border-bottom="false">
				<view style="width: 100%;">
					<u-input v-model="form.description" type="textarea" :border="true" placeholder="请填写报修具体情况"
						height="110" />
				</view>
			</u-form-item>
			<u-form-item label="上传相关照片" required :borderBottom="false" label-position="top" prop="assetid">
				<u-upload :action="action" :max-size="20 * 1024 * 1024" @on-remove="remove"
					@on-uploaded="uploaded" ref="uUpload" :header="header" :file-list="picList"
					:max-count="5"></u-upload>
			</u-form-item>
		</u-form>
		<view class="buttom">
			<button @click="sub">立即发布</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				schoolName: '',
				sportsList: [],
				show: false,
				sports: '',
				action: 'https://playground.mycej.com/index.php/api/activity/uploadCover',
				header: {},
				picUped: true,
				picList:[],
				form: {
					infrastructurename:'',
					schoolid:'',
					description:'',
					assetid:[]
				},
				rules: {
					assetid: [
						// 对name字段进行必填验证
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return value.length > 0;
							},
							message: '请至少上传一张图片',
							trigger: ['change', 'blur']
						},
					],
					infrastructurename: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请选择器材',
							trigger: ['change', 'blur']
						},
					],
					schoolid: [
						// 对name字段进行必填验证
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return value ? true : false;
							},
							message: '请选择报修地址',
							trigger: ['change', 'blur']
						},
					],
					description: [
						// 对name字段进行必填验证
						{
							required: true,
							message: '请填写报修具体情况',
							trigger: ['change', 'blur']
						},
					],
				}
			}
		},
		onUnload() {
			uni.$off('chooseSchool')
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			var token = uni.getStorageSync('user-token')
			this.header = {
				token: token
			}
			uni.$on('chooseSchool', (data) => {
				this.form.schoolid = data.id
				this.schoolName = data.schoolname
				this.getSports()
			})
		},
		methods: {
			getSports() {
				this.http.post('repair/getInfrastructureListBySchoolid', {
					schoolid: this.form.schoolid,
				}, 2).then((data) => {
					this.sportsList = []
					for (var i in data.list) {
						this.sportsList.push({
							text: data.list[i],
							value: i
						})
					}
				})
			},
			toChoose() {
				uni.navigateTo({
					url: '../activity/chooseSchool'
				})
			},
			DateChange2(e) {
				this.sports = this.sportsList[e].text
				this.form.infrastructurename = this.sportsList[e].value
			},
			uploaded(lists) {
				this.form.assetid = []
				this.picUped = true
				lists.forEach((v, index) => {
					if (v.progress == 100) {
						if (v.response) {
							console.log(v)
							this.form.assetid.push(v.response.data.id)
						} else {
							this.form.assetid.push(v.id)
						}
					} else {
						this.picUped = false
					}
				})
			},
			remove(index, lists) {
				this.form.assetid = []
				this.picUped = true
				lists.forEach((v, index) => {
					if (v.progress == 100) {
						if (v.response) {
							console.log(v)
							this.form.assetid.push(v.response.data.id)
						} else {
							this.form.assetid.push(v.id)
						}
					} else {
						this.picUped = false
					}
				})
			},
			sub() {
				if (this.picUped == false) {
					uni.showToast({
						icon: 'none',
						title: '有图片上传失败，请重新上传'
					})
					return;
				}
				this.$u.throttle((data) => {
					this.$refs.uForm.validate((valid) => {
						if(valid) {
							this.http.post('repair/addRepair', {
								...this.form,
							}, 2).then((data) => {
									uni.redirectTo({
										url: 'success'
									})
							})
						}
						
					});
				}, 500)
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	picker {
		width: 100%;
	}

	.picker {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		border: 2rpx solid #dcdfe6;
		border-radius: 8rpx;
		padding: 0 22rpx;
	}

	.picker .placeholder {
		color: #c0c4cc;
		flex: 1 0 0;
	}

	.picker .icon-arrow-right-s-line {
		color: #C7C7CC;
		flex: 0 0 0;
		font-size: 40rpx;
		transform: translateX(10rpx);
	}
	.buttom {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.buttom button {
		width: 460rpx;
		height: 96rpx;
		border-radius: 48rpx;
	}
	
	.elder .picker {
		font-size: 36rpx;
	}
	.elder /deep/.u-form-item {
		font-size:40rpx ;
	}
	.elder /deep/ .u-input__input {
		font-size: 36rpx;
	}
	.elder .buttom button{
		font-size: 40rpx;
	}
</style>

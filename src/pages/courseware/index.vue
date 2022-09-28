<template>
	<view :class="uiStyle == 'normal' ? '' : 'elder'">
		<u-form :model="form" ref="uForm" :border-bottom="true" label-width="184">
			<uniSection title="课件信息" type="line">
				<u-form-item label="课件名称" required prop="name">
					<u-input v-model="form.name" placeholder="请输入课件名称" />
				</u-form-item>
				<u-form-item label="课程来源" prop="course">
					<u-picker mode="selector" v-model="showSource" @confirm="SourceChange" :range="SourceList"
						range-key="text" :safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.source_name" placeholder="请选择课程来源" type="select"
						@click="showSource = true" />
				</u-form-item>
				<u-form-item label="出版机构" prop="publisher">
					<u-input v-model="form.publisher" placeholder="请输入出版机构" />
				</u-form-item>
				<u-form-item label="课程语言" prop="course">
					<u-picker mode="selector" v-model="showCourse" @confirm="CourseChange" :range="courseList"
						range-key="text" :safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.language_name" placeholder="请选择课程语言" type="select"
						@click="showCourse = true" />
				</u-form-item>
				<u-form-item label="年龄段" prop="Age">
					<u-picker mode="selector" v-model="showAge" @confirm="AgeChange" :range="AgeList" range-key="text"
						:safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.age_section_name" placeholder="请选择年龄段" type="select"
						@click="showAge = true" />
				</u-form-item>
			</uniSection>
			<uniSection title="上传附件" type="line">
				<view class="u-p-lr-40  upPic">
					<!-- <view class="content u-font-24 u-m-b-20">至少上传一张配图</view> -->
					<u-form-item label="" :borderBottom="false" prop="assetid">
						<u-upload :action="action" ref="uUpload" :max-size="20 * 1024 * 1024" @on-remove="remove"
							:file-list="picList" :auto-upload="false" @on-uploaded="onUploaded" :show-progress="showProgress"></u-upload>
					</u-form-item>

				</view>
				<view class="upButtom1">
					<u-button @click="upload" class="upBtn">上传</u-button>
					<u-button @click="clear" type="primary" class="upBtn">清空</u-button>
				</view>

			</uniSection>
		</u-form>


		<view class="buttom">
			<button @click="sub">立即登记</button>
		</view>

	</view>
</template>

<script>
	import uniSection from '../../uni-section/uni-section.vue';
	import * as util from '../../common/util.js';
	var formatLocation = util.formatLocation;

	export default {
		components: {
			uniSection
		},
		watch: {},
		data() {
			return {
				uiStyle: getApp().globalData.uiStyle,
				show: false,
				header: {},
				type: 2, //0：志愿活动1：组队活动 2：场地登记 3：科普活动
				action: '/api/sys/document/101',
				courseList: [],
				AgeList: [],
				SourceList: [],
				location: {},
				hasLocation: false,
				showSex: false,
				showCourse: false,
				showSource: false,
				showAge: false,
				showProgress: true,
				picList: [],
				formdata: '',
				form: {
					name: '',
				},
				rules: {
					name: [
						// 对sitename字段进行必填验证
						{
							required: true,
							message: '请输入学生姓名',
							trigger: ['change', 'blur']
						}
					]
				}
			}
		},
		onLoad(option) {
			var token = uni.getStorageSync('user-token')
			this.header = {
				token: token
			}
			this.getCourse()
			this.getSource()
			this.getAge()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			// chooseComplete(lists, name) {
			// 	this.picList = lists

			// 	// console.log(this.$refs.uUpload.lists)
			// 	let file = this.$refs.uUpload.lists

			// this.compressImg(file[0].file).then(res => {
			// 	console.log(res)
			// 	// 替换压缩后的到上传列表
			// 	this.$refs.uUpload.lists.forEach((item, index) => {
			// 		// 匹配具体的文件，然后替换
			// 		if (item.file.name == res.name) {
			// 			this.$refs.uUpload.lists[index].file = res;
			// 			this.$refs.uUpload.lists[index].url = res.path;
			// 		}
			// 	})
			// })

			// let data = {}
			// const formdata = new FormData()
			// data.file_count = this.picList.length
			// formdata.append('data', JSON.stringify(data))
			// 	console.log(formdata)
			// lists.forEach((file, index) => formdata.append('file_' + index.toString(), file))
			// console.log(formdata)
			// console.log(formdata)

			// this.http.post1('/api/student', josnform, 2).then((data) => {
			// 	if (data.status == 1) {
			// 		console.log(data.data.id)
			// 		uni.redirectTo({
			// 			url: './success?id=' + data.id + '&&type=0' //0成功1失败
			// 		})
			// 	} else {
			// 		uni.redirectTo({
			// 			url: './success?id=' + data.id + '&&msg=' + data.msg + '&&type=1' //0成功1失败
			// 		})
			// 	}

			// }).catch(() => {
			// 	// uni.redirectTo({
			// 	// 	url: './success?id=' + this.id + '&&type=1' //0成功1失败
			// 	// })
			// })
			// },
			// 压缩图片
			// compressImg(file) {
			// 	return new Promise((resolve, reject) => {
			// 		let reader = new FileReader();
			// 		reader.onloadend = function(e) {
			// 			let img = new Image();
			// 			img.onload = function() {
			// 				let canvasWidth = img.width // 图片原始长宽
			// 				let canvasHeight = img.height
			// 				let canvas = document.createElement('canvas');
			// 				let ctx = canvas.getContext('2d');
			// 				// 创建固定750宽度的图片，可自定义大小
			// 				canvas.width = 750;
			// 				canvas.height = (750 * canvasHeight) / canvasWidth;
			// 				ctx.drawImage(img, 0, 0, 750, (750 * canvasHeight) / canvasWidth);
			// 				canvas.toBlob(
			// 					function(blob) {
			// 						// 创建file文件
			// 						let pressFile = new File([blob], file.name, {
			// 							type: file.type
			// 						})
			// 						Object.defineProperty(pressFile, 'path', {
			// 							get: () => URL.createObjectURL(blob)
			// 						})
			// 						return resolve(pressFile)
			// 					},
			// 					file.type,
			// 					0.9 // 图片质量，值0-1之间，可不填默
			// 				);
			// 			};
			// 			img.src = e.target.result;
			// 		};
			// 		// 读取 File 对象，然后触发 loadend 事件
			// 		reader.readAsDataURL(file);
			// 	})
			// },
			// upload(lists) {
			// 	let data = {}
			// 	const formdata = new window.FormData()
			// 	data.file_count = this.picList.length
			// 	formdata.append('data', JSON.stringify(data))
			// 	this.picList.forEach((file, index) => {
			// 		formdata.append('file_' + index.toString(), file.file)
			// 	})

			// 	// const tempFilePaths = this.$refs.uUpload.lists[0].url;
			// 	// await uni.uploadFile({
			// 	// 	url: '/api/sys/document/101', //仅为示例，非真实的接口地址
			// 	// 	file: this.$refs.uUpload.lists[0].file,
			// 	// 	name: 'file',
			// 	// 	success: (uploadFileRes) => {
			// 	// 		console.log(uploadFileRes.data);
			// 	// 	}
			// 	// });

			// 	// this.http.post3('/api/sys/document/101', this.picList[0].url, 'file', '').then((
			// 	// 	data) => {
			// 	// 	console.log(data)

			// 	// }).catch((e) => {
			// 	// 	console.log(e)
			// 	// 	// uni.redirectTo({
			// 	// 	// 	url: './success?id=' + this.id + '&&type=1' //0成功1失败
			// 	// 	// })
			// 	// })

			// 	// if (data.status == 1) {
			// 	// 	console.log(data.data.id)
			// 	// 	uni.redirectTo({
			// 	// 		url: './success?id=' + data.id + '&&type=0' //0成功1失败
			// 	// 	})
			// 	// } else {
			// 	// 	uni.redirectTo({
			// 	// 		url: './success?id=' + data.id + '&&msg=' + data.msg + '&&type=1' //0成功1失败
			// 	// 	})
			// 	// }

			// 	this.http.post2('/api/sys/document/101', formdata, 2).then((data) => {
			// 		console.log(data)
			// 		// if (data.status == 1) {
			// 		// 	console.log(data.data.id)
			// 		// 	uni.redirectTo({
			// 		// 		url: './success?id=' + data.id + '&&type=0' //0成功1失败
			// 		// 	})
			// 		// } else {
			// 		// 	uni.redirectTo({
			// 		// 		url: './success?id=' + data.id + '&&msg=' + data.msg + '&&type=1' //0成功1失败
			// 		// 	})
			// 		// }

			// 	}).catch((e) => {
			// 		console.log(e)
			// 		// uni.redirectTo({
			// 		// 	url: './success?id=' + this.id + '&&type=1' //0成功1失败
			// 		// })
			// 	})

			// },
			upload() {
				this.$refs.uUpload.upload()
			},
			onUploaded(lists) {
				console.log('onUploaded', lists)
				this.form.doc_id = lists[0].response.data.id
				this.form.doc_name = lists[0].response.data.name
				
			},
			clear() {
				this.form.doc_id = ''
				this.form.doc_name = ''
				this.$refs.uUpload.clear()
			},
			remove(index, lists) {
				this.form.doc_id = ''
				this.form.doc_name = ''
				// this.form.assetid = []
				// this.picUped = true
				// lists.forEach((v, index) => {
				// 	if (v.progress == 100) {
				// 		if (v.response) {
				// 			console.log(v)
				// 			this.form.assetid.push(v.response.data.id)
				// 		} else {
				// 			this.form.assetid.push(v.id)
				// 		}
				// 	} else {
				// 		this.picUped = false
				// 	}
				// })
			},
			getCourse() {
				this.http.get(
					'/api/sys/item/101', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.courseList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getAge() {
				this.http.get(
					'/api/sys/item/109', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.AgeList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getSource() {
				this.http.get(
					'/api/sys/item/107', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.SourceList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			CourseChange(e) {
				this.form.language_name = this.courseList[e].text
				this.form.language_id = this.courseList[e].value
			},
			AgeChange(e) {
				this.form.age_section_name = this.AgeList[e].text
				this.form.age_section_id = this.AgeList[e].value
			},
			SourceChange(e) {
				this.form.source_name = this.SourceList[e].text
				this.form.source_id = this.SourceList[e].value
			},
			sub() {
				var josnform = JSON.stringify(this.form);
				console.log(josnform)

				this.http.post1('/api/courseware', josnform, 2).then((data) => {
					if (data.status == 1) {
						console.log(data.data.id)
						uni.redirectTo({
							url: './success?id=' + data.id + '&&type=0' //0成功1失败
						})
					} else {
						uni.redirectTo({
							url: './success?id=' + data.id + '&&msg=' + data.msg +
								'&&type=1' //0成功1失败
						})
					}

				}).catch(() => {
					// uni.redirectTo({
					// 	url: './success?id=' + this.id + '&&type=1' //0成功1失败
					// })
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.upPic /deep/ .u-form-item {
		padding: 0;
	}

	picker {
		width: 100%;
	}

	.picker {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.picker .placeholder {
		color: #c0c4cc;
		flex: 1 0 0;
	}

	.picker .icon-arrow-right-s-line {
		color: #c7c7cc;
		flex: 0 0 0;
		font-size: 40rpx;
		transform: translateX(10rpx);
	}

	/deep/ .u-form-item--left[data-v-5e7216f1] {
		display: block;
	}

	.buttom {
		width: 100%;
		text-align: center;
	}

	.buttom button {
		margin: 40rpx auto;
		width: 460rpx;
		height: 96rpx;
		font-size: 28rpx;
		border-radius: 48rpx;
	}

	.upButtom {
		width: 100%;
		text-align: center;
	}

	.upBtn {
		margin: 10rpx auto;
		width: 300rpx;
		height: 60rpx;
		font-size: 28rpx;
		color: #606266;
		border-color: #c0c4cc;
		background-color: #ffffff;
		border: 1rpx solid;
		float: left;
		border-radius: 10px;
		margin-left: 40rpx;
		border-color: #c0c4cc;
	}

	.u-page {
		&__button-item {
			margin: 0 15px 15px 0;
		}
	}

	.u-demo-block__content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}

	.elder .picker {
		font-size: 36rpx;
	}


	.elder /deep/.u-form-item {
		font-size: 40rpx;
	}

	.elder /deep/ .u-input__input {
		font-size: 36rpx;
	}

	.panel {
		position: relative;
		width: 100%;
		background-color: white;
		border-radius: 20upx;
		border-bottom: 1px solid rgb(236, 236, 236);
	}

	.card {
		background-color: white;
		border-radius: 16upx;
		padding: 22upx 10upx 22upx 45upx;
		height: auto;
		margin-bottom: 20upx;
	}

	.card .title {
		/* margin-top: 20upx; */
		/* font-size: 32upx; */
		font-weight: normal;
	}

	.cd /deep/ .label-text {
		font-size: 28rpx;
	}

	.cd /deep/ .uni-forms-item__label {
		width: 120rpx;
		margin-left: 40rpx;
		margin-top: 15rpx;
	}

	.cd /deep/ .uni-forms-item__content {
		margin-top: 20rpx;
		margin-right: 40rpx;
	}

	.cd {
		text-align: right;
	}

	.cd /deep/ .btn1 {
		width: 80rpx;
		height: 40rpx;
		font-size: 22rpx;
		background-color: #5ac725;
	}

	.cd /deep/ .btn2 {
		width: 80rpx;
		height: 40rpx;
		font-size: 22rpx;
		background-color: #f56c6c;
	}

	.mycard /deep/ .uni-forms-item__inner {
		padding-bottom: 15rpx;
	}

	.mycard /deep/ .label-text {
		font-size: 22rpx;
	}

	.sportsCheck {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		margin-top: 15rpx;
	}

	.sportsCheck .item {
		box-sizing: border-box;
		width: 136rpx;
		min-height: 72rpx;
		border-radius: 10rpx;
		border: 2rpx solid rgba(211, 212, 215, 1) !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18rpx;
		color: #363a44 !important;
		margin-bottom: 20rpx !important;
		margin-right: 18rpx !important;
		flex-direction: column;
		padding: 10rpx !important;
		background-color: white !important;
	}

	.sportsCheck .checked {
		color: #ff6a2a !important;
		border: 2rpx solid rgba(255, 106, 42, 1) !important;
		background-color: rgba(255, 106, 42, 0.2) !important;
	}
</style>

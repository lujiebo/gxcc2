<template>
	<view :class="uiStyle == 'normal' ? '' : 'elder'">
		<u-form :model="form" ref="uForm" :border-bottom="true" label-width="184">
			<uniSection title="场地信息" type="line">
				<u-form-item label="场地名称" required prop="name">
					<u-input v-model="form.name" placeholder="请输入场地名称" />
				</u-form-item>
				<u-form-item label="所在镇街道" prop="town">
					<u-picker mode="selector" v-model="show" @confirm="TownChange" :range="townList" range-key="text"
						:safe-area-inset-bottom="true"></u-picker>
					<u-input v-model="form.town_name" placeholder="请选择镇街道" type="select" @click="show = true" />
				</u-form-item>
				<u-form-item label="详细地址" prop="address">
					<u-input v-model="form.address" placeholder="请输入详细地址" type="select" @tap="chooseLocation" />
				</u-form-item>
				<u-form-item label="地址经度" prop="ing">
					<u-input v-model="form.lngview" placeholder="请输入地址经度" />
				</u-form-item>
				<u-form-item label="地址纬度" prop="lat">
					<u-input v-model="form.latview" placeholder="请输入地址纬度" />
				</u-form-item>
				<u-form-item label="场地所有者" prop="owner">
					<u-input v-model="form.owner" placeholder="请输入场地所有者" />
				</u-form-item>
				<u-form-item label="联系电话" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="可容纳人数" prop="capacity">
					<u-input v-model="form.capacity" placeholder="请输入可容纳人数" type="number" />
				</u-form-item>
				<u-form-item label="管理员姓名" prop="adminname">
					<u-input v-model="form.admin_name" placeholder="请输入管理员姓名" />
				</u-form-item>
				<u-form-item label="管理员手机" prop="adminmobile">
					<u-input v-model="form.admin_mobile" placeholder="请输入管理员手机" type="number" />
				</u-form-item>
				<u-form-item label="管理员住址" prop="adminaddress">
					<u-input v-model="form.admin_address" placeholder="请输入管理员住址" />
				</u-form-item>
				<u-form-item label="管理员身份证" prop="adminidno">
					<u-input v-model="form.admin_idno" placeholder="请输入管理员身份证" type="idcard" />
				</u-form-item>
				<u-form-item label="人数规模" prop="servicenumber">
					<u-input v-model="form.service_number" placeholder="请输入人数规模" type="number" />
				</u-form-item>
				<view class="panel">
					<view class="card">
						<view class="title">时间选择</view>

						<view class="sportsCheck">
							<view v-for="(item, index) in date" class="item" :class="item.checked ? 'checked' : ''"
								@click="dateChange(item.id)">
								<view>{{ item.name }}</view>
								<view class="u-m-t-8">{{ item.time }} </view>
							</view>
						</view>
					</view>
				</view>
				<uni-forms-item name="device" label="场地设备" class="cd">
					<view>
						<button type="success" @click="addDevice" class="btn1">
							新增
						</button>
					</view>
					<view v-for="(item, index) in form.siteEquipment" :key="item.id">
						<uni-card title="" style="margin: 20px 0px 0px 0px;" class="mycard">
							<uni-forms-item label="设备名称">
								<uni-easyinput v-model="item.name" trim="both"></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item label="设备数量">
								<uni-number-box v-model="item.num" background="#63afff" color="#fff" />
							</uni-forms-item>
							<view>
								<view>
									<button type="warn" @click="deleteDevice(index, item)" class="btn2">
										删除
									</button>
								</view>
							</view>
						</uni-card>
					</view>
				</uni-forms-item>
				<!-- 				<u-form-item label="场地介绍" required prop="introduce">
					<view style="width: 100%;">
						<u-input v-model="form.introduce" type="textarea" maxlength="160" placeholder="请输入场地介绍" />
						<view style="color: #00000070;width: 100%;text-align: end;line-height: 1;">
							{{form.introduce.length}}/160字
						</view>
					</view>
				</u-form-item> -->
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
				action: 'https://playground.mycej.com/index.php/api/activity/uploadCover',
				date: [],
				town: '',
				townList: [],
				location: {},
				hasLocation: false,
				form: {
					name: '',
					town_id: '',
					town_name: '',
					address: '',
					lng: '', //经度
					lat: '', //纬度
					owner: '',
					phone: '',
					capacity: '',
					admin_name: '',
					admin_mobile: '',
					admin_address: '',
					admin_idno: '',
					service_number: '',
					siteTimeSection: [],
					siteEquipment: [{
						name: "",
						num: "1"
					}]
				},
				rules: {
					name: [
						// 对sitename字段进行必填验证
						{
							required: true,
							message: '请输入场地名称',
							trigger: ['change', 'blur']
						}
					]
					// ,
					// schoolid: [
					// 	// 对name字段进行必填验证
					// 	{
					// 		validator: (rule, value, callback) => {
					// 			// 上面有说，返回true表示校验通过，返回false表示不通过
					// 			// this.$u.test.mobile()就是返回true或者false的
					// 			return value != '' ? true : false
					// 		},
					// 		message: '请选择场地地点',
					// 		trigger: ['change', 'blur']
					// 	}
					// ]
				}
			}
		},
		onLoad(option) {
			var token = uni.getStorageSync('user-token')
			this.header = {
				token: token
			}
			this.getCategory()
			this.getDate()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			chooseLocation: function() {
				uni.chooseLocation({
					success: (res) => {
						console.log(formatLocation(res.longitude, res.latitude), res.address)
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						this.form.lngview = "E: " + this.location.longitude[0] + "°" + this.location
							.longitude[1] + "′";
						this.form.latview = "N: " + this.location.latitude[0] + "°" + this.location
							.latitude[1] + "′";
						this.form.lng = this.location.longitude[0] + "." + this.location
							.longitude[1];
						this.form.lat = this.location.latitude[0] + "." + this.location
							.latitude[1];
						this.form.address = res.address;
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			getCategory() {
				this.http.get(
					'/api/sys/item/104', {
						type: 0
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						this.townList.push({
							text: data.rows[i].name,
							value: data.rows[i].id
						})
					}
				})
			},
			getDate() {
				this.http.get(
					'/api/sys/item/108', {
						type: 0,
						ppc: -1
					},
					2
				).then(data => {
					console.log(data)
					for (var i in data.rows) {
						if (!data.rows[i].status) {
							continue
						}
						this.date.push({
							id: data.rows[i].id,
							no: data.rows[i].no,
							name: data.rows[i].name,
							time: data.rows[i].relevant_info,
							checked: false
						})
					}
				})
			},
			remove(index, lists) {
				this.form.assetid = []
				this.picUped = true
				lists.forEach((v, index) => {
					if (v.progress == 100) {
						if (v.response) {
							this.form.assetid.push(v.response.data.id)
						} else {
							this.form.assetid.push(v.id)
						}
					} else {
						this.picUped = false
					}
				})
			},
			TownChange(e) {
				this.form.town_name = this.townList[e].text
				this.form.town_id = this.townList[e].value
			},
			dateChange(id) {
				let time = this.date.find(v => {
					// 防止找不到id==0的对象，以致所以有对象的name都会被改为 'name'
					if (v.id != id) {
						return
					}
					v.checked = !v.checked
					return v.id == id
				})
				this.form.siteTimeSection.push({
					time_section_id: time.id
				})
			},
			addDevice() {
				this.form.siteEquipment.push({
					name: "",
					qty: "1"
				})
			},
			deleteDevice(index, item) {
				this.form.siteEquipment.splice(index, 1)[0]
			},
			sub() {
				var josnform = JSON.stringify(this.form);
				console.log(josnform)

				this.http.post1('/api/site', josnform, 2).then((data) => {
					if (data.status == 1) {
						uni.redirectTo({
							url: './success?id=' + data.id + '&&type=0' //0成功1失败
						})
					} else {
						uni.redirectTo({
							url: './success?id=' + data.id + '&&msg=' + data.msg + '&&type=1' //0成功1失败
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

	.elder .picker {
		font-size: 36rpx;
	}

	.elder /deep/.u-form-item {
		font-size: 40rpx;
	}

	.elder /deep/ .u-input__input {
		font-size: 36rpx;
	}

	.sportsCheck {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		margin-top: 15rpx;
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

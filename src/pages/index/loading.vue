<template>
	<div>
		<div class="maskn">
			<div class="dots-loader"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			
			
			

		},
		methods: {
			isLoad() {
				// uni.reLaunch({
				// 	url:'index'
				// })
				// if (bIsAlipayMini) {
				// 	window.location.href = "https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=BCDSGA_75dc68cd4b42823600c378cac7fe33b8"
				// } else {
				// 	window.location.href ="https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_75dc68cd4b42823600c378cac7fe33b8"
				// }
				// 或者使用replace()
				// window.location.replace('https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=【接入代码】&goto=【附带跳转地址，以sp参数返回】');
			},
			watchApp() {
				window.onpageshow = (event) => {
					if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
						ZWJSBridge.close();
					}
					this.isLoad();
				}
			},
			// 支付宝浙里办小程序判断页面进入状态
			watchApply() {
				window.onpageshow = (event) => {
					if (event.persisted || (window.performance && (window.performance.navigation.type == 1 || window.performance.navigation.type == 0))) {
						this.isLoad();
					} else {
						my.navigateBack();
					}
				}
			},
		},
	}
</script>

<style>
	page {
		background-color: white;
	}

	.maskn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.dots-loader:not(:required) {
		position: relative;
		display: inline-block;
		width: 7px;
		height: 7px;
		margin-bottom: 30px;
		overflow: hidden;
		text-indent: -9999px;
		background: transparent;
		border-radius: 100%;
		box-shadow: #f86 -14px -14px 0 7px, #fc6 14px -14px 0 7px,
			#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		transform-origin: 50% 50%;
		animation: dots-loader 5s infinite ease-in-out;
	}

	@keyframes dots-loader {
		0% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		8.33% {
			box-shadow: #f86 14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		16.67% {
			box-shadow: #f86 14px 14px 0 7px, #fc6 14px 14px 0 7px, #6d7 14px 14px 0 7px,
				#4ae -14px 14px 0 7px;
		}

		25% {
			box-shadow: #f86 -14px 14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		33.33% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae -14px -14px 0 7px;
		}

		41.67% {
			box-shadow: #f86 14px -14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		50% {
			box-shadow: #f86 14px 14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		58.33% {
			box-shadow: #f86 -14px 14px 0 7px, #fc6 -14px 14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		66.67% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 -14px -14px 0 7px,
				#6d7 -14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		75% {
			box-shadow: #f86 14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px -14px 0 7px, #4ae 14px -14px 0 7px;
		}

		83.33% {
			box-shadow: #f86 14px 14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae 14px 14px 0 7px;
		}

		91.67% {
			box-shadow: #f86 -14px 14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}

		100% {
			box-shadow: #f86 -14px -14px 0 7px, #fc6 14px -14px 0 7px,
				#6d7 14px 14px 0 7px, #4ae -14px 14px 0 7px;
		}
	}
</style>

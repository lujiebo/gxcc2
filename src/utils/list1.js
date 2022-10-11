export default {
	data() {
		return {
			pageNo: 1,
			pageSize: 10,
			list: {
				list: []
			},
			list_url: '',
			formate: false,
			search_params: {},
			status: 'nomore'
		}
	},
	async onPullDownRefresh() {
		await this.getlist(true)
		uni.stopPullDownRefresh();
	},
	async onReachBottom() {
		await this.getlist()
	},
	methods: {
		async getlist(init) {
			let url = this.list_url;
			let param = this.search_params;
			var _url = url.replace('/', '_');
			if (init) {
				this.pageNo = 1;
			} else {
				if (this.list && !this.list.has_more) {
					// show_toast('没有更多了~')
					return false;
				}
				this.pageNo = this.pageNo ? this.pageNo : 1;
				++this.pageNo;
			}
			if (!this.list) {
				this.$set(this.list, _url, {
					list_status: 'loading',
					list: [],
					total: 0,
					has_more: true
				})
				this.status = 'loading'
			} else {
				this.list.list_status = 'loading';
				this.status = 'loading'
			}

			const res = await this.http.get(url, {
				pi: this.pageNo,
				ppc: this.pageSize,
				...param
			}, 2);
			if (!res) return;
			this.list = this.list ? this.list : {};
			this.list.list = (this.list.list && !init) ? this.list.list.concat(res.rows) : res.rows;
			this.list.total = res.count;
			this.list.res = res
			this.list.has_more = res.count > this.pageNo * this.pageSize;

			//返回值处理
			if (this.formate) {
				this.list.list.forEach((v, index) => {
					v.courseware_img_path = getApp().globalData.domain + v.courseware_img_path
				})
			}

			console.log(this.list.list)
			if (this.list.has_more) {
				this.list.list_status = 'loadmore';
				this.status = 'loadmore'
			} else {
				this.list.list_status = 'nomore';
				this.status = 'nomore'
			}
		}
	},
}

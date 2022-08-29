export default {
	data() {
		return {
			pageNo: 1,
			pageSize: 20,
			list: {
				list: []
			},
			list_url: '',
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

			const res = await this.http.post(url, {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				...param
			}, 2);
			if (!res) return;
			this.list = this.list ? this.list : {};
			this.list.list = (this.list.list && !init) ? this.list.list.concat(res.list) : res.list;
			this.list.activitys = (this.list.activitys && !init) ? this.list.activitys.concat(res.activitys) : res.activitys;
			this.list.activity = (this.list.activity && !init) ? this.list.activity.concat(res.activity) : res.activity;
			this.list.videos = (this.list.videos && !init) ? this.list.videos.concat(res.videos) : res.videos;
			this.list.lists = (this.list.lists && !init) ? this.list.lists.concat(res.lists) : res.lists;
			this.list.total = res.total;
			this.list.res = res
			this.list.has_more = res.total > this.pageNo * this.pageSize;
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

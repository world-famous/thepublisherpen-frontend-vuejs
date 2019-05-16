<template>
	<section class="page-manager profile-wrapper">
		<div class="profile-inner-wrapper scrollbar-outer">
			<div class="profile-scroll-inner">
				<div class="profile-head" v-if="!!user">
					<div class="page-manager-inner">
						<div class="container-fluid">
							<div class="pen-profile">
								<div class="profile-head">
									<div class="profile-head-box">
										<div class="image-holder">
											<img :src="user.avatar" alt="" />
										</div>
										<div class="text-box">
											<h3>{{user.username}}</h3>
										</div>
									</div>
									<div class="earning-box">
										<h4>Earning: ${{wallet_balance}}</h4>
										<h5>Total: ${{total_earning}}</h5>
										<a href="javascript:void(0)" data-toggle="modal" data-target="#modal-withdraw" class="btn-withdraw" v-if="withdrawable">Withdraw</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="profile-boday">
					<div class="container-fluid">
						<div class="page-manager-inner">
							<div class="pen-profile-inner">
								<div class="pen-profil-videos">
									<div class="pen-profile-earning pen-earning-first">
										<div class="title">
											<h2>Engagement</h2>
										</div>
										<div class="pen-profile-earning-inner">
											<div class="pen-profile-earning-box pen-profile-recommend" v-if="view_pid>0">
												<div class="recommend-box">
													<div class="image-holder">
														<a href="javascript:void(0)"><img class="img-fluid" :src="view_post.img_thumb || view_post.avatar" /></a>
													</div>
													<div class="text-box">
														<h4>
															<a href="javascript:void(0)">
																<span>{{decodeURIComponent(view_post.title)}}</span>
															</a>
														</h4>
														<span class="channel-view"><a href="javascript:void(0)">{{view_post.likes - view_post.dislikes>0 ? view_post.likes - view_post.dislikes : 0}} upvotes | <span> {{getHoursDiff(view_post.created)}} ago</span></a></span>
														<div class="pro-text">
															{{extractContent(decodeURIComponent(view_post.body))}}
														</div>
													</div>
												</div>
											</div>
											<div class="chart-wrapper">
												<span>LIKES:</span> <h4 v-if="!!totals">{{totals.total_likes}}</h4>
												<canvas id="chart-up" width="300" height="100"></canvas>
											</div>
											<div class="chart-wrapper">
												<span>DISLIKES:</span> <h4 v-if="!!totals">{{totals.total_dislikes}}</h4>
												<canvas id="chart-down" width="300" height="100"></canvas>
											</div>
											<div class="chart-wrapper">
												<span>VIEWS:</span> <h4 v-if="!!totals">{{totals.total_views}}</h4>
												<canvas id="chart-views" width="300" height="100"></canvas>
											</div>
											<div class="chart-wrapper">
												<span>SHARES:</span> <h4 v-if="!!totals">{{totals.total_shares}}</h4>
												<canvas id="chart-shared" :width="view_pid>0 ? 300 : 450" height="100"></canvas>
											</div>
											<div class="chart-wrapper">
												<span>EARNING:</span> <h4 v-if="!!totals">${{(totals.total_ads * 10).toFixed(2)}}</h4>
												<canvas id="chart-ads" :width="view_pid>0 ? 300 : 450" height="100"></canvas>
											</div>
										</div>
									</div>
									<div class="page-contant-box page-channel-sec">
										<div class="title">
											<h3>Posts</h3>
										</div>
										<div class="recommend-sec mix-video clearfix">
											<div class="recommend-box recommend-margin" v-for="p in filtered" :key="p.id">
												<div class="recommend-box-inner">
													<div class="image-holder">
														<a href="javascript:void(0)" @click="onViewPost(p.id)"><img class="img-fluid" :src="p.img_thumb_small || p.avatar" /></a>
													</div>
													<div class="text-box">
														<h4>
															<a href="javascript:void(0)" @click="onViewPost(p.id)">
																<span>
																	{{decodeURIComponent(p.title)}}
																</span>
															</a>
														</h4>
														<span class="channel-view"><a href="javascript:void(0)">{{p.likes - p.dislikes>0 ? p.likes - p.dislikes : 0}} upvotes | <span> {{getHoursDiff(p.created)}} ago</span></a></span>
														<div class="pro-text">
															{{extractContent(decodeURIComponent(p.body))}}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modal-withdraw" tabindex="-1" role="dialog" aria-labelledby="modal-withdraw" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<form @submit.prevent="onWithdraw">
						<div class="modal-header">
							<h4>Withdraw</h4>
						</div>
						<div class="modal-body" v-if="!pending_withdraw">
							<div class="payment-failed alert alert-danger" v-if="payment_failed">
								Your payment request was failed. Please try again later.
							</div>
							<div>
								<span>Your current earning is ${{wallet_balance}}{{balance_since}}</span>
							</div>
							<div>
								<input type="email" v-model="paypal_addr" class="form-control paypal-mail" placeholder="Paypal Email" required>
							</div>
						</div>
						<div class="modal-body" v-if="pending_withdraw">
							<div class="payment-pending alert alert-warning">
								Your payment is in pending status. You requested withdraw on {{latest_req_date}} and will be paid on {{expected_paid_date}}.
							</div>
						</div>
						<div class="modal-buttons" v-if="!pending_withdraw">
							<button class="btn btn-primary">Withdraw</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modal-pay-success" tabindex="-1" role="dialog" aria-labelledby="modal-pay-success" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
						<div class="modal-header">
							<h4>Payment request success</h4>
						</div>
						<div class="modal-body">
							<div class="alert alert-success">
								Your earnings will be paid on {{ pay_date }}
							</div>
						</div>
						<div class="modal-buttons">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
						</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from '../net/axios';
import tools from '../helpers/helpers';
import Chart from 'chart.js';

export default {
  name: 'Profile',
  data() {
	  return {
		posts: [],
		view_pid: -1,
		trends_data: null,
		charts: {
			views: null,
			up: null,
			down: null,
			shared: null,
			ads: null
		},
		chart_options: {
			scales: {
				yAxes: [{
					ticks: {
						fontColor: '#000', 
						beginAtZero: true
					},
					gridLines: {
						color: 'rgba(255, 255, 255, 0.2)'
					}
				}],
				xAxes: [{
					display: false,
					ticks: {
						fontColor: '#000'
					},
					gridLines: {
						color: 'rgba(255, 255, 255, 0.2)'
					}
				}]
			},
			legend: {
				display: false,
			},
			responsive: true
		},
		totals: null,
		wallet_balance: 0,
		total_earning: 0,
		last_paid_date: '',
		withdrawable: false,
		paypal_addr: '',
		payment_failed: false,
		pending_withdraw: false,
		latest_req_date: '',
		expected_paid_date: ''
	  }
  },
  mounted() {
		document.querySelector('title').innerText = 'PUBLISHER PEN';
		$('.scrollbar-outer').scrollbar();
		axios.getMyPosts(localStorage.uid).then(rows => {
			this.posts = rows.data;
		});
		axios.getCurrentEarning(localStorage.uid).then(b => {
			if (b.data > 0) {
				this.withdrawable = true;
			}
			this.wallet_balance = parseFloat(b.data).toFixed(2);
		});
		axios.getTotalEarning(localStorage.uid).then(t => {
			this.total_earning = parseFloat(t.data).toFixed(2);
		});
		axios.getLastPaidDate(localStorage.uid).then(ldt => {
			this.last_paid_date = ldt.data;
		});
		axios.getTrendsByAuthor(localStorage.uid).then(t => {
			console.log(t.data)
			this.trends_data = t.data;
			this.view_pid = 0;
			this.getChartData();
		});
		axios.getTrendsTotalByAuthor(localStorage.uid).then(r => {
			this.totals = r.data[0];
		})
		this.checkIfPending();
  },
  computed: {
	...mapState([
		'category',
		'sub_category',
		'location',
		'search_key',
		'user',
		'trend'
	]),
	view_post: function() {
		return this.posts.find(p => p.id == this.view_pid);
	},
	balance_since: function() {
		if (this.last_paid_date != '0000-00-00') {
			return ' since '+this.last_paid_date;
		} else {
			return '';
		}
	},
	pay_date: function() {
		let dt = new Date();
		dt.setDate(dt.getDate() + 2);
		return tools.getDmy(dt);
	},
	filtered: function() {
		let filtered = this.posts;
		if (!!this.category) {
			filtered = filtered.filter(p => p.main_topic === this.category);
		}
		if (!!this.sub_category) {
			filtered = filtered.filter(p => p.sub_topic === this.sub_category);
		}
		if (!!this.location) {
			filtered = filtered.filter(p => p.location === this.location);
		}
		if (!!this.search_key) {
			const sk = this.search_key.toLowerCase();
			const search_decision = p => (p.title.toLowerCase().indexOf(sk)>-1 || this.extractContent(p.body).toLowerCase().indexOf(sk)>-1);
			filtered = filtered.filter(p => search_decision(p));
		}
		return filtered;
	}
  },
  methods: {
	extractContent(s) {
		return tools.extractContent(s);
	},
	getHoursDiff(t) {
		return tools.getHoursDiff(t);
	},
	getChartData() {
		let xLabels = [];
		let chart_data = {
			views: [],
			up: [],
			down: [],
			shared: [],
			ads: []
		};
		const keys = ['up', 'down', 'views', 'shared', 'ads'];
		for (let i=10; i>=0; i--) {
			let dt = new Date();
			dt.setDate(dt.getDate()-i);
			xLabels.push(tools.getdmy(dt));

			const entity = this.trends_data.find(t => t.last_act.indexOf(tools.getYmd(dt))>-1);
			keys.forEach(k => {
				let val = !!entity ? entity[k] : 0
				if (k=='ads') {
					val *= 10;
				}
				chart_data[k].push(val);
			});
		}
		
		keys.forEach(k => {
			const ctx = document.getElementById('chart-'+k);
			new Chart(ctx, {
				type: 'line',
				data: {
					labels: xLabels,
					datasets: [{
						label: k=='ads' ? 'earning' : k,
						data: chart_data[k],
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						borderColor: '#000',
						borderWidth: 1
					}]
				},
				options: this.chart_options
			});
		});
	},
	onViewPost(pid) {
		this.view_pid = pid;
		axios.getTrendsByPost(pid).then(resp => {
			console.log('get trends by post', resp.data);
			this.trends_data = resp.data;
			this.getChartData();
		});

		axios.getTrendsTotalByPost(pid).then(resp => {
			this.totals = resp.data[0];
		})
	},
	onWithdraw() {
		this.pay_success = true;
		axios.requestPayment({
			user: localStorage.uid,
			balance: this.wallet_balance,
			receiver: this.paypal_addr
		}).then(r => {
			if (r.data > 0) {
				this.checkIfPending();
				$('#modal-withdraw').modal('hide');
				this.payment_failed = false;
				$('#modal-pay-success').modal('show');
			} else {
				this.payment_failed = true;
			}
		})
	},
	checkIfPending() {
	  axios.checkIfPending(localStorage.uid).then(r => {
		  if (r.data.is_pending > 0) {
			  this.pending_withdraw = true;
			  this.latest_req_date = r.data.req_date;
			  this.expected_paid_date = r.data.exp_date;
		  }
	  })
	}
  }
}
</script>

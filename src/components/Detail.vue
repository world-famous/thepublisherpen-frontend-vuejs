<template>
	<div class="video-detail-page">
		<section class="page-manager">
			<div class=" video-detail" v-if="!!post">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12">
							<div class="page-manager-inner">
								<div class="row">
									<div class="page-detail-colum">
										<div class="content scrollbar-outer left-panel" v-on:scroll="onLeftPanelScroll"
															 ref="leftPanel">
											<div class="video-detail-left">
												<h3>{{decodeURIComponent(post.title)}}</h3>
												<div class="image-holder">
													<img class="img-fluid" :src="post.img_thumb" alt=""/>
													<div class="video-detail-republic" v-if="us_politics && !clicked_politics">
														<ul>
															<li :class="{'active': donkey}"><a @click="onDonkey" href="javascript:void(0)"><i
																class="fas fa-democrat"></i></a></li>
															<li :class="{'active': elephant}"><a @click="onElephant" href="javascript:void(0)"><i
																class="fas fa-republican"></i></a></li>
														</ul>
													</div>
												</div>
												<div class="text-box">
													<p class="title-text">
														{{decodeURIComponent(post.title)}}
													</p>
													<strong>
														<img class="user-pic" :src="post.avatar">
														<a class="user-name" href="javascript:void(0)">{{post.username}}</a>
													</strong>
													<div class="video-socail">
														<span>{{(new Date(post.created)).toLocaleString()}}</span>

														<div class="video-socail-main">
															<social-sharing
																:url="to_share.url"
																:title="to_share.title"
																v-cloak
																inline-template @open="onShare">
																<div class="video-socail-inner">
																	<ul>
																		<li>
																			<a href="javascript:void(0)">
																				<network network="facebook">
																					<i class="fab fa-facebook-f"></i>
																				</network>
																			</a>
																		</li>
																		<li>
																			<a href="javascript:void(0)">
																				<network network="twitter">
																					<i class="fab fa-twitter"></i>
																				</network>
																			</a>
																		</li>
																	</ul>
																</div>
															</social-sharing>
															<div class="balance-scale" v-if="us_politics">
																<a href="javascript:void(0)" :class="{'democrat-back':post.donkey > post.elephant, 'republican-back':post.elephant > post.donkey}">
																	<i class="fas"
																				:class="{'fa-democrat':post.donkey>post.elephant, 'fa-republican':post.elephant>post.donkey, 'fa-balance-scale-right':post.elephant==post.donkey}"></i>
																</a>
															</div>
														</div>
													</div>
													<div class="text-inner" v-html="decodeURIComponent(post.body)">
													</div>
												</div>
												<div class="detail-like-strip">
													<ul>
														<li :class="{'active': up}">
															<a href="javascript:void(0)" @click="onLike">
																<i class="fal fa-thumbs-up unactive"></i>
																<i class="fas fa-thumbs-up active"></i>
																<span>upvote</span>
															</a>
														</li>
														<li :class="{'active': down}">
															<a href="javascript:void(0)" @click="onDislike">
																<i class="fal fa-thumbs-down unactive"></i>
																<i class="fas fa-thumbs-down active"></i>
																<span>downvote</span>
															</a>
														</li>
													</ul>
													<ul>
														<li class="dropdown">
															<a href="#" id="dd-share" data-toggle="dropdown">
																<i class="fal fa-share unactive"></i>
																<i class="fas fa-share active"></i>
															</a>
															<div class="dropdown-menu dd-share-expanded" aria-labelledby="dd-share">
																<!-- <a class="dropdown-item" href="javascript:void(0)">inappropriate content</a> -->
																<social-sharing
																:url="to_share.url"
																:title="to_share.title"
																v-cloak
																inline-template>
																	<ul class="ul-social-share-dd">
																		<li>
																			<a href="javascript:void(0)">
																				<network network="facebook">
																					<i class="fab fa-facebook-f"></i>
																				</network>
																			</a>
																		</li>
																		<li>
																			<a href="javascript:void(0)">
																				<network network="twitter">
																					<i class="fab fa-twitter"></i>
																				</network>
																			</a>
																		</li>
																	</ul>
																</social-sharing>
															</div>
														</li>
														<li class="dropdown">
															<a class="dots-icon" href="#" id="dd-politics" data-toggle="dropdown">
																<i class="fal fa-ellipsis-h-alt unactive"></i>
																<i class="fas fa-ellipsis-h active"></i>
															</a>
															<div class="dropdown-menu" aria-labelledby="dd-politics">
																<a class="dropdown-item" href="javascript:void(0)" @click="onPoliticalBias">Political Bias</a>
																<span v-on:click.capture="report">
																	<a class="dropdown-item" :href="'mailto:' + company_email + '?Subject=Report Inappropriate Content'">inappropriate content</a>
																</span>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<!-- Related posts -->
									<div class="no-pd-rt page-detail-colum-small">
										<div class="content">
											<div class="video-detail-right scrollbar-outer">
												<div class="title">
													<span>Related posts</span>
												</div>

												<div class="video-upnext" v-for="p in related" :key="p.id">
													<div class="video-upnext-box">
														<router-link :to="'/detail/'+p.id">
															<h3>
																<span>{{decodeURIComponent(p.title)}}</span>
															</h3>
														</router-link>
														<div class="d-flex">
															<div class="image-holder">
																<router-link :to="'/detail/'+p.id">
																	<img class="img-fluid" :src="p.img_thumb_small || p.avatar"/>
																</router-link>
															</div>
															<div class="text-box">
																<router-link :to="'/detail/'+p.id">
																	<span><img class="user-pic" :src="p.avatar" alt="">{{p.username}}</span>
																</router-link>
																<p>{{getUpvotes(p)}} upvotes </p>
																<router-link :to="'/detail/'+p.id" class="pro-text">
																	{{extractContent(decodeURIComponent(p.body))}}
																</router-link>
															</div>
														</div>

													</div>
												</div>

												<a href="javascript:void(0)" class="btn-load">Load more</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script>
import axios from '../net/axios';
import tools from '../helpers/helpers';
import CONF from '../config/config';

export default {
	name: 'Detail',
	data() {
		return {
			company_email: CONF.companyEmail,
			post: null,
			related: [],
			up: false,
			down: false,
			likes: [],
			dislikes: [],
			donkey: false,
			elephant: false,
			donkeys: [],
			elephants: [],
			clicked_politics: false,
			reported_politics: false,
			to_share: {
				url: '',
				title: '',
				desc: '',
			}
		}
	},
	created() {
		const pid = this.$route.params.id;
//		this.to_share.url = CONF.prod.apiBase + '/detail/' + pid;
		this.to_share.url = window.location.href;
		let visited = !!localStorage.visited ? localStorage.visited.split(',') : [];
		if (visited.indexOf(pid.toString())<0) {
			visited.push(pid);
			axios.incTrends(pid, 'views');
			localStorage.visited = visited.join(',');
		}
		this.loadPost(pid);
	},
	watch: {
		'$route.params.id': function (id) {
			this.loadPost(id);
		}
	},
	computed: {
		us_politics: function() {
			return (this.post.main_topic=='Politics' && this.post.location=='US') || this.reported_politics;
		}
	},
	methods: {
		getUpvotes(p) {
			return p.likes - p.dislikes>0 ? p.likes - p.dislikes : 0;
		},
		loadPost(pid) {
			axios.getPost(pid).then(p => {
				var span = document.createElement('span');
				span.innerHTML = decodeURIComponent(p.data.body);
				this.to_share.title = decodeURIComponent(p.data.title);
				this.to_share.desc = (span.textContent || span.innerText);
				document.querySelector('title').innerText = this.to_share.title;

				this.post = p.data;
				this.reported_politics = this.post.donkey !== this.post.elephant;
				console.log('current post', this.post);
				axios.getRelatedPosts(this.post.main_topic).then(rows => {
					this.related = rows.data;
					this.related.sort((a, b) => (b.likes-b.dislikes)-(a.likes-a.dislikes));
					$('.scrollbar-outer').scrollbar();
				});
			});
		},
		onPoliticalBias() {
			this.reported_politics = true;
		},
		onLeftPanelScroll() {
			if (this.us_politics && !this.clicked_politics) {
				const y = this.$refs.leftPanel.scrollTop;
				if (y > 0) {
					$('.video-detail-republic').addClass('active');
				} else {
					$('.video-detail-republic').removeClass('active');
					$('.video-detail-republic').removeClass('hide');
				}
			}
		},
		extractContent(s) {
			return tools.extractContent(s);
		},
		onLeftPanelMouseOver() {
			if (this.us_politics && !this.clicked_politics) {
				const y = this.$refs.leftPanel.scrollTop;
				$('.video-detail-republic').addClass('active');
			}
		},
		onLeftPanelMouseOut() {
			if(this.us_politics && !this.clicked_politics) {
				$('.video-detail-republic').removeClass('active');
				$('.video-detail-republic').removeClass('hide');
			}
		},
		updateLsUpDown() {
			const likeIndex = this.likes.indexOf(this.post.id);
			const dislikeIndex = this.dislikes.indexOf(this.post.id);
			if (this.up && likeIndex<0) {
				this.likes.push(this.post.id);
				axios.incTrends(this.post.id, 'up');
			}
			if (!this.up && likeIndex>-1) {
				this.likes.splice(likeIndex, 1);
				axios.decTrends(this.post.id, 'up');
			}
			if (this.down && dislikeIndex<0) {
				this.dislikes.push(this.post.id);
				axios.incTrends(this.post.id, 'down');
			}
			if (!this.down && dislikeIndex>-1) {
				this.dislikes.splice(dislikeIndex, 1);
				axios.decTrends(this.post.id, 'down');
			}
			localStorage.likes = this.likes.join(',');
			localStorage.dislikes = this.dislikes.join(',');
		},
		onLike() {
			this.up = !this.up;
			this.down = false;
			this.updateLsUpDown();
		},
		onDislike() {
			this.down = !this.down;
			this.up = false;
			this.updateLsUpDown();
		},
		updateLsPolitics() {
			const donkeyIndex = this.donkeys.indexOf(this.post.id);
			const elephantIndex = this.elephants.indexOf(this.post.id);
			if (this.donkey && donkeyIndex<0) {
				this.donkeys.push(this.post.id);
				axios.incTrends(this.post.id, 'donkey');
			}
			if (!this.donkey && donkeyIndex>-1) {
				this.donkeys.splice(donkeyIndex, 1);
				axios.decTrends(this.post.id, 'donkey');
			}
			if (this.elephant && elephantIndex<0) {
				this.elephants.push(this.post.id);
				axios.incTrends(this.post.id, 'elephant');
			}
			if (!this.elephant && elephantIndex>-1) {
				this.elephants.splice(elephantIndex, 1);
				axios.decTrends(this.post.id, 'elephant');
			}
			localStorage.donkeys = this.donkeys.join(',');
			localStorage.elephants = this.elephants.join(',');
		},
		onDonkey() {
			this.donkey = !this.donkey;
			this.elephant = false;
			this.clicked_politics = true;
			this.updateLsPolitics();
		},
		onElephant() {
			this.elephant = !this.elephant;
			this.donkey = false;
			this.clicked_politics = true;
			this.updateLsPolitics();
		},
		onShare() {
			let shared = !!localStorage.shared ? localStorage.shared.split(',').map(s => parseInt(s)) : [];
			if (shared.indexOf(this.post.id) < 0) {
				axios.incTrends(this.post.id, 'shared');
				shared.push(this.post.id);
				localStorage.shared = shared.join(',');
			}
		},
		report() {
			let reported = !!localStorage.reported ? localStorage.reported.split(',').map(r => parseInt(r)) : [];
			if (reported.indexOf(this.post.id) < 0) {
				reported.push(this.post.id);
				localStorage.reported = reported.join(',');
			}
		}
	}
}
</script>

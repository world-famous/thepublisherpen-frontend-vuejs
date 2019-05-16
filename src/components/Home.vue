<template>
	<section class="page-manager">
		<div class="container-fluid">
			<div class="page-manager-inner">

				<div class="page-contant-box">
					<h3 v-if="author_view==0">Recommended</h3>
					<div class="profile-head" v-if="!!profile">
						<div class="page-manager-inner">
							<div class="container-fluid">
								<div class="pen-profile">
									<div class="profile-head">
										<div class="profile-head-box">
											<div class="image-holder">
												<img :src="profile.avatar" alt="" />
												<!--<div class="profile-came">-->
													<!--<a href="#">-->
														<!--<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g viewBox="0 0 24 24" class="style-scope yt-icon">-->
														<!--<circle cx="12" cy="12" r="3.2" class="style-scope yt-icon"></circle>-->
														<!--<path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" class="style-scope yt-icon"></path>-->
														<!--<path d="M0 0h24v24H0z" fill="none" class="style-scope yt-icon"></path>-->
														<!--</g></svg>-->
													<!--</a>-->
												<!--</div>-->
											</div>
											<div class="text-box">
												<h3>{{profile.username}}</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--<hr/>-->
					<div class="recommend-sec clearfix">
						<div class="recommend-box recommend-margin" v-for="p in filtered" :key="p.id">
							<div class="recommend-box-inner">
								<div class="image-holder">
									<router-link :to="'/detail/'+p.id"><img :src="p.img_thumb_small || p.avatar" /></router-link>
									<div class="donkey-elephant" v-if="p.donkey !== p.elephant">
										<ul>
											<li>
												<a href="javascript:void(0)" :class="{'democrat-back':p.donkey > p.elephant, 'republican-back':p.elephant > p.donkey}">
													<i class="fas"
													:class="{'fa-democrat':p.donkey > p.elephant, 'fa-republican':p.elephant > p.donkey}">
													</i>
												</a>
											</li>
										</ul>
									</div>
									<div class="like-dislike">
										<ul>
											<li :class="{'active': likes.indexOf(p.id)>-1}">
												<a href="#" @click="onLike(p.id)">
													<i class="fas fa-thumbs-up"></i>
												</a>
											</li>
											<li :class="{'active': dislikes.indexOf(p.id)>-1}">
												<a href="#" @click="onDislike(p.id)">
													<i class="fas fa-thumbs-up"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="text-box">
									<h4>
										<router-link :to="'/detail/'+p.id">
											<span>{{decodeURIComponent(p.title)}}</span>
											<strong class="dots-img">
												<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon">
												<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" class="style-scope yt-icon"></path>
												</g>
												</svg>
											</strong>
										</router-link>
									</h4>
									<p><a href="javascript:void(0)"  @click="onClickAuthor(p)"><img :src="p.avatar" /><span>{{p.username}}</span></a></p>
									<span class="channel-view"><a href="javascript:void(0)">{{p.likes - p.dislikes>0 ? p.likes - p.dislikes : 0}} upvotes <strong>|</strong> {{getHoursDiff(p.created)}} ago</a></span>
									<router-link :to="'/detail/'+p.id" class="pro-text">
										{{extractContent(decodeURIComponent(p.body))}}
									</router-link>
								</div>
							</div>
						</div>

						<!-- <div class="see-more">
							<a href="#">show more</a>
						</div> -->
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

export default {
  name: 'Home',
  data() {
	  return {
		  posts: [],
		  likes: [],
		  dislikes: [],
		  visited: [],
		  donkeys: [],
		  elephants: [],
		  reported: [],
		  author_view: 0,
		  profile: null
	  }
  },
  computed: {
	...mapState([
		'category',
		'sub_category',
		'location',
		'search_key',
		'user',
		'trend',
		'like_only',
		'history_view',
		'reported_only'
	]),
	filtered: function() {
		let filtered = this.posts.filter(p => p.is_shown);
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
			const search_decision = p => (decodeURIComponent(p.title).toLowerCase().indexOf(sk)>-1 || this.extractContent(decodeURIComponent(p.body)).toLowerCase().indexOf(sk)>-1);
			filtered = filtered.filter(p => search_decision(p));
		}
		if (this.like_only) {
			filtered = filtered.filter(p => this.likes.indexOf(p.id)>-1);
		}
		if (this.history_view) {
			filtered = filtered.filter(p => this.visited.indexOf(p.id)>-1);
		}
		if (this.reported_only) {
			filtered = filtered.filter(p => this.reported.indexOf(p.id)>-1);
		}
		if (this.author_view > 0) {
			filtered = filtered.filter(p => p.author==this.author_view);
		}
		if (this.trend == 'hot') {
			filtered.sort((a, b) => (b.likes-b.dislikes)-(a.likes-a.dislikes));
		}
		if (this.trend == 'new') {
			filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
		}
		if (this.trend == 'controversial') {
			filtered = filtered.filter(p => p.location=='US' && p.main_topic=='Politics');
			filtered.sort((a, b) => Math.abs(b.donkey-b.elephant) - Math.abs(a.donkey-a.elephant));
		}
		return filtered;
	}
  },
  mounted() {
	document.querySelector('title').innerText = 'PUBLISHER PEN';
	axios.getAllPosts().then(rows => {
		this.posts = rows.data;
		console.log('all posts =>', this.posts);
	});
	this.likes = !!localStorage.likes ? localStorage.likes.split(',').map(l => parseInt(l)) : [];
	this.dislikes = !!localStorage.dislikes ? localStorage.dislikes.split(',').map(d => parseInt(d)) : [];
	this.visited = !!localStorage.visited ? localStorage.visited.split(',').map(v => parseInt(v)) : [];
	this.donkeys = !!localStorage.donkeys ? localStorage.donkeys.split(',').map(d => parseInt(d)) : [];
	this.elephants = !!localStorage.elephants ? localStorage.elephants.split(',').map(e => parseInt(e)) : [];
	this.reported = !!localStorage.reported ? localStorage.reported.split(',').map(r => parseInt(r)) : [];
  },
  methods: {
	extractContent(s) {
		return tools.extractContent(s);
	},
	getHoursDiff(t) {
		return tools.getHoursDiff(t);
	},
	onLike(pid) {
		const likeIndex = this.likes.indexOf(pid);
		if (likeIndex >-1) {
			this.likes.splice(likeIndex, 1);
			axios.decTrends(pid, 'up');
		} else {
			const dislikeIndex = this.dislikes.indexOf(pid);
			if (dislikeIndex > -1) {
				this.dislikes.splice(dislikeIndex, 1);
				axios.decTrends(pid, 'down');
			}
			this.likes.push(pid);
			axios.incTrends(pid, 'up');
		}
		localStorage.likes = this.likes.join(',');
		localStorage.dislikes = this.dislikes.join(',');
	},
	onDislike(pid) {
		const dislikeIndex = this.dislikes.indexOf(pid);
		if (dislikeIndex >-1) {
			this.dislikes.splice(dislikeIndex, 1);
			axios.decTrends(pid, 'down');
		} else {
			const likeIndex = this.likes.indexOf(pid);
			if (likeIndex > -1) {
				this.likes.splice(likeIndex, 1);
				axios.decTrends(pid, 'up');
			}
			this.dislikes.push(pid);
			axios.incTrends(pid, 'down');
		}
		localStorage.likes = this.likes.join(',');
		localStorage.dislikes = this.dislikes.join(',');
	},
	onDonkey(pid) {
		const donkeyIndex = this.donkeys.indexOf(pid);
		if (donkeyIndex >-1) {
			this.donkeys.splice(donkeyIndex, 1);
			axios.decTrends(pid, 'donkey');
		} else {
			const elephantIndex = this.elephants.indexOf(pid);
			if (elephantIndex > -1) {
				this.elephants.splice(elephantIndex, 1);
				axios.decTrends(pid, 'elephant');
			}
			this.donkeys.push(pid);
			axios.incTrends(pid, 'donkey');
		}
		localStorage.donkeys = this.donkeys.join(',');
		localStorage.elephants = this.elephants.join(',');
	},
	onElephant(pid) {
		const elephantIndex = this.elephants.indexOf(pid);
		if (elephantIndex >-1) {
			this.elephants.splice(elephantIndex, 1);
			axios.decTrends(pid, 'elephant');
		} else {
			const donkeyIndex = this.donkeys.indexOf(pid);
			if (donkeyIndex > -1) {
				this.donkeys.splice(donkeyIndex, 1);
				axios.decTrends(pid, 'donkey');
			}
			this.elephants.push(pid);
			axios.incTrends(pid, 'elephant');
		}
		localStorage.donkeys = this.donkeys.join(',');
		localStorage.elephants = this.elephants.join(',');
	},
	onClickAuthor(p) {
		this.author_view = p.author;
		this.profile = {
			username: p.username,
			avatar: p.avatar
		}
	}
  }
}
</script>

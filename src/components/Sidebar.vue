<template>
	<div class="content">
		<div class="right-menu scrollbar-outer">
			<div class="header-masthead-login mobile-version">
				<ul class="clearfix">
					<li><a href="#" data-toggle="modal" data-target="#exampleModal">Login</a></li>
					<li class="active" data-toggle="modal" data-target="#exampleModal"><a href="#">Sign up</a></li>
				</ul>
			</div>
			<div class="guide-section-renderer pt-0">
				<ul>
					<!-- <li :class="{'active': $route.name==='Home'}"> -->
					<li>
						<a href="/">
							<i class="fas fa-home"></i>
							<span>Home</span>
						</a>
					</li>
					<li :class="{'active': trend==='new'}">
						<a href="javascript:void(0)" @click="onClickTrend('new')">
							<i class="fal fa-chart-line"></i>
							<span>New</span>
						</a>
					</li>
					<li :class="{'active': trend==='hot'}">
						<a href="javascript:void(0)" @click="onClickTrend('hot')">
							<i class="fas fa-fire"></i>
							<span>Hot</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="guide-section-renderer">
				<ul>
					<li :class="{'active': history_view}" v-on:click.capture="TOGGLE_HISTORY_VIEW">
						<router-link to="/">
							<i class="fas fa-history"></i>
							<span>History</span>
						</router-link>
					</li> 
					<li :class="{'active': like_only}" v-on:click.capture="TOGGLE_LIKE_ONLY">
						<router-link to="/">
							<i class="fas fa-heart"></i>
							<span>liked articles</span>
						</router-link>
					</li>
					<li>
						<router-link to="/profile" v-if="!!user">
							<i class="fas fa-file-alt"></i>
							<span>my articles </span>
						</router-link>
						<a href="#" data-toggle="modal" data-target="#modal-auth" v-if="!user">
							<i class="fas fa-file-alt"></i>
							<span>my articles </span>
						</a>
					</li>
					<li>
						<a href="#" data-toggle="modal" :data-target="!user?'#modal-auth':'#modal-new-post'">
							<i class="far fa-edit"></i>
							<span>Create </span>
						</a>
					</li>
				</ul>
			</div> 
			<div class="guide-section-renderer" v-if="!!category">
				<h3>SUBTOPICS</h3>
				<ul class="ul-subtopic">
					<li v-for="s in sub_topics" :key="s" :class="{'active': sub_category==s}">
						<a href="javascript:void(0)" @click="SET_SUB_CATEGORY(s)">
							<span>{{s}}</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0)" @click="onViewMore" v-if="show_view_more">
							<i class="fas" :class="{'fa-plus-circle': !view_more, 'fa-minus-circle': view_more}"></i>
							<span> view {{ view_more ? 'less' : 'more' }}</span>
						</a>
					</li> 
				</ul>
			</div> 
			<div class="guide-section-renderer"> 
				<ul>

					<li :class="{'active': reported_only}" v-on:click.capture="TOGGLE_REPORTED_ONLY">
						<router-link to="/">
							<i class="far fa-file-alt"></i>
							<span>Report history</span>
						</router-link>
					</li> 
					<li>
						<a :href="'mailto:' + company_email + '?Subject=Help'" target="_top">
							<i class="fas fa-info-circle"></i>
							<span>Help</span>
						</a>
					</li> 
					<li>
						<a :href="'mailto:' + company_email + '?Subject=Send Feedback'" target="_top">
							<i class="fas fa-comment-alt"></i>
							<span>Send feedback</span>
						</a>
					</li> 
				</ul>
			</div>

			<!-- <div class="side-bar-navigation">
				<div class="guide-links-primary">
					<ul class="clearfix">
						<li><a href="#">About</a></li>
						<li><a href="#">Press</a></li>
						<li><a href="#">Contact us</a></li>
						<li><a href="#">Terms</a></li>
						<li><a href="#">Privacy</a></li>
						<li><a href="#">Policy & Safety</a></li>
					</ul>
				</div>
			</div>  -->
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CONF from '../config/config';

export default {
  name: 'Sidebar',
  data () {
    return {
		company_email: CONF.companyEmail,
		view_more: false
    }
  },
  mounted() {
	$('.scrollbar-outer').scrollbar();
  },
  computed: {
	...mapState([
		'category',
		'sub_category',
		'user',
		'trend',
		'like_only',
		'history_view',
		'reported_only'
	]),
	sub_topics: function() {
		if (!!this.category) {
			let sub = this.categories.find(c => c.name===this.category).sub;
			if (this.view_more === false)
				sub = sub.slice(0, 3);
			return sub;
		} else {
			return [];
		}
	},
	show_view_more: function() {
		return this.categories.find(c => c.name===this.category).sub.length>3;
	}
  },
  props: [
	  'categories'
  ],
  methods: {
	  ...mapMutations([
		  'SET_SUB_CATEGORY',
		  'SET_TREND',
		  'TOGGLE_LIKE_ONLY',
		  'TOGGLE_HISTORY_VIEW',
		  'TOGGLE_REPORTED_ONLY'
	  ]),
	  onClickTrend(trend) {
		this.SET_TREND(trend);
		this.$router.push({ name: 'Home' });
	  },
	  onViewMore() {
		this.view_more = !this.view_more;
	  }
  }
}
</script>

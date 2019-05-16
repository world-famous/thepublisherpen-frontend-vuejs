<template>
	<div id="app">
		<div class="wrapper">
			<head-bar></head-bar>
			<nav-bar :categories="categories"></nav-bar>
			<router-view/>
			<side-bar :categories="categories"></side-bar>
			<auth-modal></auth-modal>
			<new-post :categories="categories"></new-post>
		</div>
	</div>
</template>

<script>
	import Header from './components/Header'
	import Nav from './components/Nav'
	import Sidebar from './components/Sidebar'
	import AuthModal from './components/AuthModal'
	import NewPost from './components/NewPost'

	import axios from './net/axios.js'

	export default {
		name: 'App',
		components: {
			'head-bar': Header,
			'nav-bar': Nav,
			'side-bar': Sidebar,
			'auth-modal': AuthModal,
			'new-post': NewPost
		},
		data() {
			return {
				categories: []
			}
		},
		mounted() {
			if (this.$auth.isAuthenticated()) {
				this.$store.state.user = {
					id: localStorage.uid,
					social_id: localStorage.social_id,
					username: localStorage.username,
					avatar: localStorage.avatar
				};
			}
			axios.getCategories().then(resp => {
				this.categories = resp.data;
			});
		}
	}
</script>

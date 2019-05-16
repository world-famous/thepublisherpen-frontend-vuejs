<template>
	<header class="header">
		<div class="header-inner d-flex justify-content-between">
			<div class="header-logo">
				<a href="/">
					<img class="img-fluid" src="../assets/images/logo.png" alt="" />
				</a>
			</div>
			<div class="header-search">
				<form>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Search" @input="onSearch" ref="search"/>
						<a class="search-button" @click="onSearch" href="javascript:void(0)">
							<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon">
							<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" class="style-scope yt-icon"></path>
							</g>
							</svg>
						</a>
					</div>
				</form>
			</div>
			<div class="header-masthead">
				<div class="header-masthead-login dasktop-version" v-if="!user">
					<ul class="clearfix">
						<li><a href="#" data-toggle="modal" data-target="#modal-auth">Login</a></li>
						<li class="active"><a href="#"  data-toggle="modal" data-target="#modal-auth">Sign up</a></li>
					</ul>
				</div>
				<div class="header-masthead-left dasktop-version">
					<ul>
						<li>
							<a href="#"  data-toggle="modal" :data-target="!user?'#modal-auth':'#modal-new-post'">
								<i class="fal fa-edit"></i>
							</a>
						</li>
					</ul>
				</div>
				<div class="header-masthead-right">
					<ul>
						<li class="user-profile" :class="{'d-sm-block d-md-none':!user}">
							<a class="dropdown-toggle" href="#" id="dd-profile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<i class="fal fa-user" v-if="!user"></i>
								<img :src="user.avatar" v-if="!!user" class="header-user"/>
							</a>
							<div class="dropdown-menu" aria-labelledby="dd-profile" v-if="!user">
								<a href="#" class="dropdown-item" data-toggle="modal" data-target="#modal-auth">Login</a>
								<a href="#" class="dropdown-item" data-toggle="modal" data-target="#modal-auth">Sign up</a>
							</div>
							<div class="dropdown-menu" aria-labelledby="dd-profile" v-if="!!user">
								<router-link to="/profile" class="dropdown-item"><i class="fal fa-user"></i> Profile</router-link>
								<a href="javascript:void(0)" @click="onLogout" class="dropdown-item"><i class="fal fa-sign-out"></i> Logout</a>
							</div>
						</li>
						<!--<li class="user-profile" v-if="!!user">-->
							<!--<router-link to="/profile"><i class="fal fa-user"></i></router-link>-->
							<!--<a href="#" @click="onLogout"><i class="fal fa-sign-out"></i></a>-->
						<!--</li>-->
						<li class="menu-toggle">
							<a href="javascript:void(0)">
								<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon">
								<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" class="style-scope yt-icon"></path>
								</g></svg>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Header',
  data () {
    return {

    }
  },
  computed: {
	...mapState([
		'user',
		'search_key'
	]),
  },
  methods: {
	...mapMutations([
		'SET_USER',
		'SET_SEARCH_KEY'
	]),
	onLogout(){
		if (this.$auth.isAuthenticated()) {
			this.$auth.logout()
			this.SET_USER(null)
			let dropdown = document.getElementById("user-profile-dropdown");
			dropdown.classList.remove("show");
		}
	},
	onSearch() {
		this.SET_SEARCH_KEY(this.$refs.search.value);
	}
  }
}
</script>

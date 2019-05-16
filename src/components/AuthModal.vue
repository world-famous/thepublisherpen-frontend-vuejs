<template>
	<div class="account-steps-modal signup-modal">
		<div class="modal fade" id="modal-auth" tabindex="-1" role="dialog" aria-labelledby="modal-new-postTitle" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content"> 
					<div class="modal-header">
						<h1>Sign Up</h1>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div> 
					<div class="modal-body">
						<div class="login-modal">
							<div class="login-title">
								<div class="image-holder">
									<img src="../assets/images/letter-icon.svg" alt="" />
								</div>
								<div class="text-box">
									<p>You are on your way to writing and publishing your own articles!</p>
								</div>
							</div>
							<div class="login-or">
								<span></span>
							</div>
							<div class="socail-buttons">
								<ul>
									<li>
										<a href="#" @click="authenticate('facebook')"><span><i class="fab fa-facebook-f"></i></span> sign in with facebook</a>
									</li>
									<li><a href="#" @click="authenticate('twitter')"><span><i class="fab fa-twitter"></i></span> sign in with twitter</a></li>
								</ul>
							</div>
						</div>   
					</div> 
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from '../net/axios'

export default {
  name: 'AuthModal',
  data () {
    return {
		access_token: null,
    }
  },
  methods: {
	...mapMutations([
		'SET_USER'
	]),
    authenticate: function (provider) {
		if (this.$auth.isAuthenticated()) {
			this.$auth.logout()
			console.log('logged out')
		}
		
		this.$auth.authenticate(provider)
		.then(authResponse => {
			console.log('auth response from '+provider, authResponse);
			if (provider === 'facebook') {
				this.$http.get('https://graph.facebook.com/v2.5/me?fields=name,first_name,last_name,email,gender,location,locale,work,languages,birthday,relationship_status,hometown,picture', {
					params: { access_token: this.$auth.getToken() }
				}).then(response => {
					console.log('facebook post response', response);
					const user = {
						social_id: response.data.id,
						username: response.data.name,
						email: response.data.email,
						avatar: 'http://graph.facebook.com/'+response.data.id+'/picture?type=large'
					};
					axios.addOrUpdateUser(user).then(sr => {
						if (sr.status === 200) {
							user.id= sr.data;
							this.SET_USER(user);
							$('#modal-auth').modal('hide');
						}
					});
				});
			} else if (provider === 'twitter') {
				const response = authResponse.data.profile;
				const user = {
					social_id: response.id,
					username: response.name,
					email: response.email,
					avatar: response.profile_image_url_https
				};
				axios.addOrUpdateUser(user).then(sr => {
					if (sr.status === 200) {
						user.id= sr.data;
						this.SET_USER(user);
						$('#modal-auth').modal('hide');
					}
				});
			}
		}).catch(function (err) {
			console.log('error while oauth, ', err);
		});
    }
  }
}
</script>

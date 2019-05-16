<template>
	<div class="account-steps-modal">
		<div class="modal fade" id="modal-new-post" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="modal-new-postTitle"
							aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h1>Create post</h1>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body account-steps-page">
						<div id="smartwizard" class="smartwizard">
							<ul class="smartwizard-list">
								<li><a href="#step-draft"></a></li>
								<li><a href="#step-preview"></a></li>
							</ul>
							<div>
								<div id="step-draft" class="step-draft">

									<div class="page-smartwizard-wizard2">
										<div class="Create-post-categories">
											<ul>
												<li class="dropdown">
													<a href="#" class="dropdown-toggle" id="dd-main-topic" data-toggle="dropdown">{{ main_topic_name }}</a>
													<div class="dropdown-menu" aria-labelledby="dd-main-topic">
														<a class="dropdown-item" href="javascript:void(0)" v-for="c in categories" :key="c.id"
																	@click="onClickMainTopic(c.id)">{{c.name}}</a>
													</div>
												</li>
												<li class="dropdown">
													<a href="#" class="dropdown-toggle" id="dd-subtopic" data-toggle="dropdown">{{ sub_topic_name}}</a>
													<div class="dropdown-menu" aria-labelledby="dd-subtopic">
														<a class="dropdown-item" href="javascript:void(0)" v-for="s in sub_topics" :key="s" @click="onClickSubTopic(s)">{{ s }}</a>
													</div>
												</li>
											</ul>
										</div>
										<div class="select-subject">
											<form>
												<div class="form-group">
													<input type="text" class="form-control" placeholder="title" v-model="title"/>
												</div>
												<div class="form-group area-scroll">
													<img id="post-thumb" style="display:none"/>
													<div id="post-content" contenteditable="true" placeholder="Submit 500 word (or more)"
																		@input="onChangeContent"></div>
												</div>
											</form>
											<div class="d-flex">
												<div class="upload-photo">
													<label class="upload"> <img src="../assets/images/pictures.svg"/><span>upload thumbnail</span>
														<input type="file" ref="thumb" @change="onThumbChange" accept="image/*">
													</label>
												</div>
												<div class="upload-photo">
													<label class="upload"><img src="../assets/images/add-icon.svg"/><span>add more</span>
														<input type="file" ref="more" @change="onMoreFileChange" accept="audio/*,video/*,image/*">
													</label>
												</div>
											</div>
										</div>
									</div>
									<div class="cancle-buttons d-flex justify-content-end">
										<ul class="d-flex">
											<!--<li> <button class="btn-secondry sw-btn-prev btn-next">BACK</button></li>-->
											<li>
												<button
													class="submit-btn sw-btn-next btn-next"
													@click="onNext"
													:disabled="!nextable"
												>
													NEXT
												</button>
											</li>
										</ul>
									</div>
								</div>
								<div id="step-preview" class="step-preview">
									<div class="page-smartwizard-inner">
										<div class="content">
											<div class="video-detail-left scrollbar-outer">
												<h3>{{ title }}</h3>
												<div class="image-holder">
													<img class="img-fluid" :src="thumb_url"/>
												</div>
												<div class="text-box">
													<p class="title-text">
														{{title}}
													</p>
													<strong v-if="!!user">
														<img class="user-pic" :src="user.avatar" alt="">
														<span>{{user.username}}</span>
													</strong>
													<div class="video-socail">
														<span>{{ getToday }}</span>
														<div class="video-socail-main">
															<div class="video-socail-inner">
																<ul>
																	<li>
																		<a href="javascript:void(0)">
																			<i class="fab fa-facebook-f"></i>
																		</a>
																	</li>
																	<li>
																		<a href="javascript:void(0)">
																			<i class="fab fa-twitter"></i>
																		</a>
																	</li>
																	<li>
																		<a href="javascript:void(0)">
																			<i class="fal fa-balance-scale-right"></i>
																		</a>
																	</li>
																</ul>
															</div>
															<div class="video-socail-inner2">
																<ul>
																	<a href="javascript:void(0)">
																		<i class="fal fa-bookmark"></i>
																	</a>
																</ul>
															</div>
														</div>
													</div>
													<div class="text-inner" id="preview-content">
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="cancle-buttons d-flex justify-content-end">
										<ul class="d-flex">
											<li>
												<button class="btn-secondry sw-btn-prev btn-next">BACK</button>
											</li>
											<li><a class="submit-btn btn-next" href="javascript:void(0)" @click="onPublish">Publish</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="fileUploading" class="container-loading">
						<img src="../assets/gif/loading.gif" alt="Loading Icon">
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import axios from '@/net/axios'
	import tools from '../helpers/helpers'
	import { mapState } from 'vuex';

	export default {
		name: 'NewPost',
		props: [
			'categories'
		],
		computed: {
			...mapState([
				'user'
			]),
			getToday: function() {
				return tools.getDmy(new Date());
			},
			nextable: function() {
				return this.title.trim().length>0 && this.enough_content && this.main_topic_id>0 && this.sub_topic_name!='subtopic';
			}
		},
		data() {
			return {
				main_topic_id: 0,
				sub_topic_id: 0,
				main_topic_name: 'main topic',
				sub_topic_name: 'subtopic',
				sub_topics: [],
				title: '',
				enough_content: false,
				thumb_url: '',
				thumb_small_url: '',
				fileUploading: false,
				label: "Uploading...",
				overlay: true,
			}
		},
		mounted() {
			$('.scrollbar-outer').scrollbar();
			$('#smartwizard').smartWizard({
				selected: 0,
				theme: 'default',
				transitionEffect: 'fade',
				showStepURLhash: false,
				toolbarSettings: {toolbarPosition: 'both',
				toolbarButtonPosition: 'end'
				}
			});
		},
		methods: {
			onClickMainTopic(category_id) {
				this.main_topic_id = category_id;
				const main_topic = this.categories.find(c => c.id === category_id);
				this.main_topic_name = main_topic.name;
				this.sub_topics = main_topic.sub;
				this.sub_topic_name = 'subtopic';
			},
			onClickSubTopic(sub_topic) {
				this.sub_topic_name = sub_topic;
			},
			onThumbChange() {
				if(typeof this.$refs.thumb.files[0] == 'undefined') {
					return;
				}
				this.fileUploading = true;
				axios.uploadFile(this.$refs.thumb.files[0], 'thumb')
					.then(resp => {
						this.fileUploading = false;
						console.log('Thumb file upload success!', resp);
						if (resp.status === 200) {
							// tools.addMediaToDiv('post-content', resp.data.type, resp.data.url);
							const post_thumb = document.getElementById('post-thumb');
							post_thumb.style.display = 'block';
							post_thumb.src = resp.data.url;
							this.thumb_url = resp.data.url;
							this.thumb_small_url = resp.data.thumbUrl;
						}
					}).catch(function (err) {
					console.log('Thumb file upload failure!', err);
				});
			},
			onMoreFileChange() {
				if(typeof this.$refs.more.files[0] == 'undefined') {
					return;
				}
				this.fileUploading = true;
				axios.uploadFile(this.$refs.more.files[0], 'mores')
					.then(resp => {
						this.fileUploading = false;
						console.log('Thumb file upload success!', resp);
						if (resp.status === 200) {
							tools.addMediaToDiv('post-content', resp.data.type, resp.data.url);
						}
					}).catch(function (err) {
					console.log('Thumb file upload failure!', err);
				});
			},
			onChangeContent() {
				const word_count = document.getElementById('post-content').innerText.trim().replace(/[\s]+/g, " ").split(" ").length;
				if (word_count > 3) {
					this.enough_content = true;
				} else {
					this.enough_content = false;
				}
			},
			onNext() {
				const post_content = document.getElementById('post-content').innerHTML;
				document.getElementById('preview-content').innerHTML = post_content;
			},
			onPublish() {
				let post = {
					author: this.$store.state.user.id,
					main_topic: this.main_topic_name,
					sub_topic: this.sub_topic_name,
					title: encodeURIComponent(this.title).replace(/'/g, "\\'"),
					img_thumb: this.thumb_url,
					img_thumb_small: this.thumb_small_url,
					body: encodeURIComponent(document.getElementById('preview-content').innerHTML).replace(/'/g, "\\'")
				}
				axios.getVisitorCountry()
					.then(addrInfo => {
							post.location = addrInfo.countryCode;
							axios.newPost(post).then(sr => {
								if (sr.status === 200) {
									console.log('new post id', sr.data);
									document.location.href = '/';
								}
							});
						}
					);
			}
		}
	}
</script>

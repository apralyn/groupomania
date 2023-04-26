<template>
	<PageNav />
	<div class="media-query"></div>
	<div class="profile-initials">
		<p class="initials">{{ getUser.initials }}</p>
	</div>
	<h2> {{ getUser.username }}</h2>
	<div class="profile-btns">
		<button class="edit-btn" @click=" onDeleteUser(userId) ">Delete Profile</button>
		<button class="edit-btn" @click=" onLogout ">Logout</button>
	</div>
	<button class="back-btn" @click=" $router.push('/feed') ">Back</button>
</template>

<script>
import axios from 'axios'
import PageNav from '@/components/PageNav.vue'

export default {
	name: 'ProfileView',
	data() {
		return {
			token: '',
			userId: '',
			getUser: '',
		}
	},
	components: {
		PageNav
	},
	beforeCreate() {
		if (!localStorage.getItem('token')) {
			this.$router.push('/login');
		}
	},
	async created() {
		//auth
		const user = JSON.parse(localStorage.getItem('token'));
		this.userId = user.userId;
		this.token = user.token;
		//headers
		const headers = {
			'Authorization': `Bearer ${this.token}`,
			'Content-Type': 'application/json'
		}
		//api
		await axios.get(`api/auth/${this.userId}`, { headers })
			.then((response) => {
				this.getUser = response.data;
				response.status;
			})
			.catch((error) => {
				error.message;
			});
	},
	methods: {
		async onDeleteUser(userId) {
			if (confirm("Do you want to delete your profile?")) {
				await axios.delete('/api/auth/' + userId, {
					headers: {
						'Authorization': `Bearer ${this.token.token}`,
						'Content-Type': 'application/json'
					}
				});
				localStorage.removeItem('token');
				this.$router.push('/');
			}
		},
		onLogout() {
			localStorage.removeItem('token');
			this.$router.push('/');
			console.log('You have been logged out!');
		}
	}
}
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 250px;
	margin: 5px auto;
}

.profile-btns {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 50px auto;
}

.edit-btn {
	text-align: center;
	width: 250px;
	height: 50px;
	margin: 15px auto;
	border: 4px solid #fd2d01;
	background-color: #fd2d01;
	border-radius: 10px;
	color: white;
}

.back-btn {
	width: 250px;
	height: 50px;
	margin: 15px auto;
	border: 4px solid #fd2d01;
	background-color: #fd2d01;
	border-radius: 10px;
	color: white;
}

.profile-initials {
	background-color: #ffd7d7;
	border-radius: 50%;
	height: 250px;
	width: 250px;
	margin: 50px auto;
	position: relative;
}

.initials {
	font-size: 125px;
	font-style: oblique;
	color: white;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 20%;
}

/* desktop */
@media screen and (min-width: 769px) {
	.media-query {
    border: 1px solid #ffd7d7;
    margin-bottom: 50px;
  }
	.profile-btns {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 50px auto;
}
}

/* mobile */
@media screen and (max-width: 768px) {
  .media-query {
    border: 1px solid #ffd7d7;
    margin-bottom: 50px;
  }
}
</style>
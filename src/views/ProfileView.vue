<template>
	<PageNav />
	<div class="media-query"></div>
	<div class="profile-initials">
		<p class="initials">{{ getUser.initials }}</p>
	</div>
	<h2> {{ getUser.username }}</h2>
	<!-- edit profile -->
	<div class="edit-profile" @submit.prevent="onSave">
		<form v-if="edit">
			<input type="text" name="username" v-model="user.username" :placeholder="getUser.username">
			<input type="text" name="initials" v-model="user.initials" :placeholder="getUser.initials">
			<p>{{ this.errorMessage }}</p>
			<button>Save</button>
		</form>
		<button class="edit-btn" @click="this.edit = !this.edit;">Edit Profile</button>
	</div>
	<!-- delete || logout || back -->
	<div class="profile-btns">
		<button class="edit-btn" @click=" onDeleteUser(userId) ">Delete Profile</button>
		<button class="edit-btn" @click=" onLogout ">Logout</button>
		<button class="back-btn" @click=" $router.push('/feed') ">Back</button>
	</div>
</template>

<script>
import axios from 'axios'
import PageNav from '@/components/PageNav.vue'

export default {
	name: 'ProfileView',
	data() {
		return {
			user: {
				username: '',
				initials: '',
			},
			token: '',
			userId: '',
			userProfile: [],
			edit: false,
			error: '',
			getUser: '',
			errorMessage: '',

		}
	},
	components: {
		PageNav
	},
	beforeCreate() {
		//secure frontend for when no user is logged in. 
		//no one can access any of the routes without being logged-in.
		if (!localStorage.getItem('token')) {
			this.$router.push('/login');
		}
	},
	async created() {
		//get user from the database
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
		onFileSelected(event) {
			this.user.image = event.target.files[0];
		},
		async onSave(userId) {
			if (this.user.username === '' || this.user.image === null) {
				return this.errorMessage = "Please try again.";
			}
			//TODO use axios.put when the user change the username/image
			const user = {
				username: this.user.username,
			}
			await axios.put('/api/auth/' + userId, user, {
				headers: {
					'Authorization': `Bearer ${this.token.token}`,
					'Content-Type': 'application/json'
				}
			});
		},
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
	margin: auto;
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
/* for desktop */
@media screen and (min-width: 900px) {
  .media-query {
    border: 4px solid #fd2d01;
  }
}
/* for mobile the max viewing is 480px */
@media screen and (max-width: 480px) {
  .media-query {
    border: 4px solid black;
  }
}
</style>
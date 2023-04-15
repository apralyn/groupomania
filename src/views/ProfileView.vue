<template>
	<div class="profile-nav">
		<img id="profile-icon" alt="Groupomania logo" src="../assets/icon.png">
		<p class="feed" @click="$router.push('/feed')">Feed</p>
	</div>
	<div>{{ userId }}</div>
	<div> {{ user.image }} </div>
	<div> {{ user.username }}</div>
	<div @submit.prevent="onSave" class="edit-profile">
		<form v-show="edit">
			<input type="text" name="username" v-model="user.username" placeholder="username">
			<label for="image"><input type="file" @change="onFileChange"></label>
			<button>Save</button>
		</form>
		<button class="add-info" @click="toggleEdit()">edit profile</button>
	</div>
	<button @click="onDeleteUser(userId)">Delete Profile</button>
	<div @click="onLogout">Logout</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ProfileView',
	data() {
		return {
			token: '',
			userId: '',
			user: {
				username: '',
				image: null
			},
			userProfile: [],
			error: '',
			edit: 'false'
		}
	},
	mounted() {
		if (localStorage.getItem("token")) {
			this.token = JSON.parse(localStorage.getItem("token"));
		}
		this.userId = this.token.userId;
		console.log(this.userId);
		this.userInfo();
	},
	methods: {
		toggleEdit() {
			this.edit = !this.edit;
		},
		userInfo() {
			if (!this.user.username === '' || !this.user.image === null) {
				return this.error = 'Please add your username and profile picture';
			}
		},
		onSave() {
			if (!this.user.username === '' || !this.user.image === null) {
				this.userProfile.push('this.user.username', 'this.user.image');
			} else {
			this.user.username  = '',
			this.user.image = null;
			console.log('not working!');
		}
		},
		async onDeleteUser(userId) {
			if (confirm("Do you want to delete your profile?")) {
				const response = await axios.delete('/api/auth/' + userId, {
					headers: {
						'Authorization': `Bearer ${this.token.token}`,
						'Content-Type': 'application/json'
					}
				})
				console.log(response)
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
.profile-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 450px;
	height: 100px;
	margin: 80px auto;
	padding: 0 15px;
}

#profile-icon {
	width: 50px;
}

.user-info {
	border: 1px solid black;
	width: 450px;
	margin: auto;
}
</style>
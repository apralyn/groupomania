<template>
	<PageNav />
	<div> {{ user.image }} </div>
	<div> {{ user.username }}</div>
	<div @submit.prevent="onSave" class="edit-profile">
		<form v-show="edit">
			<input type="text" name="username" v-model="user.username" placeholder="username">
			<label for="image"><input type="file" @change="onFileChange"></label>
			<button class="save-btn">Save</button>
		</form>
		<button class="add-info" @click="toggleEdit()">edit profile</button>
	</div>
	<div class="profile-btns">
		<button @click="onDeleteUser(userId)">Delete Profile</button>
		<button @click="onLogout">Logout</button>
		<button><router-link to="/feed">back</router-link></button>
	</div>
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
			user: {
				username: '',
				image: null
			},
			userProfile: [],
			error: '',
			edit: 'true',
		}
	},
	components: {
		PageNav
	},
	mounted() {
		const user = JSON.parse(localStorage.getItem('token'));
		this.userId = user.userId;
		this.token = user.token;

		this.userInfo();
	},
	methods: {
		userInfo() {
			if (!this.user.username === '' || !this.user.image === null) {
				return this.error = 'Please add your username and profile picture';
			}
		},
		toggleEdit() {
			this.edit = !this.edit;
		},
		onSave() {
			if (!this.user.username === '' || !this.user.image === null) {
				this.userProfile.push('this.user.username', 'this.user.image');
			} else {
				this.user.username = '',
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
form {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 250px;
	margin: auto;
	border: 1px solid black;
}

.profile-btns {
	display: flex;
	flex-direction: column;
	width: 150px;
	margin: auto;
}
</style>
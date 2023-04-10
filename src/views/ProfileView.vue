<template>
	<div class="nav-feed-link">
		<img id="profile-icon" alt="Groupomania logo" src="../assets/icon.png">
		<p class="feed" @click="$router.push('/feed')">Feed</p>
	</div>
	<div class="user-info">
		<div>hello, user#{{ userId }}</div>
		<button @click="onDeleteUser(userId)">Delete Profile</button>
		<div @click="onLogout">Logout</div>
	</div>
</template>
<script>
import axios from 'axios'

export default {
	name: 'ProfileView',
	data() {
		return {
			token: '',
			userId: '',
		}
	},
	mounted() {
		if (localStorage.getItem("token")) {
			this.token = JSON.parse(localStorage.getItem("token"));
		}
		this.userId = this.token.userId;
		console.log(this.userId);
	},
	methods: {

		async onDeleteUser(userId) {
			console.log(this.token.token);
			const response = await axios.delete('/api/auth/' + userId, {
				headers: {
					'Authorization': `Bearer ${this.token.token}`,
					'Content-Type': 'application/json'
				}
			})
			console.log(response)
			localStorage.removeItem('token');
			this.$router.push('/');
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
.profile-container {
	border: 2px solid #fd2d01;
	width: 450px;
	height: 550px;
	padding: 5px;
	margin: 80px auto;
	border: 1px solid #ffd7d7;
	border-radius: 10px;
}

.profile {
	display: flex;
	flex-direction: column;
}

#profile-icon {
	width: 50px;
}

nav {
	padding: 0;
}

.nav-feed-link {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

#nav-menu {
	display: flex;
	margin-right: auto;
	justify-content: space-between;
	align-items: center;
}

li {
	display: inline;
	flex-direction: row;
	list-style-type: none;
	margin: 10px;
	cursor: pointer;

}

#profile-image {
	max-width: 250px;
	height: 250px;
	padding: 25px;
	margin: auto;
	border: 1px solid black;
	background-color: #ffd7d7;
}

#profile-pic-holder {
	border: 1px solid black;
	max-width: 250px;
	max-height: 550px;
	padding: 60px 50px 50px 50px;
	margin: 25px 20px;
}

.profile-bio {
	text-align: center;
	margin: auto;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.user-btn {
	width: 250px;
	height: 40px;
	border: 3px solid white;
}
</style>
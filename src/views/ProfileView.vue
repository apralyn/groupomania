<template>
	<div class="profile-container">
		<nav id="nav-menu">
			<div class="nav-feed-link">
				<img id="profile-icon" alt="Groupomania logo" src="../assets/icon.png">
				<p class="feed" @click="$router.push('/feed')">Feed</p>
			</div>
			<ul class="nav-items">
				<li>Edit Profile</li>
				<li @click="$router.push('/')">Logout</li>
			</ul>
		</nav>
		<div id="profile-image">
			<div id="profile-pic-holder">Profile Pic</div>
		</div>
		<div class="profile-bio">
			<span>Hello {{ userId }}</span>
			<p>You are not logged in.</p>
			<p>About Me</p>
			<p>Posts:</p>
		</div>
		<button @click="toggleModal" class="delete-btn">Delete</button>
		<Modal @cancel="toggleModal" :modalActive="modalActive">
			<div class="modal-content">
				<button class="delete-btn" @click="handleDelete">Confirm</button>
			</div>
		</Modal>
	</div>
</template>
<script>
import Modal from '@/components/PopupModal.vue'
import { ref } from 'vue'

export default {
	name: 'ProfileView',
	data() {
		return {

			id: this.$route.params.id,
			token: '',
			userId: ''
		}
	},
	mounted() {
		if (localStorage.getItem("token")) {
			this.token = JSON.parse(localStorage.getItem("token"));
		}
		this.userId = this.token.userId;
	},		
	components: {
		Modal,
	},
	setup() {
		const modalActive = ref(false);
		const toggleModal = () => {
			modalActive.value = !modalActive.value;
		}
		return {
			modalActive, toggleModal
		}
	}
}
</script>

<style scoped>
.profile-container {
	border: 2px solid #fd2d01;
	margin: auto;
	padding: 15px;
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
	text-align: left;
	padding-right: auto;
}

.delete-btn {
	width: 250px;
	height: 40px;
	border: 3px solid white;
}
</style>
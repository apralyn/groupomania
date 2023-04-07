<template>
	<div class="profile-container">
		<nav id="nav-menu">
			<div class="nav-feed-link">
				<img id="profile-icon" alt="Groupomania logo" src="../assets/icon.png">
				<p class="feed" @click="$router.push('/feed')">Feed</p>
			</div>
			<div @click="onLogout">Logout</div>
		</nav>
		<div class="profile">
			<div>{{ UDname }}</div>
			<input type="text" v-model="UDname" @input="handleInput" placeholder="Change your display name">
			<div>
				<div class="row">
					<div>
						<h1>Upload Image</h1>
					</div>
					<div>
						<form>
							<div class="form-group">
								<label for="my-file">Select Image</label>
								<input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file">

								<div>
									<p>Preview Here:</p>
									<template v-if="preview">
										<img :src="preview" class="img-fluid" />
										<p class="mb-0">file name: {{ image.name }}</p>
										<p class="mb-0">size: {{ image.size / 1024 }}KB</p>
									</template>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- <div id="profile-image">
			<div id="profile-pic-holder">Profile Pic</div>
		</div> -->

		<!-- <button v-on:click="showEditBtn" class="user-btn">{{ showEdit }}</button>
		<EditProfile>
			<span>{{ userId }}</span>
			<span>Posts:</span>
		</EditProfile>

		<button @click="toggleModal" class="user-btn">Delete</button>
		<Modal @cancel="toggleModal" :modalActive="modalActive">
			<div class="modal-content">
				<button class="delete-btn" @click="handleDelete">Confirm</button>
			</div>
		</Modal> -->
	</div>
</template>
<script>
// import Modal from '@/components/PopupModal.vue'
// import EditProfile from '@/components/EditProfile.vue'
import { ref } from 'vue'


export default {
	name: 'ProfileView',
	data() {
		return {
			token: '',
			userId: '',
			showEdit: false,
			UDname: '',
			preview: null,
			image: null,
			preview_list: [],
			image_list: []
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
		onLogout() {
			localStorage.removeItem('token');
			this.$router.push('/');
			console.log('You have been logged out!');
		},
		showEditBtn() {
			this.showEdit = true;
		},
		previewImage(event) {
			var input = event.target;
			if (input.files) {
				var reader = new FileReader();
				reader.onload = (e) => {
					this.preview = e.target.result;
				}
				this.image = input.files[0];
				reader.readAsDataURL(input.files[0]);
			}
		},
    handleInput(event) {
			const name = event.target.value
			this.UDname = name; 
    },
	},
	// components: {
	// 	Modal, EditProfile
	// },
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
	/* margin: auto; */
	/* padding: 15px; */
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
<template>
  <Transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div class="modal-inner">
          <!-- Modal Content -->
          <slot />
          <button @click="cancel" type="button" class="cancel-btn">Cancel</button>
          <p>Select confirm to delete your profile.</p>
        </div>
      </transition>
    </div>
  </Transition>
</template>
<script>
export default {
  props: ["modalActive"],
  setup(props, {emit}) {
    const cancel = () => {
      emit("cancel");
    }
    return {cancel}; 
  }
};
</script>
<style>
.cancel-btn {
	width: 250px;
	height: 40px;
	border: 3px solid white;
}
</style>
<template>
  <Transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div class="modal-inner">
          <!-- Modal Content -->
          <slot />
          <button @click="cancel" type="button">Cancel</button>
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
<style></style>
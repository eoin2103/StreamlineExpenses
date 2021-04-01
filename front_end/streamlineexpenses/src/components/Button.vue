<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>

<style scoped>
  .btn {
    width: 100%;
    margin: 10px auto;
    overflow: auto;
    padding: 10px;
    border-radius: 1rem;
  }
</style>
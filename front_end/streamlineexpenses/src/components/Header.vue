<template>
  <header>
    <h1><i class="fas fa-calculator"></i>{{ title }}</h1>
  </header>
</template>

<script>

export default {
  name: "Header",
  props: ["title",],
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.fas {
  color: #297ed8;
}
</style>
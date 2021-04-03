<template>
  <tbody>
    <User
      v-for="(user, index) in users"
      :key="user._id"
      @update="$emit('update', user._id)"
      @udelete="$emit('udelete', user._id)"
      :user="user"
      :index="index"
    />
  </tbody>
</template>

<script>
import User from "./User";

export default {
  name: "Users",
  props: {
    users: Array,
  },
  components: {
    User,
  },
  emits: ["udelete", "update"],
};
</script>

<style>
</style>
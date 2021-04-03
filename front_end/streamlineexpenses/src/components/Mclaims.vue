<template>
  <div>
    <Mclaim
      v-for="(claim, index) in claims"
      :key="claim._id"
      @approve="$emit('approve', claim._id)"
      @deny="$emit('deny', claim._id)"
      :claim="claim"
      :index="index"
    />
  </div>
</template>

<script>
import Mclaim from "./Mclaim";

export default {
  name: "Mclaims",
  props: {
    claims: Array,
  },
  components: {
    Mclaim,
  },
  emits: ["claim-delete", "toggle-status"],
};
</script>
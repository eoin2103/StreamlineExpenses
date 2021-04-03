<template>
  <div>
    <br />
    <div class="claim">
      <!--@dblclick="$emit('toggle-status')"-->
      <h3>
        {{ claim.title }}
      </h3>
      <p><b>Description: </b> {{ claim.description }}</p>
      <p><b>Amount: </b>€{{ claim.amount }}</p>
      <p><b>Date: </b>{{ formatDate(claim.date) }}</p>
      <p><b>Status: </b>{{ claim.status }}</p>
      <img class="thumbnail" :src="getImgUrl(claim.evidence)" />
      <br />
      <button class="btn btn-success" @click="$emit('approve')">Approve</button>
      <button class="btn btn-danger" @click="$emit('deny')">Deny</button>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Mclaim",
  props: {
    claim: Object,
    index: Number,
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    getImgUrl(evidence) {
      var images = evidence;
      return images;
    },
    formatDate(datestr) {
      let date = new Date(datestr);
      return date.toLocaleString();
    },
  },
};
</script>

<style scope>
.thumbnail {
  width: 50%;
  border-radius: 1rem;
  margin-bottom: 10px;
  border: 2px solid rgb(77, 75, 75);
}
.expanded {
  width: 100%;
  border-radius: 3px;
}
.fas {
  color: black;
}
.claim {
  background: white;
  margin: 5px;
  padding: 30px 50px;
  border-radius: 1rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}
.claim h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@media screen and (max-width: 1200px) {
  .thumbnail {
    width: 100%;
  }
}
</style>
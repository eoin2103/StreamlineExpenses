<template>
  <div class="claim">
    <!--@dblclick="$emit('toggle-status')"-->
    <h3>
      {{ claim.title }}
      <i @click="$emit('claim-delete')" class="fas fa-times"></i>
    </h3>
    <p><b>Description: </b> {{ claim.description }}</p>
    <p><b>Amount: </b>€{{ claim.amount }}</p>
    <p><b>Date: </b>{{ formatDate(claim.date) }}</p>
    <div data-toggle="modal" :data-target="`#${claim._id}`">
      <img class="thumbnail" :src="getImgUrl(claim.evidence)" />
      <br />
    </div>
    <div>
      <div class="modal fade" :id="claim._id">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">
                <b>{{ claim.title }}</b>
              </h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <img class="expanded" :src="getImgUrl(claim.evidence)" />
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Claim",
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
  cursor: zoom-in;
  margin-bottom: 10px;
  border: 2px solid rgb(77, 75, 75);
}
.expanded {
  width: 100%;
  border-radius: 3px;
}
.fas {
  color: red;
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
</style>
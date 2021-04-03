<template>
  <form @submit="onSubmit" class="add-form" novalidate>
    <div class="form-control">
      <label>Claim Title</label>
      <input
        type="text"
        v-model="title"
        name="title"
        placeholder="Add title for claim"
      />
      <label>Amount</label>
      <input
        type="text"
        v-model="amount"
        name="amount"
        placeholder="Add Claim Ammount"
      />
      <br />
      <br />
      <div class="custom-file mb-3">
        <input
          type="file"
          class="custom-file-input"
          id="file"
          ref="file"
          name="filename"
          v-on:change="onFileUpload()"
        />
        <label class="custom-file-label" for="file">Evidence Upload</label>
      </div>
      <label>Day & Time</label>
      <input
        type="datetime-local"
        v-model="date"
        name="date"
        placeholder="Add Day & Time"
        required
      />
      <label>Description</label>
      <textarea
        v-model="description"
        name="description"
        placeholder="Add Description"
        cols="80"
        rows="5"
      ></textarea>
    </div>

    <input type="submit" value="Add Claim" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddClaim",
  data() {
    return {
      title: " ",
      description: " ",
      amount: " ",
      date: " ",
      evidence: null,
      userID: " ",
      status: " ",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.title) {
        alert("Please add a title to the claim");
        return;
      }

      if (!this.amount) {
        alert("please enter an amount for the claim");
        return;
      }

      if (!this.date) {
        alert("please include the date this charge was incurred");
        return;
      }

      const status = "unapproved"

      const newClaim = {
        title: this.title,
        description: this.description,
        amount: this.amount,
        date: this.date,
        evidence: this.file,
        userID: localStorage.getItem("uid"),
        status: status
      };

      this.$emit("add-claim", newClaim);

      this.title = "";
      this.description = "";
      this.amount = "";
      this.date = "";
      this.file = "";
    },
    onFileUpload() {
      console.log("uploading...");
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
  },
};
</script>




<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
  border: none;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border-radius: 4px;
}
.form-control textarea {
  width: 100%;
  height: 100px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border-radius: 4px;
}
.fa-cloud-upload-alt {
  color: white;
}
/* input[type="file"] {
    display: none;
} */
.custom-file-upload {
  background-color: #297ed8;
  border: 2px solid #297ed8;
  color: white;
  cursor: pointer;
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border-radius: 4px;
}
.btn-block {
  background-color: green;
}
</style>
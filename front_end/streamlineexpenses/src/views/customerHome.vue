<template>
  <div>
    <div class="logout" @click="logOut()">Log out</div>
    <div class="hcontainer">
      <Header title=" Streamline Expenses" />
      <hr class="my-4" />
      <h2>Submitted Claims:</h2>
      <Claims
        @toggle-status="toggleStatus"
        @claim-delete="deleteClaim"
        :claims="employeeClaims"
      />
      <hr class="my-4" />
      <Button
        @btn-click="toggleForm"
        :text="showAddClaims ? 'Close Form' : 'Add New Claim'"
        :color="showAddClaims ? '#eb4034' : '#297ED8'"
      />
      <div v-show="showAddClaims">
        <AddClaim @add-claim="addClaim" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Header from "../components/Header";
import Claims from "../components/Claims";
import AddClaim from "../components/AddClaim";
import axios from "axios";
import Button from "../components/Button";

export default {
  name: "App",
  components: {
    Header,
    Claims,
    AddClaim,
    Button,
  },
  data() {
    return {
      claims: [],
      showAddClaims: false,
      show: false,
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("usertype");
      localStorage.removeItem("uid");
      this.$router.push("/login");
    },
    toggleForm() {
      this.showAddClaims = !this.showAddClaims;
    },
    async addClaim(claim) {
      console.log(claim);
      const fd = new FormData();
      fd.append("title", claim.title);
      fd.append("description", claim.description);
      fd.append("amount", claim.amount);
      fd.append("date", claim.date);
      fd.append("evidence", claim.evidence, claim.evidence.name);
      fd.append("userID", claim.userID);
      fd.append("status", claim.status);
      await axios({
        method: "post",
        url: "api/claims/addnew",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-jwt": localStorage.getItem("token"),
        },
      });

      // const data = JSON.parse(fd);
      // this.claims = [...this.claims, data];
      await this.fetchClaims();
    },
    async deleteClaim(id) {
      if (confirm("Are you sure ?")) {
        const res = await axios({
          method: "delete",
          url: `api/claims/${id}`,
          headers: { "auth-jwt": localStorage.getItem("token") },
        });

        res.status === 200
          ? (this.claims = this.claims.filter((claim) => claim._id !== id))
          : alert("Error Claim delete failed");
      }
    },
    async fetchClaims() {
      const uid = await localStorage.getItem("uid");
      await axios({
        method: "get",
        url: `api/claims/${uid}`,
        headers: { "auth-jwt": localStorage.getItem("token") },
      }).then((response) => {
        console.log(response);
        this.claims = response.data;
      });
    },

    async fetchClaim(id) {
      await axios({
        method: "get",
        url: `api/claims/${id}`,
        headers: { "auth-jwt": localStorage.getItem("token") },
      }).then((response) => {
        const data = response.data;
        return data;
      });
    },
  },
  computed: {
    employeeClaims() {
      return this.claims;
    },
  },
  async created() {
    await this.fetchClaims();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
  background: #0051bb;
  background: linear-gradient(to right, #0051bb, #65baf3);
}
.hcontainer {
  background: #dfe7f0;
  max-width: 800px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  padding: 30px;
  border-radius: 1rem;
  -webkit-box-shadow: 11px 18px 65px 6px rgba(0, 0, 0, 0.64);
  -moz-box-shadow: 11px 18px 65px 6px rgba(0, 0, 0, 0.64);
  box-shadow: 11px 18px 65px 6px rgba(0, 0, 0, 0.64);
}
h1 {
  font-size: 2vw;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
@media screen and (max-width: 1200px) {
  h1 {
    font-size: 5vw;
    width: 100%;
    margin-left: 10px;
    margin-right: 0;
  }
}
/* Portrait */
@media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
  h1 {
    font-size: 6vw;
  }
}
/* Portrait */
@media only screen and (min-width: 280px) and (max-height: 653px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
  h1 {
    font-size: 6.5vw;
  }
}
h2 {
  font-size: 1.5vw;
}
@media screen and (max-width: 1200px) {
  h2 {
    font-size: 5vw;
    width: 100%;
    margin-left: 10px;
    margin-right: 0;
  }
}
/* Portrait */
@media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
  h2 {
    font-size: 5vw;
  }
}
/* Portrait */
@media only screen and (min-width: 280px) and (max-height: 653px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
  h2 {
    font-size: 6.5vw;
  }
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 1rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
.logout {
  top: 0;
  right: 0;
  position: fixed;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 1rem;
  cursor: pointer;
  margin: 10px 10px 0 40px;
  -webkit-box-shadow: 11px 18px 65px 6px rgba(0, 0, 0, 0.64);
  -moz-box-shadow: 11px 18px 65px 6px rgba(0, 0, 0, 0.64);
  box-shadow: 11px 18px 65px 6px rgba(0, 0, 0, 0.64);
}
.logout:hover {
  background-color: rgb(0, 0, 0);
  color: #fff;
}
@media screen and (max-width: 1200px) {
  .logout {
    background-color: #000;
    color: #fff;
  }
}
</style>

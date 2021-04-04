<template>
  <div>
    <div class="logout" @click="logOut()">Log out</div>
    <div class="tcontainer">
      <Header title=" Streamline Expenses" />
      <hr class="my-4" />
      <h2>User list</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
          <Users :users="users" @update="update" @udelete="udelete" />
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Header from "../components/Header";
import Users from "../components/Users";
import axios from "axios";

export default {
  name: "adminHome",
  components: {
    Header,
    Users,
  },
  data() {
    return {
      users: [],
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
    async fetchClaims() {
      await axios({
        method: "get",
        url: `http://streamlineexpenses.tech:3000/api/user/`,
        headers: { "auth-jwt": localStorage.getItem("token") },
      }).then((response) => {
        console.log(response);
        this.users = response.data;
      });
    },
    async udelete(id) {
      if (confirm("Are you sure ?")) {
        const res = await axios({
          method: "delete",
          url: `http://streamlineexpenses.tech:3000/api/user/${id}`,
          headers: { "auth-jwt": localStorage.getItem("token") },
        });
        

        res.status === 200
          ? (this.users = this.users.filter((user) => user._id !== id))
          : alert("Error User delete failed");
      }
    },
  },
    async created() {
    await this.fetchClaims();
  },
};
</script>

<style>
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
.tcontainer {
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
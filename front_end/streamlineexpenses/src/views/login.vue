<template>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">
                <i class="fas fa-calculator"></i> Streamline Expenses
              </h5>
              <form class="form-signin">
                <div class="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    v-model="email"
                    placeholder="Email address"
                    autofocus
                  />
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                  />
                  <label for="inputPassword">Password</label>
                </div>
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  @click="login"
                >
                  Sign in
                </button>
              </form>
              <hr />
              <div class="form-signin">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  data-toggle="modal"
                  data-target="#elegantModalForm"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="elegantModalForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <!--Content-->
          <div class="modal-content form-elegant">
            <!--Header-->
            <div class="modal-header text-center">
              <h3
                class="modal-title w-100 dark-grey-text my-3"
                id="myModalLabel"
              >
                Register
              </h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <!--Body-->
            <div class="modal-body mx-4">
              <!--Body-->
              <div class="md-form pb-4">
                <label data-error="wrong" data-success="right" for="Form-name"
                  >Full Name</label
                >
                <input
                  type="text"
                  name="name"
                  class="form-control validate"
                  v-model="nname"
                />
              </div>
              <div class="md-form pb-4">
                <label data-error="wrong" data-success="right" for="Form-email1"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  class="form-control validate"
                  v-model="nemail"
                />
              </div>

              <div class="md-form pb-3">
                <label data-error="wrong" data-success="right" for="Form-pass1"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  class="form-control validate"
                  v-model="npassword"
                />
              </div>

              <div class="text-center mb-3">
                <button
                  type="submit"
                  class="btn btn-block btn-rounded z-depth-1a register"
                  data-dismiss="modal"
                  @click="addUser"
                >
                  Sign up
                </button>
              </div>
            </div>
            <!--Footer-->
            <div class="modal-footer mx-5 pt-3 mb-1"></div>
          </div>
          <!--/.Content-->
        </div>
      </div>
    </div>
  </body>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();

      const loginAttempt = {
        email: this.email,
        password: this.password,
      };
      console.log(loginAttempt);

      this.email = "";
      this.password = "";

      await axios({
        method: "post",
        url: "http://streamlineexpenses.tech:3000/api/user/login",
        data: loginAttempt,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(response);
        localStorage.uid = response.data._doc._id;
        localStorage.username = response.data._doc.name;
        localStorage.usertype = response.data._doc.usertype;
        localStorage.token = response.data.jwt;
      });

      await this.logincheck();
    },
    logincheck() {
      if (localStorage.token != null && localStorage.usertype == "employee") {
        this.$router.push("/customerHome");
      } else if (
        localStorage.token != null &&
        localStorage.usertype == "manager"
      ) {
        this.$router.push("/manager");
      } else if (
        localStorage.token != null &&
        localStorage.usertype == "admin"
      ) {
        this.$router.push("/admin");
      } else {
        console.log("Not logged in please try again");
      }
    },
    async addUser(e) {
      e.preventDefault();

      const newUser = {
        name: this.nname,
        email: this.nemail,
        password: this.npassword,
      };

      console.log(newUser);

      this.nname = "";
      this.nemail = "";
      this.npassword = "";

      await axios({
        method: "post",
        url: "http://streamlineexpenses.tech:3000/api/user/register",
        data: newUser,
        headers: { "Content-Type": "application/json" },
      });
    },
  },
};
</script>

<style >
.fas {
  color: black;
}
.container {
  background: none;
}
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}

.register {
  background: linear-gradient(to right, #0062e6, #33aeff);
  color: #fff;
  border-radius: 1rem;
}
</style>
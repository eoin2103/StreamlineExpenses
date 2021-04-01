<template>
  <div class="app-content">
  <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Header from "./components/Header";
import Claims from "./components/Claims";
import AddClaim from "./components/AddClaim";
import axios from "axios";
import Button from "./components/Button";

export default {
  name: "App",

}
</script>

<style>
.app-content {
 margin-top: 30px;
}

</style>


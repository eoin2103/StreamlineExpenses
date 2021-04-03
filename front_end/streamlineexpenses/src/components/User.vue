<template>
    <tr>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
      <td>{{user.usertype}}</td>
      <td>
        <button type="button" class="btn btn-success" @click="$emit('update')">
          <i class="fas fa-edit" style="color: white"></i>
        </button>
        <button type="button" class="btn btn-danger" @click="$emit('udelete')">
          <i class="far fa-trash-alt"></i>
        </button>
      </td>
    </tr>
</template>

<script>
export default {
    name: 'User',
    props: {
        user: Object,
        index: Number,
    }
}
</script>

<style>

</style>
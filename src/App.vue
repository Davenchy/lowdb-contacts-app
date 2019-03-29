<template>
  <div class="ui container">
    <div class="ui hidden divider"></div>
    <h1 class="ui center aligned icon header">
      <i class="users icon"></i>
      Contacts
    </h1>
    <div class="ui divider"></div>
    <build-form/>
    <div class="ui hidden divider"></div>
    <users-list/>
  </div>
</template>

<script>
import BuildForm from "./components/BuildForm.vue";
import UsersList from "./components/UsersList.vue";

export default {
  components: {
    BuildForm,
    UsersList
  },
  created() {
    this.$store.dispatch('fetchDB');
  }
};
</script>

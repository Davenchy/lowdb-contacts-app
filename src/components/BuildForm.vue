<template>
  <div class="container">
    <div class="ui attached message">
      <h2>Add User</h2>
    </div>
    <form @submit.prevent class="ui form attached fluid segment">
      <div></div>
      <div class="ui fluid labeled input field">
        <div class="ui label">
          <i class="user icon"></i> Name
        </div>
        <input type="name" v-model="user.name" ref="name">
      </div>
      <div class="ui fluid labeled input field">
        <div class="ui label">
          <i class="mail icon"></i> Email
        </div>
        <input type="email" v-model="user.email" ref="email">
      </div>
      <div class="ui fluid labeled input field">
        <div class="ui label">
          <i class="phone icon"></i> Phone Number
        </div>
        <input type="phone" v-model="user.phone" ref="phone">
      </div>
      <button class="ui red right floated button" v-show="isUpdating" @click="cancel">
        <i class="close icon"></i>
        close
      </button>
      <button class="ui button right floated" :class="isUpdating ? 'green' : 'blue'" @click="save">
        <i :class="`${isUpdating?'save':'add'} icon`"></i>
        {{saveButton}}
      </button>
      <div class="ui clearing hidden divider"></div>
    </form>
    <div class="ui attached message red" v-show="errors.length">
      <h4>Errors</h4>
      <p v-for="(error, index) in errors" :key="index">{{error}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      errors: [],
      defaultUser: {
        name: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    ...mapMutations(["endUpdating"]),
    save() {
      const { name, email, phone } = this.$refs;

      this.errors = [];
      if (!name.value.trim()) this.errors.push("please enter user name");
      if (!email.value.trim()) this.errors.push("please enter email");
      if (!phone.value.trim()) this.errors.push("please enter phone number");

      if (this.errors.length) return;
      if (this.isUpdating) this.$store.dispatch("updateUser");
      else {
        this.addUser(this.user);
        this.defaultUser = {
          name: "",
          email: "",
          phone: ""
        };
      }
    },
    cancel() {
      if (this.isUpdating) this.endUpdating();
    }
  },
  computed: {
    ...mapGetters(["isUpdating", "userToUpdate"]),
    ...mapState({ updateUser: "user" }),
    user() {
      if (this.isUpdating) return this.userToUpdate;
      return this.defaultUser;
    },
    saveButton() {
      return this.isUpdating ? "update" : "save";
    }
  }
};
</script>

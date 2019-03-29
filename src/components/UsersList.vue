<template>
  <div>
    <div class="ui horizontal divider">Users</div>
    <div class="ui piled segment">
      <table class="ui blue single line center aligned  table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.phone}}</td>
            <!-- <td class="selectable">
              <a href="javascript:void(0)" @click="update(user.id)">Edit</a>
            </td> -->
            <td class="right aligned">
              <button class="ui icon blue button" @click="update(user.id)">
                <i class="edit icon"></i>
              </button>
              <button class="ui icon red button" @click="remove(user.id)">
                <i class="trash icon"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  methods: {
    ...mapMutations(["startUpdating"]),
    ...mapActions(["removeUser"]),
    remove(id) {
      this.removeUser(id);
    },
    update(id) {
      this.startUpdating(id);
    }
  },
  computed: {
    ...mapState(["users"])
  }
};
</script>

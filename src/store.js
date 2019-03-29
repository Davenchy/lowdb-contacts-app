import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid";
import db from "./database";

Vue.use(Vuex);

const users = db.get("users");

export default new Vuex.Store({
  state: {
    index: -1,
    users: []
  },
  getters: {
    isUpdating: ({ index }) => index !== -1,
    userToUpdate: ({ index, users }) => users[index] || undefined
  },
  mutations: {
    addUser({ users }, user) {
      users.push(user);
    },
    removeUser({ users }, id) {
      const i = users.findIndex(u => u.id === id);
      if (i === -1) return;
      users.splice(i, 1);
    },
    endUpdating(state) {
      state.index = -1;
    },
    startUpdating(state, id) {
      const i = state.users.findIndex(u => u.id === id);
      if (i !== -1) state.index = i;
    },
    setUsers(state, users) {
      users.forEach(u => {
        const i = state.users.findIndex(us => us.id === u.id);
        if (i === -1) state.users.push(u);
      });
    }
  },
  actions: {
    fetchDB({ commit }) {
      commit("setUsers", users.value());
    },
    addUser({ commit, state }, user) {
      const newUser = { ...user, id: uuid() };
      users.push(newUser).write();
      commit("addUser", newUser);
    },
    removeUser({ commit, state }, id) {
      const i = users.findIndex(u => u.id === id);
      if (i === -1) return;
      users.splice(i, 1).write();
      commit("removeUser", id);
    },
    updateUser({ commit, state }) {
      const user = state.users[state.index];
      users
        .map(u => {
          if (u.id === user.id) return user;
        })
        .write();
      commit("endUpdating");
    }
  }
});

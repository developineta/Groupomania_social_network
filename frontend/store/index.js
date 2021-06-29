// Le gestionnaire d'état Vuex une bibliothèque tant que zone de stockage de données centralisée pour les autres composants d'application

import Vue from 'vue';
import Vuex from 'vuex';                 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionUserId : null,
    adminUser : false
  },
  mutations: {
    SET_USER_ID(state, user){
      state.sessionUserId = user
    },
    SET_ADMIN_USER(state, admin){
      state.adminUser = admin
    }
  },
  actions: {
    setAuthUser({commit}, sessionUserId){
      commit('SET_USER_ID', sessionUserId);
    },
    setAdminUser({commit}, adminUser){
      commit('SET_ADMIN_USER', adminUser);
    }
  },
  modules: {
  }
})
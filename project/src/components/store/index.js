import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

Vue.use(Vuex,axios);

export default new Vuex.Store({
  state: {
   
    user : {},
    fiche : {}
  },
 mutations: {
    
    set_fiche(state , patient){
      state.patient = patient
    },
    SET_Patient(state , id){
      if(state.patients.length){
        state.patients.map(passionn=>{
          if(passionn._id == id){
            state.patient = passionn
          }
        })
      }
    }
  },
  actions: {
  
    async getfiche ({commit},id) {
        try {
        let response = await axios.get(`http://localhost:5000/user/affiche_fiche/${id}`);
        if(response.status == 200){
          commit('set_fiche',response.data)
        }
        } catch (e) {
        console.log(e);
        }
    }

  },
  modules: {},
  getters:{
    Getpatients : state => state.patient
  }
});

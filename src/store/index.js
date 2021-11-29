import Vue from 'vue'
import Vuex, { Store } from 'vuex'


Vue.use(Vuex)

export default new Store({
  state:{
    isCollapse:false,
  },
  mutations:{
    setisCollapse(state,row){
      state.isCollapse = row
      console.log(state.isCollapse)
    }
  }
})
import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
import route from './router'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: []
  },
  mutations: {
    GET_TODO: ( state ,todoArr ) => {
      console.log(todoArr)
      state.todo = todoArr
    }
  },
  actions: {
    fbLoginAcc ( { commit, dispatch }, fbToken ) {
      axios.post('http://localhost:3000/users/fbsignin',{ fbToken })
      .then((result => {
        console.log(result.data)
        localStorage.setItem('token', result.data)
        swal("success" , "successfuly logged in to your account", "success")
        route.push('/todo')
      }))
      .catch((err => {
        swal("failed" , "oops looks like you got bad credentials", "error")
        console.log( err )
      }))
    },
    loginAcc ( context, credentials ) {
      // console.log( credentials )
      axios.post('http://localhost:3000/users/signin', credentials)
      .then((result => {
        console.log(result.data)
        localStorage.setItem('token', result.data)
        swal("success" , "successfuly logged in to your account", "success")
        route.push('/todo')
      }))
      .catch((err => {
        swal("failed" , "oops looks like you got bad credentials", "error")
        console.log( err )
      }))
    },
    getTodo ( { commit } ) {
      let token = localStorage.getItem("token")
      axios.get('http://localhost:3000/todo/', { headers: { token } })
      .then((result) => {
        commit( "GET_TODO", result.data)
      })
      .catch((err => {
        swal("shit" , "sorry but you gotta login to get ur todo's ", "warning")
      }))
    },
    deleteTodo ( { commit }, todoId) {
      console.log(todoId)
      axios.delete(`http://localhost:3000/todo/delete/${todoId}`)
      .then(( result ) => {
        console.log(result.data)
        // console.log(this.dispatch)
        this.dispatch('getTodo')
      })
      .catch(( err ) => {
        console.log(err)
      })
    },
    modifyTodo ( { commit, dispatch }, todoObj ) {
      let id = todoObj.id
      let updateObj = {
        todo : todoObj.todo,
        description : todoObj.description,
        due: new Date( todoObj.due )
      }
      axios.put(`http://localhost:3000/todo/update/${id}`, updateObj )
      .then(( result ) => {
        swal('update succes', 'succesfully updated your todo', 'success')
        console.log(result.data)
        dispatch('getTodo')
      })
      .catch(( err ) => {
        console.log(err)
        swal('ooops', 'something went terribly wrong', 'error')
      })
    },
    createTodo ( { commit, dispatch }, todoObj ) {
      let token = localStorage.getItem('token')
      axios.post('http://localhost:3000/todo/', todoObj, { headers: { token } })
      .then(( result ) => {
        swal('success', 'your todo was succesfully added', 'success')
        dispatch('getTodo')
      })
      .catch(( err ) => {
        swal('error', 'ooops something went wrong', 'error')
      })
    },
    registerUser ( { commit, dispatch }, userInfo ) {
      axios.post('http://localhost:3000/users/signup', userInfo )
      .then((result) => {
        let token = result.data
        swal('succesfully register', 'you will now be redirected to the home page', 'success')
        localStorage.setItem('token', token)
        // console.log(result.data)
        route.push('/todo')
      })
      .catch((err) => {
        console.log( err )
        swal('oops something went wrrong', 'fields cannot be empty, email/username must be unique and email has to be a valid format', 'warning')
      })
    }
  }
})

<template>
  <div>
    <table class="table table-hover container">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">todo</th>
          <th scope="col">description</th>
          <th scope="col">due</th>
          <th scope="col">status</th>
          <th scope="col">created at</th>
          <th scope="col">updated at</th>
          <th scope="col">options</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            v-for="(item,key) in todo"
            v-bind:key="key">
            <th scope="row" >{{key + 1}}</th>
            <td>{{item.todo}}</td>
            <td>{{item.description}}</td>
            <td>{{item.due}}</td>
            <td>{{item.status}}</td>
            <td>{{item.createdAt}}</td>
            <td>{{item.updatedAt}}</td>
            <td> 
                <button @click="removeTodo(item._id)">
                 <span 
                 class="glyphicon glyphicon-remove" aria-hidden="true">
                 </span>
                </button> ||    
                <button @click="updateTodo(item)">
                 <span data-toggle="modal" data-target="#exampleModal"
                 class="glyphicon glyphicon-pencil" aria-hidden="true">
                 </span>
                </button> 
            </td>
        </tr>
      </tbody>
    </table>
    <div class="justify-content-center align-items-center"> 
        <updateModel  v-bind:todoObj="updateObj"/>
    </div>
  </div>  
</template>

<script>

import { mapState, mapActions } from 'vuex'
import updateModel from './updateModel.vue'
import navbar from '@/components/navbar.vue'

export default {
    data () {
        return {
            token : localStorage.getItem('token'),
            logged : false,
            woof : "ayam goreng",
            updateObj : ''
        }
    },
    computed: {
        ...mapState([
            'todo'
        ])
    },
    methods: {
        ...mapActions([
            'getTodo',
            'deleteTodo',
            'modifyTodo'
        ]),
        obtainTodo () {
            this.getTodo()
        },
        login () {
            let status = localStorage.getItem("token")
            if (status !== null) {
                this.logged = true
            } 
        },
        removeTodo (todoId) {
            this.deleteTodo(todoId)
        },
        updateTodo (todoObj) {
            this.updateObj = todoObj
        }
    },
    mounted () {
        this.obtainTodo()
        this.login()
    },
    components: {
        updateModel,
        navbar
    }
}

</script>

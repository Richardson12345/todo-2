<template>
<div class="container">
    <div class="input-group mb-3" >
      todo:
      <br/>
      <input v-model="todo" type="text" class="form-control" placeholder="todo" aria-label="todo" aria-describedby="basic-addon1">
      <br/>
      description:
      <input v-model="description" type="text" class="form-control" placeholder="description" aria-label="description" aria-describedby="basic-addon1">
      <br/>
      due:
      <input v-model="due" type="date" class="form-control" placeholder="due date" aria-label="due" aria-describedby="basic-addon1">
      <br/>
      <button @click="addTodo(todo, description, due)"  type="button" class="btn btn-outline-success">Submit</button>
    </div>
</div>
    
</template>


<script>

import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            header : 'add a new todo',
            todo: '',
            description: '',
            due: ''
        }
    },
    computed: {
        ...mapState([
        ])
    },
    methods: {
        ...mapActions([
            'createTodo'
        ]),
        addTodo ( todo, description, due ) {
            let todoObj = {
                todo,
                description,
                due: new Date(due)
            }
            this.createTodo(todoObj)
            this.todo = ''
            this.description = ''
            this.due = ''
        }
    }

}


</script>

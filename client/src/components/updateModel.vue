<template>
    <div>
        <div class="modal" tabindex="-1" role="dialog" id="exampleModal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{todoObj.description}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  todo: 
                  <input 
                  type="text" v-model="todo" 
                  class="form-control" aria-label="todo"
                  aria-describedby="basic-addon1">
                  description:
                  <input 
                  type="text" v-model="description" 
                  class="form-control" aria-label="description" 
                  aria-describedby="basic-addon1">
                  due:
                  <input 
                  type="date" v-model="due" class="form-control" placeholder="Username" 
                  aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="modal-footer">
                <button type="button" @click="update( todo, description, due )" class="btn btn-primary">Update Todo</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: ['todoObj'],
    data () {
        return {
            todo: '',
            description: '',
            due: ''
        }
    },
    methods: {
        ...mapActions([
            'modifyTodo'
        ]),
        update( todo, description, due ) {
            let updateObj = {
                id: this.todoObj._id,
                todo,
                description,
                due
            }
            this.modifyTodo(updateObj)
        
        }
    },
    mounted () {
    },
    watch: {
        todoObj ( value ) {
            this.todo  = value.todo,
            this.description = value.description            
        }
    }
}
</script>

<style>
.modal-dialog{
    left: 0 !important;
}
</style>

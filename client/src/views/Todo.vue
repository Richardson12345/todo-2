<template>
    <div>
        <navbar/>
        <h1> {{title}} </h1>
        <add-todo/>
        <todoTable/>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import todoTable from '@/components/todoTable.vue'
import addTodo from '@/components/addTodo.vue'
import navbar from '@/components/navbar.vue'

export default {
    data () {
        return {
            title: 'your todo list'
        }
    },
    computed: {
        ...mapState([
        ])
    },
    methods: {
        ...mapActions([
        ])
    },
    moounted(){

    },
    components: {
        todoTable,
        addTodo,
        navbar
    }
}
</script>

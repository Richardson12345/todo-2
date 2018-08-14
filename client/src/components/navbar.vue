<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <span class="navbar-brand" href="#">Todo</span>
        <div class="d-flex justify-content-end">
            <button class="btn btn-outline-success my-2 my-lg-0" @click="logout">Logout</button>
        </div>
        <div>
           <span class="navbar-brand">{{weather}}</span>
        </div>
    </nav>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'

export default {
    data () {
        return {
            weather : 'dasd'
        }
    },
    methods: {
        logout () {
            localStorage.clear()
            swal('logged out', 'you are now logged out', 'info')
            this.$router.push('/')
        }
    },
    mounted () {
        axios.get('http://localhost:3000/todo/weather')
        .then((result) => {
            let temps = result.data.main
            let weatherString = `Jakarta temperature - ${temps.temp} °C humidity - ${temps.humidity} K`
            this.weather = weatherString
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>


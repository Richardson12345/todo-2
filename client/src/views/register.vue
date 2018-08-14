<template>
    <div>
        <register/>
    </div>    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import register from '@/components/createUser.vue'

export default {
    components: {
        register
    }
}
</script>


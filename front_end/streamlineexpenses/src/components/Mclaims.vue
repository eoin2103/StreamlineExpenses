<template>
    <div>
        <Mclaim v-for="(claim,index) in claims" :key="claim._id" @toggle-status = "$emit('toggle-status', claim._id)" @claim-delete = "$emit('claim-delete', claim._id)" :claim="claim" :index="index"/>
    </div>
</template>

<script>
import Mclaim from './Mclaim'

export default {
    name: 'Claims',
    props: {
        claims: Array,   
    },
    components: {
        Mclaim
    },
    emits: [
        'claim-delete',
        'toggle-status'
    ]

}
</script>
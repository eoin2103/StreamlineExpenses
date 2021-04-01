<template>
    <div v-for="(claim,index) in claims" :key="claim._id">
        <Claim @toggle-status = "$emit('toggle-status', claim._id)" @claim-delete = "$emit('claim-delete', claim._id)" :claim="claim" :index="index"/>
    </div>
</template>

<script>
import Claim from './Claim'

export default {
    name: 'Claims',
    props: {
        claims: Array,   
    },
    components: {
        Claim
    },
    emits: [
        'claim-delete',
        'toggle-status'
    ]

}
</script>

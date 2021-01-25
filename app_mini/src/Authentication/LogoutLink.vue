<template>
    <!-- <router-link to="/signin" @click="handlerLogout">Log out</router-link> -->
    <a class="text-white" style="cursor: pointer;" to="/signin" @click="handlerLogout">Log out</a>
</template>
<script>
export default {
    name: 'LogoutLink',

    methods: {

        handlerLogout() {
            sessionStorage.clear()

            this.$router.push('/signin')

            this.$store.commit('deleteSession', '')
        }

    }
}
</script>
<style>
    
</style>
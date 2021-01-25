<template lang="">
    <div class="navbar" id="navbar">
        <div class="container">
            <router-link to="/"><img class="image_logo" src="../Global/Image/laptop.png"></router-link>
            <div class="link_navbar">
                <li><router-link exact to="/">Home</router-link></li>
                <li><router-link to="/shop">Shop</router-link></li>
                <!-- <li><router-link to="/signin">Sign In</router-link></li> -->
                <li v-if="idUser">
                    <router-link to="/history">History</router-link>
                </li>
                <li v-if="!idUser">
                    <LoginLink />
                </li>
                <li v-if="idUser">
                    <LogoutLink />
                </li>
                <div className="right_menu">
                    <router-link to="/cart">
                        <div className="cart_btn">
                            <i className='bx bx-cart-alt'></i>
                        </div>  
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <router-view />
</template>
<script>
import LoginLink from '../Authentication/LoginLink.vue'
import LogoutLink from '../Authentication/LogoutLink.vue'

export default {
    name: 'Header',

    created () {
        if (sessionStorage.getItem('idUser')){

            this.$store.commit('addSession', sessionStorage.getItem('idUser'))

        }
    },

    computed: {
        idUser() {
            return this.$store.state.idUser
        }
    },

    components: {
        LoginLink, LogoutLink
    }

    
}
</script>
<style>

    body{
        font-family: 'Montserrat', sans-serif;
    }

    .navbar{
        background-color: #212529;
        height: 5rem;
        position: fixed;
        width: 100%;
        z-index: 999;
    }

    .image_logo{
        width: 50px;
        height: 50px;
    }

    .link_navbar{
        display: flex;
    }

    .link_navbar li {
        list-style: none;
        padding: 0 1.2rem;
        margin-top: .5rem;
    }

    .link_navbar li a{
        text-decoration: none;
        color: #ffffff;
        font-size: 1.3rem;

    }

    .right_menu{
        margin-left: 1rem;
    }

    .cart_btn i{
        font-size: 1.8rem !important;
        color: #ffffff;
        padding: .5rem .5rem;
        transition: all .5s ease-in-out;
        cursor: pointer;
    }

    .cart_btn i:hover{
        background-color: #ffffff;
        color: #212529;
        border-radius: .8rem;
    }
    
</style>
<template>
<div class="banner bannerLogin">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card mt-5">
                    <form class="box">
                        <h1>Sign In</h1>
                        <p class="text-muted"> Please enter your login and password!</p>
                        <span v-if="errorEmail" class="text-danger">{{ errorEmail }}</span>
                        <span v-if="errorPassword" class="text-danger">{{ errorPassword }}</span>
                        <input type="text" placeholder="Email" v-model="email" >
                        <input type="password" placeholder="Password" v-model="password" >
                        <router-link to="/signup">
                            <a class="forgot text-muted">Create New Account?</a>
                        </router-link>
                        <input type="submit" value="Sign In" @click="onSubmit">
                        <div class="col-md-12">
                            <ul class="social-network social-circle">
                                <li><a href="#" class="icoFacebook" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#" class="icoTwitter" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AccountAPI from '../API/AccountAPI'

export default {
    name: 'SignIn',

    data() {
        return {
            email: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            accounts: []
        }
    },

    created () {

        const fetchData = async () => {

            const response = await AccountAPI.getAllAccount()
            this.accounts = response

            console.log(this.accounts)

        }

        fetchData()

    },

    methods: {
        onSubmit(e){
            e.preventDefault();

            console.log("Email: ", this.email)
            console.log("Password: ", this.password)

            const account = this.accounts.find(value => {
                return value.email === this.email
            })

            if (account){
                if (account.password === this.password){

                    sessionStorage.setItem('idUser', account._id)

                    this.$store.commit('addSession', sessionStorage.getItem('idUser'))

                    this.$router.push('/')

                }else{
                    this.errorPassword = "Please Check Password Your!"
                    this.password = ''
                }
            }else{
                this.email = ''
                this.password = ''
                this.errorEmail = "Please Check Email Your!"
            }

        }
    },

    
}
</script>

<style>
.bannerLogin {
    background-image: url(../Global/Image/banner2.jpg);
}

.box {
    width: 500px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #191919;
    ;
    text-align: center;
    transition: 0.25s;
    margin-top: 100px
}

.box input[type="text"],
.box input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    width: 250px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
    width: 300px;
    border-color: #2ecc71
}

.box input[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
}

.box input[type="submit"]:hover {
    background: #2ecc71
}

.forgot {
    text-decoration: underline
}

ul.social-network {
    list-style: none;
    display: inline;
    margin-left: 0 !important;
    padding: 0
}

ul.social-network li {
    display: inline;
    margin: 0 5px
}

.social-network a.icoFacebook:hover {
    background-color: #3B5998
}

.social-network a.icoTwitter:hover {
    background-color: #33ccff
}

.social-network a.icoGoogle:hover {
    background-color: #BD3518
}

.social-network a.icoFacebook:hover i,
.social-network a.icoTwitter:hover i,
.social-network a.icoGoogle:hover i {
    color: #fff
}

a.socialIcon:hover,
.socialHoverClass {
    color: #44BCDD
}

.social-circle li a {
    display: inline-block;
    position: relative;
    margin: 0 auto 0 auto;
    border-radius: 50%;
    text-align: center;
    width: 50px;
    height: 50px;
    font-size: 20px
}

.social-circle li i {
    margin: 0;
    line-height: 50px;
    text-align: center
}

.social-circle li a:hover i,
.triggeredHover {
    transform: rotate(360deg);
    transition: all 0.2s
}

.social-circle i {
    color: #fff;
    transition: all 0.8s;
    transition: all 0.8s
}
</style>

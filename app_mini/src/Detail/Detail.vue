<template>
<div>
    <div class="banner bannerDetail">
    </div>

    <div class="container pt-5 pb-5">
        <div class="row">
            <div class="col-md-6">
                <div class="carousel slide" data-ride="carousel" id="carousel-1">
                    <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active"><img class="img-thumbnail" :src=macbook.image alt="Slide Image" loading="lazy"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                    <h4>{{ macbook.name }}</h4>
                    <div class="price"><span class="mr-2"><i class="fa fa-rupee text-success"></i>&nbsp;{{ macbook.price }}</span></div>
                    <span>{{ macbook.description }}</span>
                    <hr>
                    <div class="d-flex align-items-center mt-2"> <label class="radio"> <input type="radio" name="ram" value="128GB" checked> <span>128GB</span> </label> <label class="radio"> <input type="radio" name="ram" value="256GB"> <span>256GB</span> </label> <label class="radio"> <input type="radio" name="ram" value="256GB"> <span>512GB</span> </label> </div>
                    <p class="mt-1">Quality: </p>
                    <div class="quality d-flex mt-2">
                        <button class="btn btn_quality" @click="downCount">-</button>
                        &nbsp;
                        <input type="text" class="input_quality text-center" :value=count :v-model=count @keyup="changeCount">
                        &nbsp;
                        <button class="btn btn_quality" @click="upCount">+</button>
                    </div>
                    <div class="mt-3"><button class="btn btn-dark mr-2" type="button" @click="addToCart">ADD TO CART</button>
                    </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ProductAPI from '../API/ProductAPI'
import CartAPI from '../API/CartAPI'
import alertify from 'alertifyjs'
import queryString from 'query-string'

export default {
    name: 'Detail',

    data() {
        return {
            macbook: [],
            count: 1,
            idUser: '',
        }
    },

    created () {

        if (!sessionStorage.getItem('idUser')){
            this.idUser = this.$store.state.idTemp
        }else{
            this.idUser = sessionStorage.getItem('idUser')
        }

        const id = this.$route.params.id

        const fetchData = async () => {
            const response = await ProductAPI.getDetail(id)

            this.macbook = response

        }

        fetchData()
    },


    methods: {
        addToCart(){

            let data = {
                _id: Math.random.toString,
                idUser: this.idUser,
                idProduct: this.macbook._id,
                name: this.macbook.name,
                image: this.macbook.image,
                price: this.macbook.price,
                count: this.count
            }

            if (!sessionStorage.getItem('idUser')){
                this.$store.commit('addToCart', data)
            }else{
                console.log("Ban Da Dang Nhap")
                
                const idProduct = this.$route.params.id

                const params = {
                    idUser: sessionStorage.getItem('idUser'),
                    count: data.count
                }

                const query = idProduct + '?' + queryString.stringify(params)

                const addCart = async () => {

                    const response = await CartAPI.addtoCart(query)
                    
                    console.log(response)

                }

                addCart()

            }
            

            alertify.set('notifier','position', 'bottom-left');
            alertify.success('Bạn Đã Thêm Hàng Thành Công');
        },
        changeCount(e){
            this.count = e.target.value
        },
        downCount(){
            if (this.count === 1){
                return
            }
            this.count -= 1
        },
        upCount(){
            this.count += 1
        }
    }

}
</script>

<style>

.bannerDetail {
    background-image: url(../Global/Image/banner3.jpg)
}

.alertify-notifier {
    color: #ffffff;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    border: 2px solid #ffffff !important;
}

.ajs-message{
    /* background-color: #00ccff !important; */
    width: 20rem !important;
}

.btn_quality{
    background-color: #212529;
    color: #ffffff;
    outline: #ffffff !important;
    height: 2rem;
    padding: 0 .7rem;
}

.input_quality{
    width: 10%;
    height: 2rem;
}

.carousel-item {
    width: 100%;
}

.price span {
    font-size: 18px
}

.cut {
    text-decoration: line-through;
    color: red
}

.icons i {
    font-size: 17px;
    color: green;
    margin-right: 2px
}

.offers i {
    color: green
}

.delivery i {
    color: blue
}

label.radio {
    cursor: pointer
}

label.radio input {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none
}

label.radio span {
    padding: 2px 11px;
    margin-right: 3px;
    border: 1px solid #8f37aa;
    display: inline-block;
    color: #8f37aa;
    border-radius: 3px;
    text-transform: uppercase
}

label.radio input:checked+span {
    border-color: #8f37aa;
    background-color: #8f37aa;
    color: #fff
}
</style>

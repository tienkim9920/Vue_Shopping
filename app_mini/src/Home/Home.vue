<template>
    <div class="Home">
        <div class="banner bannerHome">
        </div>
        
        <h1 class="h1_macbook">MACBOOK</h1>

        <div class="group_Macbook">
            <div class="container d-flex justify-content-center mt-100">
                <div class="row">
                    <Macbook :ListMacbook="macbook" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductAPI from '../API/ProductAPI'
import queryString from 'query-string'
import { ref, watch } from 'vue'

import Macbook from './Component/Macbook'

export default {
    name: 'Home',

    setup() {

        const macbook = ref([])

        watch (() => {
            const fetchData = async () => {

                const param = {
                    category: 'macbook'
                }

                const query = '?' + queryString.stringify(param)

                const response = await ProductAPI.getCategoryAPI(query)

                macbook.value = response
                
            }

            fetchData()
        })

        return { macbook }

    },

    components: {
        Macbook
    }
}
</script>
<style>
    .bannerHome{
        background-image: url(../Global/Image/banner1.jpg)
    }

    .h1_macbook{
        padding-top: 6rem;
        text-align: center;
    }

    .product-action-style a i:hover {
        color: rgb(0, 221, 0)
    }

    .fix_col{
        padding: 0 0;
        margin: 0 1rem;
        max-width: 30%;
    }

    .mt-100 {
        margin-top: 100px
    }

    .carousel .carousel-indicators li {
        display: inline-block;
        width: 10px;
        height: 10px;
        text-indent: -99px;
        cursor: pointer;
        border: 1px solid #fff;
        background: #fff;
        border-radius: 2px
    }

    .product-wrapper,
    .product-img {
        overflow: hidden;
        position: relative
    }

    .mb-45 {
        margin-bottom: 45px
    }

    .product-action {
        bottom: 0px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: center;
        transition: all 0.6s ease 0s
    }

    .product-action h3{
        color: #ffffff;
    }

    .product-action-style {
        background-color: #fff;
        box-shadow: 0 0 8px 1.7px rgba(0, 0, 0, 0.06);
        display: inline-block;
        padding: 16px 2px 12px
    }

    .product-action-style>a {
        color: #979797;
        line-height: 1;
        padding: 0 21px;
        position: relative
    }

    .product-action-style>a.action-plus {
        font-size: 18px
    }

    .product-wrapper:hover .product-action {
        bottom: 20px;
        opacity: 1
    }

    .product-img a img{
        height: 300px;
        width: 350px;
    }
</style>
<template lang="">
<div v-for="item in ListMacbook" :key="item._id" class="col-md-3 fix_col">
    <div class="product-wrapper mb-45 text-center">
        <div class="product-img">
            <router-link :to="{ name: 'Detail', params: { id: item._id }}">
                <img :src=item.image alt="">
            </router-link>
            <div class="product-action">
                <h3>{{ item.name }}</h3>
                <div class="product-action-style">
                    <a href="#"><i class="fa fa-plus"></i></a>
                    <a href="#"> <i class="fa fa-heart"></i></a>
                    <a href="#"> <i class="fa fa-shopping-cart"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Macbook',

    props: ['ListMacbook']
}
</script>

<style>

</style>

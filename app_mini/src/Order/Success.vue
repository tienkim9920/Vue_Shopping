<template>
    <div class="banner bannerDetail">
    </div>

    <div className="container">
        <h1 className="success_h1">Bạn Đã Đặt Hàng Thành Công!</h1>
        <p className="success_p">Vui Lòng Kiểm Tra Lại Email.</p>
    </div>
</template>
<script>
export default {
    name: 'Success'
}
</script>
<style>
.bannerDetail {
    background-image: url(../Global/Image/banner3.jpg)
}

.success_h1{
    padding-top: 4rem;
}

.success_p{
    padding-bottom: 4rem;
}
</style>
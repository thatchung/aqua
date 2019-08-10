<template>
    <div class="container">
        <img src="/static/img/404.png" class="logo center-block">
        <div class="text-center">
            <h1>You are lost</h1>
            <h4>This page doesn't exist.</h4>
            <router-link to="/">Take me home.</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>

<style lang="scss" scoped>
    .logo {
        width: 300px;
    }

    .container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
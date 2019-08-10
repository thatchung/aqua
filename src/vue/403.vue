<template>
    <div class="container">
        <img src="/static/img/lock.png" class="logo center-block">
        <div class="text-center">
            <h1>Access denied</h1>
            <h4>You do not have permission to view this page.</h4>
            <router-link to="/">Take me home.</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AccessDenied'
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
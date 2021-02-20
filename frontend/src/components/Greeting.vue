<template>
    <div>
        <h1 v-if="isLoggedIn">Hello, {{ getName }}!</h1>
    </div>
</template>

<script>
export default {
    name: 'Greeting',
    computed: {
        getName() {
            return localStorage.getItem('firstName');
        },
        isLoggedIn() {
            return localStorage.getItem('jwt_token');
        }
    }
};
</script>

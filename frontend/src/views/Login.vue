<template>
    <div id="login">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../components/auth/Login-Form.vue';
export default {
    name: 'LoginPage',
    components: {
        LoginForm
    }
};
</script>

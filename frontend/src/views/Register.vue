<template>
    <div id="register">
        <Registration-Form />
    </div>
</template>

<script>
import RegistrationForm from '../components/auth/Registration-Form.vue';
export default {
    name: 'RegistrationPage',
    components: {
        RegistrationForm
    }
};
</script>

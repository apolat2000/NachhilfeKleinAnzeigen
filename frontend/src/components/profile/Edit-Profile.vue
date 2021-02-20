<template>
    <ProfileForm :profile="this.$router.history.current.params" pageTitle="Edit Profile" />
</template>

<script>
import ProfileForm from './ProfileForm.vue';
export default {
    name: 'EditProfile',
    components: {
        ProfileForm
    }
};
</script>

<template>
    <TutorialForm :tutorial="this.$router.history.current.params" pageTitle="Edit Tutorial" />
</template>

<script>
import TutorialForm from './TutorialForm.vue';
export default {
    name: 'EditTutorial',
    components: {
        TutorialForm
    }
};
</script>

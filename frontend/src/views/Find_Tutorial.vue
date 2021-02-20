<template>
    <div id="app">
        <tutorials class="mt-16" />
        <!-- button @click="logout">Log me out!</button> -->
    </div>
</template>

<script>
import Tutorials from '../components/tutorial/Tutorials.vue';

export default {
    name: 'App',
    components: {
        Tutorials
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/login');
            console.log('Logged out');
        }
    }
};
</script>

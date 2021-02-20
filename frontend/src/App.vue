<template>
    <div id="app">
        <Navbar />
        <div id="nav">
            <div
                v-if="
                    $route.fullPath === '/' ||
                        $route.fullPath === '/create-tutorial' ||
                        $route.fullPath === '/tutorials'
                "
            >
                <div v-if="$route.fullPath === '/'" class="w-96 py-8 mx-auto">
                    <router-link to="/"><HeaderLogo /></router-link>
                </div>
            </div>
        </div>
        <router-view />
        <div v-if="$route.fullPath !== '/' && !$route.fullPath.includes('/tutorial/')" class="w-96 pt-8 mx-auto">
            <router-link to="/"><HeaderLogo /></router-link>
        </div>
    </div>
</template>

<script>
import HeaderLogo from './components/common/Header-Logo.vue';
import Navbar from './components/common/Navbar.vue';
document.title = 'Nachhilfe-Kleinanzeigen';
export default {
    components: {
        HeaderLogo,
        Navbar
    },
    async mounted() {
        try {
            if (localStorage.getItem('jwt_token')) {
                let result = await this.axios.post(
                    'http://localhost:3000/verifyRefreshToken',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                        }
                    }
                );
                if (result.status === 200) {
                    localStorage.setItem('jwt_token', result.data.jwt_token);
                }
            } else {
                localStorage.clear();
                this.$root.$refs.Navbar.reloadNav();
            }
        } catch (err) {
            localStorage.clear();
            this.$root.$refs.Navbar.reloadNav();
        }
    },
    name: 'App',
    watch: {
        $route(to) {
            document.title = to.meta.title || 'Nachhilfe-Kleinanzeigen';
        }
    }
};
</script>

<style>
* {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>

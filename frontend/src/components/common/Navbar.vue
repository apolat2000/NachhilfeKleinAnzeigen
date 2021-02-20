<template>
    <nav class="bg-gray-900">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex-shrink-0">
                        <router-link to="/"
                            ><img class="block h-10 w-auto" src="../../assets/navlogo.png"
                        /></router-link>
                    </div>
                    <div class="block sm:ml-6">
                        <div class="flex">
                            <router-link
                                v-if="isLoggedIn()"
                                to="/tutorials"
                                class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-75 ease-in-out"
                            >
                                Tutorials
                            </router-link>
                            <router-link
                                v-if="isLoggedIn()"
                                to="/create-tutorial"
                                class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-75 ease-in-out"
                            >
                                Create Tutorial
                            </router-link>
                        </div>
                    </div>
                </div>
                <div
                    v-if="isLoggedIn()"
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                        title="Goes to profile."
                    >
                        <router-link
                            :to="`/profile/${getUserId()}`"
                            class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-75 ease-in-out"
                            >Logged in as {{ getName() }}
                        </router-link>
                    </div>
                    <button
                        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-75 ease-in-out"
                        @click="logout"
                    >
                        Logout
                    </button>
                </div>
                <div
                    v-if="!isLoggedIn()"
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                    <router-link
                        to="/login"
                        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-75 ease-in-out"
                        >Login</router-link
                    >
                    <router-link
                        to="/register"
                        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-75 ease-in-out"
                    >
                        Register
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/login');
            this.reloadNav();
            console.log('Logged out');
        },
        getName() {
            return localStorage.getItem('firstName');
        },
        getUserId() {
            return localStorage.getItem('userID');
        },
        isLoggedIn() {
            return localStorage.getItem('jwt_token');
        },
        reloadNav() {
            this.$forceUpdate();
        }
    },
    created() {
        this.$root.$refs.Navbar = this;
    }
};
</script>

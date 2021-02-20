<template>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
        <img src="../../assets/logo.png" class="w-96 mx-auto bounce-in-from-front-to-back" />
        <div class="container max-w-sm mx-auto items-center justify-center px-2">
            <h1 class="mb-8 text-3xl text-center">Reset Your Password</h1>
            <form @submit.prevent="handleSubmit" method="POST">
                <input
                    type="password"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    id="password"
                    v-model="password"
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    id="password_confirm"
                    v-model="password_confirm"
                    placeholder="Confirm your passowrd"
                    required
                />
                <input
                    type="submit"
                    id="submitButton"
                    class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    value="Change Password"
                />
            </form>
            <br />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Forgot',
    data() {
        return {
            password: '',
            password_confirm: ''
        };
    },
    async mounted() {
        try {
            localStorage.clear();
            this.$root.$refs.Navbar.reloadNav();
            const jwt_token = this.$route.params.token;
            if (jwt_token) {
                let result = await this.axios.post(
                    'http://localhost:3000/verifyTokenSalt',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwt_token}`
                        }
                    }
                );
                if (result.status === 200) {
                    console.log('Token valid');
                }
            }
        } catch (err) {
            console.log(err.message);
            localStorage.clear();
            this.$router.push('/login');
            this.$root.$refs.Navbar.reloadNav();
            console.log('Invalid Token');
        }
    },
    methods: {
        handleSubmit: async function changePassowrd() {
            if (this.password === this.password_confirm) {
                let submitButton = document.getElementById('submitButton');
                submitButton.disabled = true;
                submitButton.className =
                    'w-full px-4 py-2 font-bold text-black bg-grey-500 rounded-full hover:bg-grey-700 focus:outline-none focus:shadow-outline';
                try {
                    const res = await this.axios.post(
                        'http://localhost:3000/updatePassword',
                        {
                            password: this.password
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${this.$route.params.token}`
                            }
                        }
                    );
                    if (res.status === 200) {
                        window.alert('Passowrd Successfully Updated!');
                        this.$router.push('/login');
                    }
                } catch (e) {
                    window.alert('Request could not be completed. Please try again later. Error: ' + e.message);
                }
            } else {
                window.alert('Passowrds do not match!');
            }
        }
    }
};
</script>

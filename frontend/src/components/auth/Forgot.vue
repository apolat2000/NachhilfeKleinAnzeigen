<template>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
        <img src="../../assets/logo.png" class="w-96 mx-auto bounce-in-from-front-to-back" />
        <div class="container max-w-sm mx-auto items-center justify-center px-2">
            <h1 class="mb-8 text-3xl text-center">Forgot Your Password</h1>
            <p class="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your
                password!
            </p>
            <form @submit.prevent="handleSubmit" method="POST">
                <input
                    type="email"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="E-Mail"
                    required
                />
                <input
                    type="submit"
                    id="submitButton"
                    class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    value="Reset Password"
                />
            </form>
            <br />
            <div class="text-center">
                <router-link
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="register"
                    >Create an Account!</router-link
                >
            </div>
            <div class="text-center">
                <router-link class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" to="login"
                    >Already have an account? Login!</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Forgot',
    data() {
        return {
            email: ''
        };
    },
    methods: {
        handleSubmit: async function forgotPassword() {
            let submitButton = document.getElementById('submitButton');
            submitButton.disabled = true;
            submitButton.className =
                'w-full px-4 py-2 font-bold text-black bg-grey-500 rounded-full hover:bg-grey-700 focus:outline-none focus:shadow-outline';
            try {
                const res = await this.axios.post('http://localhost:3000/forgotPassowrd', { email: this.email });
                if (res.status === 200) {
                    window.alert('Reset E-Mail was sent successfully');
                    this.$router.push('/');
                }
            } catch (e) {
                window.alert('Request could not be completed. Please try again later. Error: ' + e.message);
            }
        }
    }
};
</script>

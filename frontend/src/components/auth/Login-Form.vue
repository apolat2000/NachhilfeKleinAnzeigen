<template>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
        <img src="../../assets/logo.png" class="w-96 mx-auto bounce-in-from-front-to-back" />
        <div class="container max-w-sm mx-auto items-center justify-center px-2">
            <div class="roll-in-blurred-from-left bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">Login</h1>
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
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        id="password"
                        v-model="password"
                        placeholder="********"
                        required
                    />

                    <input
                        type="submit"
                        class="w-full text-center text-white py-3 rounded bg-green-500 text-black hover:bg-green-600 focus:outline-none my-1 cursor-pointer"
                        value="Sign me in!"
                    />
                </form>
                <P class="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-900">
                    <router-link to="forgot">Forgot Password?</router-link>
                </P>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            jwt_token: ''
        };
    },
    created() {
        //user is not authorized => Remain at login page
        if (localStorage.getItem('jwt_token') !== null) {
            this.$router.push('/');
        }
    },
    methods: {
        handleSubmit: async function login() {
            try {
                let user = {
                    email: this.email,
                    password: this.password
                };
                var res = await this.axios.post('http://localhost:3000/login', user);
                //if successfull
                if (res.status === 200) {
                    console.log('Logged in');
                    localStorage.setItem('jwt_token', res.data.jwt_token);
                    localStorage.setItem('userID', res.data.userID);
                    localStorage.setItem('firstName', res.data.first_name);
                    this.$router.push('/');
                    this.$root.$refs.Navbar.reloadNav();
                }
            } catch (err) {
                if (err.response.status) {
                    alert('Wrong email or password. Please try again.');
                }
            }
            return false;
        }
    }
};
</script>

<style>
.bounce-in-from-front-to-back {
    -webkit-animation: bounce-in-from-front-to-back 1.1s linear 0.5s both;
    animation: bounce-in-from-front-to-back 1.1s linear 0.5s both;
}

@-webkit-keyframes bounce-in-from-front-to-back {
    0% {
        -webkit-transform: scale(7);
        transform: scale(7);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    72% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    81% {
        -webkit-transform: scale(1.24);
        transform: scale(1.24);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    89% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    95% {
        -webkit-transform: scale(1.04);
        transform: scale(1.04);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
}
@keyframes bounce-in-from-front-to-back {
    0% {
        -webkit-transform: scale(7);
        transform: scale(7);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    72% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    81% {
        -webkit-transform: scale(1.24);
        transform: scale(1.24);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    89% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    95% {
        -webkit-transform: scale(1.04);
        transform: scale(1.04);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
}

.fade-in {
    -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.roll-in-blurred-from-left {
    animation: roll-in-blurred-from-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.1s both;
}

@keyframes roll-in-blurred-from-left {
    0% {
        transform: translateX(-1000px) rotate(-720deg);
        filter: blur(50px);
        opacity: 0;
    }
    100% {
        transform: translateX(0) rotate(0deg);
        filter: blur(0);
        opacity: 1;
    }
}
</style>

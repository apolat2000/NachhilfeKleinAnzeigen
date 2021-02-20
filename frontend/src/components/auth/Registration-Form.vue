<template>
    <div class="bg-grey-lighter flex flex-col">
        <div class="container pt-16 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">Create an account</h1>
                <form @submit.prevent="handleSubmit" method="POST">
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="firstName"
                        id="firstName"
                        v-model="firstName"
                        placeholder="First name"
                        required
                    />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lastName"
                        id="lastName"
                        v-model="lastName"
                        placeholder="Last name"
                        required
                    />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        id="username"
                        v-model="username"
                        placeholder="Username"
                        required
                    />

                    <input
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        id="email"
                        v-model="email"
                        placeholder="Email"
                        required
                    />

                    <label for="image">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        single
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="image"
                        id="image"
                        accept=".png, .jpeg, .jpg"
                        @change="processFile($event)"
                    />

                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        id="password"
                        v-model="password"
                        placeholder="Password"
                        required
                    />

                    <multiselect
                        v-model="value"
                        :options="options"
                        label="title"
                        track-by="title"
                        :multiple="true"
                        :close-on-select="true"
                        @input="onChange"
                        placeholder="Select lectures you are expert in"
                    ></multiselect>

                    <input
                        type="submit"
                        class="w-full text-center text-white py-3 rounded bg-green-500 text-black hover:bg-green-600 focus:outline-none my-1 cursor-pointer"
                        value="Sign me up!"
                    />
                </form>
                <div class="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the
                    <router-link to="/register">Terms of service</router-link>
                    and
                    <router-link to="/register">Privacy Policy</router-link>
                </div>
            </div>

            <div class="text-grey-dark mt-6">
                Already have an account?
                <router-link to="/login">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegistrationForm',
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            value: [],
            options: [],
            image: ''
        };
    },
    created() {
        //user is not authorized => Remain at login page
        if (localStorage.getItem('jwt_token') !== null) {
            this.$router.push('/');
        }
        this.axios.get('http://localhost:3000/lectures').then(res => {
            this.options = res.data;
        });
    },
    methods: {
        onChange(value) {
            this.value = value;
        },
        processFile(event) {
            this.image = event.target.files[0];
        },
        handleSubmit: async function createAccount() {
            try {
                var lecturesID = [];
                this.value.forEach(lecture => {
                    lecturesID.push(lecture._id);
                });
                let user = {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    expert_of_lectures: lecturesID,
                    img: this.image
                };
                var formData = new FormData();
                Object.keys(user).forEach(key => formData.append(key, user[key]));
                let newUser = await this.axios.post('http://localhost:3000/users', formData);
                console.log('Account created');
                localStorage.setItem('jwt_token', newUser.data.jwt_token);
                localStorage.setItem('userID', newUser.data.userID);
                localStorage.setItem('firstName', newUser.data.first_name);
                this.$router.push('/');
                this.$root.$refs.Navbar.reloadNav();
            } catch (err) {
                window.alert('Account could not be created', err);
                console.log(err.response);
            }
        }
    }
};
</script>

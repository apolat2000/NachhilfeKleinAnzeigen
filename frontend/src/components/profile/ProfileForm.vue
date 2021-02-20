<template>
    <!-- component -->
    <div class="bg-grey-lighter flex flex-col">
        <div class="container pt-16 max-w-sm mx-auto flex-2 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">{{ pageTitle }}</h1>
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
                        name="password"
                        id="password"
                        v-model="password"
                        placeholder="New Password"
                    />

                    <input type="checkbox" id="changePP" name="changePP" v-model="changePP" />
                    <label for="changePP"> Change Profile Picture</label><br />
                    <div v-if="changePP">
                        <label for="image"> Profile Picture </label>
                        <input
                            type="file"
                            single
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="image"
                            id="image"
                            accept=".png, .jpeg, .jpg"
                            @change="processFile($event)"
                        />
                    </div>

                    <multiselect
                        v-model="value"
                        :options="this.options"
                        label="title"
                        track-by="title"
                        :multiple="true"
                        :close-on-select="true"
                        @input="onChange"
                        placeholder="Select lectures you are expert in"
                    ></multiselect>

                    <input
                        class="w-full text-center text-white py-3 rounded bg-green-500 text-black hover:bg-green-600 focus:outline-none my-1 cursor-pointer"
                        type="submit"
                        :value="buttonValue"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        profile: {
            type: Object,
            default: () => {}
        },
        pageTitle: {
            type: String,
            default: 'Edit Your Profile'
        }
    },
    data() {
        return {
            changePP: false,
            firstName: '',
            lastName: '',
            image: '',
            expertOf: [],
            value: [],
            options: [],
            buttonValue: 'Save Changes',
            password: ''
        };
    },
    async created() {
        //user is not authorized => Remain at login page
        var jwt_token = localStorage.getItem('jwt_token');
        if (jwt_token) {
            let newToken = await this.axios.post(
                'http://localhost:3000/verifyRefreshToken',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`
                    }
                }
            );
            if (newToken.status === 200) {
                localStorage.setItem('jwt_token', newToken.data.jwt_token);
                this.firstName = this.profile.first_name;
                this.lastName = this.profile.last_name;
                //this.image = this.profile.imgPath;
                this.value = this.profile.expert_of_lectures;
                try {
                    let lectures = await this.axios.get('http://localhost:3000/lectures/', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                        }
                    });
                    this.options = lectures.data;
                } catch (err) {
                    console.log(err.message);
                }
            } else {
                console.log('You are not authorized to access this page!');
                localStorage.clear();
                this.$router.push('/login');
                this.$root.$refs.Navbar.reloadNav();
                console.log('Logged out');
            }
        } else {
            console.log('You are not authorized to access this page!');
            localStorage.clear();
            this.$router.push('/login');
            this.$root.$refs.Navbar.reloadNav();
            console.log('Logged out');
        }
    },
    methods: {
        onChange(value) {
            this.expertOf = value;
            console.log(this.expertOf);
        },
        processFile(event) {
            this.image = event.target.files[0];
        },
        handleSubmit: async function updateProfile() {
            try {
                var lecturesID = this.value.map(lect => lect._id);
                lecturesID = [...new Set(lecturesID)]; //make IDs in array unique
                const profile = {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    expert_of_lectures: lecturesID
                };
                if (this.changePP) {
                    this.image ? (profile.img = this.image) : (profile.imgPath = '');
                }
                if (this.password.length > 0) profile.password = this.password;
                var result;
                var formData = new FormData();
                Object.keys(profile).forEach(key => formData.append(key, profile[key]));
                result = await this.axios.put(`http://localhost:3000/user/${this.profile._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                });

                if (result.status === 200) {
                    this.$router.push('/profile/' + this.profile._id);
                } else {
                    console.log('An error occured!');
                }
                localStorage.setItem('firstName', this.firstName);
                this.$root.$refs.Navbar.reloadNav();
            } catch (err) {
                console.log(err.message);
            }
        }
    }
};
</script>

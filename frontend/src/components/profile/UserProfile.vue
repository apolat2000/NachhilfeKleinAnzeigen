<template>
    <div class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
        <div class="max-w-4xl flex items-center h-auto lg:pt-16 flex-wrap mx-auto my-4 lg:my-0 justify-center">
            <!--Main Col-->
            <div
                id="profile"
                class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
            >
                <div class="p-4 md:p-12 text-center lg:text-left">
                    <!-- Image for mobile view-->
                    <img
                        src="../../assets/defUser.png"
                        alt="An error occured!"
                        class="block rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                        id="profilePic"
                    />
                    <h1 class="text-3xl font-bold pt-8 lg:pt-0">
                        {{ profileObject.first_name }} {{ profileObject.last_name }}
                    </h1>
                    <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                    <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                        <svg
                            class="h-5 fill-current text-green-700 pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                            />
                        </svg>
                        Tutorials
                    </p>
                    <ul>
                        <li v-for="tutorial in profileObject.student_in" :key="tutorial.toString()">
                            {{ tutorial.title }} on {{ tutorialDate(tutorial.date) }}
                        </li>
                    </ul>
                    <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                        <svg
                            class="h-5 fill-current text-green-700 pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Expert in
                    </p>
                    <ul>
                        <li v-for="lecture in profileObject.expert_of_lectures" :key="lecture.toString()">
                            {{ lecture.title }}
                        </li>
                    </ul>
                    <br />
                    <div v-if="isEditable">
                        <router-link :to="{ name: 'Edit profile', params: profileObject }"
                            ><button
                                class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Edit profile
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    computed: {
        getUserId() {
            return localStorage.getItem('userID');
        }
    },
    name: 'UserProfile',
    data() {
        return {
            userObject: {},
            profileObject: {},
            isEditable: {
                default: false
            }
        };
    },
    created() {
        //user is not authorized => Remain at login page
        if (localStorage.getItem('jwt_token') === null) {
            this.$router.push('/login');
        }
    },
    async mounted() {
        try {
            const jwt_token = localStorage.getItem('jwt_token');
            if (jwt_token) {
                let result = await this.axios.post(
                    'http://localhost:3000/verifyRefreshToken',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwt_token}`
                        }
                    }
                );
                if (result.status === 200) {
                    localStorage.setItem('jwt_token', result.data.jwt_token);
                    result = await this.axios.get('http://localhost:3000/user/' + localStorage.getItem('userID'), {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                        }
                    });
                    this.userObject = result.data;
                }
            }
        } catch (err) {
            console.log(err.message);
        }
        let resultt = await this.axios.get('http://localhost:3000/user/' + this.$route.params.id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        });
        this.profileObject = resultt.data;
        console.log(this.profileObject);
        console.log(this.profileObject);
        if (this.profileObject.imgPath) {
            if (this.profileObject.imgPath.length > 0) {
                let imageResult = await this.axios.get('http://localhost:3000/' + this.profileObject.imgPath);
                if (imageResult.status === 200) {
                    document.getElementById('profilePic').src = 'http://localhost:3000/' + this.profileObject.imgPath;
                }
            }
        }
        console.log('user id = ' + this.userObject._id);
        console.log('profile id = ' + this.profileObject._id);
        console.log(this.profileObject._id === this.userObject._id);
        if (this.profileObject._id === this.userObject._id) {
            this.isEditable = true;
        } else {
            this.isEditable = false;
        }
    },
    methods: {
        tutorialDate(date) {
            return moment(date);
        }
    }
};
</script>

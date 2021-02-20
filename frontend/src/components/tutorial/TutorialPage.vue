<template>
    <div>
        <div class="container mx-auto h-screen py-16">
            <div class="text-center px-3 lg:px-0">
                <h1 class="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
                    {{ tutorialObject.title }}
                </h1>
                <p class="leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8">
                    Tutored by {{ tutorialObject.tutor.first_name }} {{ tutorialObject.tutor.last_name }}.
                </p>
                <p class="leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8">
                    Max size: {{ tutorialObject.class_size }}.
                </p>
                <p class="leading-normal text-gray-800 text-base mb-8">
                    <b>Description:</b> {{ putDotAtEnd(tutorialObject.description) }}
                </p>
                <div v-if="isVisible">
                    <a
                        :href="`https://meet.jit.si/${tutorialObject._id}#config.subject='${tutorialObject.title}'`"
                        target="_blank"
                    >
                        <button class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">
                            Meeting room
                        </button></a
                    >
                </div>
                <div v-else>
                    <button
                        @click="alertMeeting"
                        class="bg-blue-700 opacity-40 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Meeting room
                    </button>
                </div>
                <br />
                <router-link
                    v-if="!!isEditable"
                    class="h-8"
                    :to="{ name: 'Edit tutorial', params: tutorialObject }"
                    title="Edit tutorial"
                    ><button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                        Edit tutorial
                    </button>
                </router-link>
                <Comments :tutorialId="this.$route.params.id" class="bg-gray-300 text-center px-3 lg:px-0" />
            </div>
        </div>
    </div>
</template>

<script>
import Comments from './comment/Comments.vue';
export default {
    components: {
        Comments
    },
    computed: {
        getUserId() {
            return localStorage.getItem('userID');
        }
    },
    name: 'TutoriumPage',
    data() {
        return {
            tutorialObject: { tutor: { first_name: '' } },
            userObject: {},
            isEditable: {
                default: false
            },
            isVisible: {
                default: false
            }
        };
    },
    async created() {
        const jwtToken = localStorage.getItem('jwt_token');
        //user is not authorized => Remain at login page
        if (jwtToken === null) {
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

            let resultt = await this.axios.get('http://localhost:3000/tutorial/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            });
            this.tutorialObject = resultt.data;
            if (
                !this.userObject.student_in.map(tut => tut._id).includes(this.tutorialObject._id) &&
                !(this.tutorialObject.tutor._id === this.userObject._id)
            ) {
                this.isVisible = false;
            } else {
                this.isVisible = true;
            }
        } catch (err) {
            console.log(err.message);
        }
        if (this.tutorialObject.tutor._id === this.userObject._id) {
            this.isEditable = true;
        } else {
            this.isEditable = false;
        }
    },
    methods: {
        alertMeeting() {
            this.$swal.fire({
                icon: 'error',
                title: 'Not a member.',
                text: 'To have access to the meeting, join the tutorial first.'
            });
        },
        putDotAtEnd(toBePut) {
            if (toBePut) return toBePut.slice(-1) == '.' ? toBePut : toBePut + '.';
            else return '';
        }
    }
};
</script>
<style>
.gradient {
    background-image: linear-gradient(-225deg, #cbbacc 0%, #2580b3 100%);
}

.browser-mockup {
    border-top: 2em solid rgba(230, 230, 230, 0.7);
    position: relative;
    height: 60vh;
}

.browser-mockup:before {
    display: block;
    position: absolute;
    content: '';
    top: -1.25em;
    left: 1em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #f44;
    box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
}

.browser-mockup > * {
    display: block;
}
</style>

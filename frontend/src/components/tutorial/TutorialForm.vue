<template>
    <!-- component -->
    <div class="bg-grey-lighter flex flex-col">
        <div class="container pt-16 max-w-sm mx-auto flex-2 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">{{ pageTitle }}</h1>
                <form @submit.prevent="handleSubmit" method="POST">
                    <multiselect
                        v-model="lecture"
                        :options="options"
                        :multiple="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Pick lecture for tutorial"
                        label="title"
                        track-by="title"
                        :allow-empty="false"
                        :preselect-first="true"
                    >
                    </multiselect>
                    <br />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="title"
                        id="title"
                        v-model="title"
                        placeholder="Tutorial title"
                        required
                    />

                    <input
                        type="datetime-local"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="date"
                        id="date"
                        v-model="date"
                        placeholder="Tutorial date"
                        required
                    />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="description"
                        id="description"
                        v-model="description"
                        placeholder="Description"
                        required
                    />

                    <input
                        required
                        type="number"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="classSize"
                        min="1"
                        max="15"
                        id="classSize"
                        v-model="size"
                        placeholder="Class size (e.g., 5)"
                    />
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
        tutorial: {
            type: Object,
            default: () => {}
        },
        pageTitle:{
            type: String,
            default: 'Create New Tutorial'
        }
    },
    data() {
        return {
            size: '',
            lecture: '',
            title: '',
            date: '',
            description: '',
            options: [],
            buttonValue: 'Create Tutorial'
        };
    },
    async created() {
        if (Object.keys(this.tutorial || {}).length !== 0) {
            this.buttonValue = 'Edit Tutorial';
        }
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
                try {
                    let lectures = await this.axios.get(
                        'http://localhost:3000/user/' + localStorage.getItem('userID'),
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                            }
                        }
                    );
                    this.options = lectures.data.expert_of_lectures;
                    if (Object.keys(this.tutorial || {}).length !== 0) {
                        const modifiedDate = this.tutorial.date.split(':');
                        this.title = this.tutorial.title;
                        this.lecture = this.tutorial.lecture;
                        this.date = `${modifiedDate[0]}:${modifiedDate[1].substring(0, 2)}`;
                        this.description = this.tutorial.description;
                        this.size = this.tutorial.class_size;
                    }
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
            this.lecture = value._id;
        },
        handleSubmit: async function createTutorial() {
            if (this.lecture) {
                try {
                    const tutorial = {
                        class_size: this.size,
                        tutor: localStorage.getItem('userID'),
                        lecture: this.lecture,
                        title: this.title,
                        date: this.date,
                        description: this.description,
                        is_Active: true
                    };
                    var result;
                    if (Object.keys(this.tutorial || {}).length !== 0) {
                        result = await this.axios.put(
                            `http://localhost:3000/tutorial/${this.tutorial._id}`,
                            tutorial,
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                                }
                            }
                        );
                    } else {
                        result = await this.axios.post(`http://localhost:3000/tutorials`, tutorial, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                            }
                        });
                    }
                    if (result.status === 200) {
                        this.$router.push('/tutorials');
                    } else {
                        console.log('An error occured!');
                    }
                } catch (err) {
                    console.log(err.message);
                }
            } else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Field empty.',
                    text: 'Please select a lecture!'
                });
            }
        }
    }
};
</script>

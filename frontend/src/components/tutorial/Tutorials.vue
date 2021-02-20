<template>
    <div>
        <div class="flex flex-col">
            <h1 class="my-4 pb-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">Tutorials</h1>
            <div class="pt-2 relative mx-auto text-gray-600">
                <input
                    class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:shadow-outline"
                    type="search"
                    name="search"
                    v-model="searchValue"
                    placeholder="Search by subject name"
                    v-on:change="filterTut"
                />
                <button type="submit" class="absolute right-0 top-0 mt-5 mr-4" v-on:click="filterTut">
                    <svg
                        class="text-gray-600 h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        style="enable-background: new 0 0 56.966 56.966"
                        xml:space="preserve"
                        width="512px"
                        height="512px"
                    >
                        <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                        />
                    </svg>
                </button>
            </div>
            <br />
            <div class="overflow-x-auto">
                <div class="align-middle inline-block">
                    <table class="min-w-full divide-y divide-gray-200 shadow-lg">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Lecture
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Class size
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Specifics
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Tutorial page
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(tutorial, index) in filteredTuts" v-bind:key="tutorial._id">
                            <tutorials-item
                                @joinDropTut="joinDropTut"
                                v-bind:key="tutorial._id"
                                v-if="index < page * 10 && index >= (page - 1) * 10"
                                v-bind:canEdit="getUserId() == tutorial.tutor._id"
                                v-bind:tutorial="tutorial"
                                v-bind:order="tutorials.length"
                                v-bind:userLectures="userLectures"
                            />
                        </tbody>
                    </table>
                    <tutorials-pages
                        :tutorialsLength="filteredTuts.length"
                        :maxPages="Math.ceil(filteredTuts.length / 10.0)"
                        :currentPage="page"
                        @updateCurrentPage="updateCurrentPage($event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialsItem from './TutorialsItem.vue';
import TutorialsPages from './TutorialsPages.vue';

export default {
    components: { TutorialsItem, TutorialsPages },
    name: 'Tutorials',
    data() {
        return {
            tutorials: [],
            isEditable: {
                default: false,
            },
            page: 1,
            user: {},
            searchValue: '',
            filteredTuts: [],
            allTuts: [],
        };
    },
    async created() {
        try {
            //user is not authorized => Remain at login page
            if (localStorage.getItem('jwt_token') === null) {
                this.$router.push('/login');
            }
            this.allTuts = await this.axios.get('http://localhost:3000/tutorials', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
                },
            });
            this.allTuts = this.allTuts.data.filter(
                element => element.tutor != null && element.lecture != null && Date.parse(element.date) >= Date.now()
            );
            this.allTuts = this.allTuts.sort((a, b) => new Date(a.date) - new Date(b.date)); //Sort tutorials by date asc
            this.filteredTuts = this.allTuts;
            this.grabUserTuts();
        } catch {
            console.log('You are not authorized to access this page');
            localStorage.clear();
            this.$router.push('/login');
            this.$root.$refs.Navbar.reloadNav();
            console.log('Logged out');
        }
    },
    methods: {
        getUserId() {
            return localStorage.getItem('userID');
        },
        updateCurrentPage(currentPage) {
            this.page = currentPage;
        },
        filterTut() {
            this.filteredTuts = this.allTuts;
            if (this.searchValue.length > 0) {
                this.filteredTuts = this.allTuts.filter(tut =>
                    tut.lecture.title.toLowerCase().includes(this.searchValue.toLowerCase())
                );
            }
            this.updateCurrentPage(1);
        },
        async grabUserTuts() {
            try {
                const jwt_token = localStorage.getItem('jwt_token');
                if (jwt_token) {
                    let result = await this.axios.post(
                        'http://localhost:3000/verifyRefreshToken',
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${jwt_token}`,
                            },
                        }
                    );
                    if (result.status === 200) {
                        localStorage.setItem('jwt_token', result.data.jwt_token);
                        let user = await this.axios.get(
                            'http://localhost:3000/user/' + localStorage.getItem('userID'),
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
                                },
                            }
                        );
                        if (user.status === 200) {
                            this.userLectures = user.data.student_in.map(tutorial => tutorial._id);
                        }
                    }
                    this.$forceUpdate();
                } else {
                    console.log('You are not authorized to access this page');
                    localStorage.clear();
                    this.$router.push('/login');
                    this.$root.$refs.Navbar.reloadNav();
                    console.log('Logged out');
                }
            } catch (err) {
                console.log(err.message);
                localStorage.clear();
                this.$router.push('/login');
                this.$root.$refs.Navbar.reloadNav();
                console.log('Logged out');
            }
        },
        async joinDropTut(join, tutorialID) {
            try {
                const jwt_token = localStorage.getItem('jwt_token');
                if (join && !this.userLectures.includes(tutorialID)) this.userLectures.push(tutorialID);
                else if (!join & this.userLectures.includes(tutorialID)) this.userLectures = this.userLectures.filter(tutID => tutID !== tutorialID)
                if (jwt_token) {
                    let result = await this.axios.put(
                        'http://localhost:3000/user/' + localStorage.getItem('userID'),
                        { student_in: this.userLectures },
                        {
                            headers: {
                                Authorization: `Bearer ${jwt_token}`,
                            },
                        }
                    );
                    if (result.status === 200) {
                        this.grabUserTuts();
                        if (join) window.alert("You've successfully joined the tutorial!");
                        else window.alert("You've successfully dropped the tutorial!");
                    }
                } else {
                    console.log('You are not authorized to access this page');
                    localStorage.clear();
                    this.$router.push('/login');
                    this.$root.$refs.Navbar.reloadNav();
                    console.log('Logged out');
                }
            } catch (err) {
                console.log(err.message);
            }
        },
    },
};
</script>

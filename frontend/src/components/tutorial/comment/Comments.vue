<template>
    <div>
        <section class="rounded-b-lg mt-4">
            <form @submit.prevent="handleSubmit" accept-charset="UTF-8" method="post">
                <input type="hidden" />
                <br />
                <textarea
                    class="flex flex-wrap content-center m-auto w-2/3 shadow-inner p-4 border-0 mb-4 rounded-lg focus:shadow-outline text-2xl"
                    placeholder="Ask a question!"
                    cols="6"
                    rows="1"
                    id="comment_content"
                    spellcheck="false"
                ></textarea>
                <button class="font-bold py-2 px-4 w-1/3 bg-purple-400 text-lg text-white shadow-md rounded-lg">
                    Comment
                </button>
            </form>

            <div id="task-comments" class="pt-4">
                <comment-item
                    @reloadComments="reloadComment()"
                    v-bind:key="comment._id"
                    v-for="comment in comments"
                    :comment="comment"
                />
            </div>
        </section>
    </div>
</template>
<script>
import CommentItem from './CommentItem.vue';
export default {
    components: { CommentItem },
    Comment,
    props: {
        tutorialId: {
            default: ''
        }
    },
    data() {
        return {
            comments: {
                default: ''
            }
        };
    },
    async mounted() {
        this.grabAllComments();
    },
    methods: {
        reloadComment() {
            this.grabAllComments();
        },
        handleSubmit: async function postComment() {
            try {
                let comment = {
                    value: document.getElementById('comment_content').value,
                    userId: localStorage.getItem('userID')
                };

                var res = await this.axios.post('http://localhost:3000/discussion/' + this.tutorialId, comment, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                });
                if (res.status === 200) {
                    this.grabAllComments();
                    document.getElementById('comment_content').value = '';
                }
            } catch (err) {
                alert('An error occured: ', err);
            }
            return false;
        },
        async grabAllComments() {
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
                        result = await this.axios.get('http://localhost:3000/discussion/' + this.tutorialId, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                            }
                        });
                        this.comments = result.data;
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
                localStorage.clear();
                this.$router.push('/login');
                this.$root.$refs.Navbar.reloadNav();
                console.log('Logged out');
            }
        }
    }
};
</script>

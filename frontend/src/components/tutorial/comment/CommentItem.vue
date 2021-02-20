<template>
    <div
        class="bg-gray-300 rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4"
        v-if="comment.userId"
    >
        <div class="flex flex-row justify-center mr-2">
            <img
                alt="avatar"
                width="48"
                height="48"
                class="rounded-full w-10 h-10 mr-4 shadow-lg mb-4"
                :src="getImage()"
            />
            <h3>
                <router-link :to="`/profile/${comment.userId._id}`">
                    <div class="text-purple-600 font-semibold text-lg text-center md:text-left">
                        @{{ comment.userId.username }}
                    </div>
                </router-link>
                {{ getDateTime(comment.creation_date) }}
            </h3>
        </div>
        <p style="width: 100%" class="text-gray-600 text-lg text-center md:text-left">
            {{ comment.value }}
        </p>

        <div v-if="isCommenter()" style="float: right">
            <button class="content-center" title="Delete Comment">
                <img
                    src="../../../assets/full-trash.png"
                    class="h-8"
                    width="32"
                    height="25"
                    @click="deleteComment()"
                />
            </button>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        comment: {}
    },
    component: {
        moment
    },
    methods: {
        getDateTime(val) {
            return moment(val);
        },
        getImage() {
            if (this.comment.userId) {
                if (this.comment.userId.imgPath) {
                    return 'http://localhost:3000/' + this.comment.userId.imgPath;
                }
            }
            return 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';
        },
        isCommenter() {
            return this.comment.userId._id === localStorage.getItem('userID');
        },
        async deleteComment() {
            try {
                var res = await this.axios.delete('http://localhost:3000/discussion/' + this.$route.params.id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
                        CommentId: this.comment._id
                    }
                });
                if (res.status === 200) {
                    this.$emit('reloadComments');
                }
            } catch (err) {
                alert('An error occured: ', err);
            }
        }
    }
};
</script>

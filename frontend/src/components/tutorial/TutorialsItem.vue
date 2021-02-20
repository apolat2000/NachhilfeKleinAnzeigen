<template>
    <tr class="bg-white divide-y divide-gray-200">
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
            <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">
                    <p class="text-sm text-center font-medium text-gray-900">
                        {{ tutorial.lecture.title }}
                    </p>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
            <div class="text-sm font-medium text-gray-900">
                <p class="text-sm text-center font-medium text-gray-900">
                    <span v-if="tutorial.class_size == 1">
                        Private tuition<br />({{ tutorial.class_size }} Student)
                    </span>
                    <span v-else-if="tutorial.class_size < 11">
                        Small group<br />({{ tutorial.class_size }} Students)
                    </span>
                    <span v-else> Large Group<br />({{ tutorial.class_size }} Students) </span>
                </p>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ tutorial.title }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span
                v-if="tutorial.is_Active"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
            >
                Active
            </span>
            <span
                v-else
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-black-800"
            >
                Inactive
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <router-link :to="`/profile/${tutorial.tutor._id}`">
                <div class="text-sm text-gray-900">
                    {{ tutorial.tutor.first_name + ' ' + tutorial.tutor.last_name }}
                </div>
            </router-link>
            <div class="text-sm text-gray-500">{{ dateTime }}</div>
        </td>
        <td>
            <router-link class="flex justify-center" :to="`/tutorial/${tutorial._id}`"
                ><img src="../../assets/app.svg" class="h-8"
            /></router-link>
        </td>
        <td>
            <button
                v-if="userLectures.includes(tutorial._id) && !canEdit"
                class="content-center"
                title="Leave tutorial"
            >
                <img src="../../assets/Leave.png" class="h-8" @click="updateUser(false, tutorial._id)" />
            </button>
            <button
                v-if="!userLectures.includes(tutorial._id) && !canEdit"
                class="content-center"
                title="Join tutorial"
                @click="updateUser(true, tutorial._id)"
            >
                <img src="../../assets/Join.png" class="h-8" />
            </button>
            <router-link
                v-if="canEdit"
                class="flex justify-center"
                :to="{ name: 'Edit tutorial', params: tutorial }"
                title="Edit tutorial"
                ><img src="../../assets/edit.svg" class="h-8"
            /></router-link>
        </td>
    </tr>
</template>

<script>
import moment from 'moment';
export default {
    name: 'Tutorials',
    data() {
        return {
            dateTime: ''
        };
    },
    component: { moment },
    props: {
        tutorial: {
            default: ''
        },
        canEdit: {
            default: false
        },
        canDelete: {
            default: false
        },
        order: {
            default: 0
        },
        userLectures: {
            default: []
        }
    },
    mounted() {
        this.dateTime = moment(this.tutorial.date); //convert mongo date to a nicer format
    },
    methods: {
        updateUser(join, tutID) {
            this.$emit('joinDropTut', join, tutID);
        }
    }
};
</script>

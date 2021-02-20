<template>
    <div class="flex flex-col">
        <div class="shadow border-b border-gray-200">
            <table class="w-full text-left">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Creation Date
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lecture
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tutor
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Class Size
                        </th>
                        <th scope="col" class="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Meeting URL
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody
                    class="bg-white divide-y divide-gray-200"
                    v-bind:key="tutorium.id"
                    v-for="tutorium in tutoriums"
                >
                    <tutoriums-item v-bind:tutorium="tutorium" />
                </tbody>
            </table>
        </div>
        <tutoriums-pages />
    </div>
</template>

<script>
import TutoriumsItem from './TutoriumsItem.vue';
import TutoriumsPages from './TutoriumsPages.vue';

export default {
    components: { TutoriumsItem, TutoriumsPages },
    name: 'Tutoriums',
    data() {
        return {
            tutoriums: []
        };
    },

    async mounted() {
        let result = await this.axios.get('http://localhost:3000/tutoriums');
        this.tutoriums = result.data;
    }
};
</script>

<template>
    <div class="bg-white p-4 flex items-center justify-between border-t border-gray-200">
        <div class="flex-1 flex justify-between sm:hidden">
            <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                v-on:click="currentPage = previousPage()"
            >
                Previous
            </a>
            <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                v-on:click="currentPage = nextPage()"
            >
                Next
            </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p v-if="currentPage && tutorialsLength > 0" class="text-sm text-gray-700 font-medium">
                    Showing {{ 10 * (currentPage - 1) + 1 }} to
                    {{ Math.min(10 * currentPage, tutorialsLength) }} results.
                </p>
                <p v-else class="text-sm text-gray-700 font-medium">
                    Showing 0 to 0 results.
                </p>
            </div>
            <div>
                <nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                        v-on:click="
                            currentPage = previousPage();
                            updateCurrentPage();
                        "
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span class="sr-only">Previous</span>
                        <!-- Heroicon name: chevron-left -->
                        <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                    <span
                        v-for="page in maxPages"
                        v-bind:key="page"
                        v-on:click="
                            currentPage = page;
                            updateCurrentPage();
                        "
                    >
                        <a
                            v-if="page === currentPage"
                            href="#"
                            class="relative inline-flex items-center px-4 py-2 border border-black-300 bg-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-300"
                            >{{ page }}
                        </a>
                        <a
                            v-else
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >{{ page }}
                        </a>
                    </span>
                    <a
                        v-on:click="
                            currentPage = nextPage();
                            updateCurrentPage();
                        "
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span class="sr-only">Next</span>
                        <!-- Heroicon name: chevron-right -->
                        <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        tutorialsLength: {
            default: 0
        },
        maxPages: {
            default: 0
        },
        currentPage: {
            default: 1
        }
    },
    methods: {
        updateCurrentPage() {
            this.$emit('updateCurrentPage', this.currentPage);
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
            }
            return this.currentPage;
        },
        nextPage() {
            if (this.currentPage < this.maxPages) {
                this.currentPage = this.currentPage + 1;
            }
            return this.currentPage;
        }
    },
    name: 'Tutorials'
};
</script>

<template>
    <Combobox as="div">
        <div class="relative mt-2">
            <input @input="handleInput" v-model="query"
                class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <button class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>

            <div v-show="people.length > 0"
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <div v-for="person in people" :key="person.id" :value="person" as="template">
                    <li
                        :class="['relative cursor-pointer select-none py-2 pl-3 pr-9 list-none', 'hover:bg-violet-600', 'hover:text-white']">
                        <div class="flex items-center" @click="selectedPersonBuy(person)">
                            <img :src="person.avatar" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                            <span :class="['ml-3 truncate', 'font-semibold']">
                                {{ person.lastName }}
                            </span>
                        </div>

                        <span
                            :class="['absolute inset-y-0 right-0 flex items-center pr-4', 'text-white', 'text-indigo-600']">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </li>
                </div>
            </div>
        </div>
    </Combobox>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

import { ref, } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
    Combobox,
    // ComboboxButton,
    // ComboboxInput,
    // ComboboxOption,
    // ComboboxOptions,
} from '@headlessui/vue'
import * as api from '@/api/pos/index'
import { useUserOrderCardList } from '@/store/userOrders'
const cardList = useUserOrderCardList()
// interface Person {
//     name: string;
//     id: number;
//     imageUrl: string;

// }
const people = ref([

])

const query = ref('')

function debounce(func, delay) {
    let timeoutId; // 用于存储定时器的 ID

    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args); // 调用原函数
        }, delay);
    };
}
function userIdExists(userId) {
    return cardList.userOrder.some(person => person.id === userId);
}
const debouncedSearch = debounce((value) => {

    console.log(value, 123)

    api.getUserList(value).then(res => {
        people.value = res.rows
    })
}, 500)

const selectedPersonBuy = (person) => {
    people.value = []

    if (!userIdExists(person.id)) {
        query.value = ''
        cardList.addUser({
            id: person.id,
            name: person.lastName,
            old: '31',
            weight: '73kg',
            Kilometer: '6.27',
            isSignatures: person.signedChecked,
            AdultBestTime: '08:00',
            JuniorBestTime: '08:00',
            totalVouchersNum: 7,
            imageUrl: person.avatar,
            note: {},
            personTotalmoney: 0,
            productList: [

            ],
        })

    } else {
        ElMessage.error('当前用户已经存在!')

    }

}
const handleInput = () => {
    // const inputValue = a.target.value;
    debouncedSearch(query.value);
}
// watch(query, () => {
//     debouncedSearch(query.value);
// })
const selectedPerson = ref(null)

</script>

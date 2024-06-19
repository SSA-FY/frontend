<script setup>
import { lambdaAxios } from '@/utils/axios'

import { useMemberStore } from '@/stores/memberStore'

import Arrow from '@/components/icons/Arrow.vue'
import NavBar from '@/components/common/NavBar.vue'
import SimpleOkModal from '@/components/modals/SimpleOk.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const member = useMemberStore()

const router = useRouter()

const toEdit = () => {
  router.push('/edit')
}

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const isCalendarOpen = ref(false)

const toggleCalendar = () => {
  isCalendarOpen.value = !isCalendarOpen.value
}

const teams = ref([])
const points = ref([])

onMounted(async () => {
  const resTeam = await lambdaAxios().get(`/team`)
  teams.value = resTeam.data

  const resPoint = await lambdaAxios().get(`/point`)
  points.value = resPoint.data
})

const range = ref({
  start: null,
  end: null
})
</script>

<template>
  <SimpleOkModal v-if="isModalOpen" @modal-close="toggleModal">
    <div class="tw-text-start">사용내역</div>
    <div
      class="tw-w-full tw-mt-2 tw-border-solid tw-border-b-[1px] tw-border-[#808080] tw-border-opacity-75"
    ></div>
    <div class="tw-max-h-72 tw-overflow-auto">
      <div v-for="date in Object.keys(points)" class="tw-mt-2">
        <div class="tw-mb-2 tw-text-start tw-font-bold tw-underline tw-underline-offset-4">
          {{ date }}
        </div>
        <div
          v-for="point in points[date]"
          class="tw-px-2 tw-py-1 tw-flex tw-justify-between tw-border-solid tw-border-b-[1px] tw-border-[#808080] tw-border-opacity-35"
        >
          <div>{{ point.description }}</div>
          <div>
            {{ point.amount > 0 ? '+' : '-' }}
            {{ point.amount > 0 ? point.amount : -point.amount }} 마일리지
          </div>
        </div>
      </div>
    </div>
  </SimpleOkModal>
  <div class="tw-relative tw-w-11/12 tw-mx-auto tw-pt-12">
    <div class="tw-flex tw-justify-between">
      <div class="tw-font-bold tw-text-2xl">My Page</div>
      <div
        class="tw-relative -tw-bottom-1 tw-border-solid tw-border-2 tw-rounded-2xl tw-me-2 tw-px-2 tw-py-[0.5px] tw-font-bold tw-text-base tw-cursor-pointer tw-text-[#ff7a00]"
        @click="toEdit"
      >
        edit
      </div>
    </div>
    <div
      class="tw-w-full tw-absolute tw-mt-4 tw-border-solid tw-border-b-2 tw-border-[#ff7a00]"
    ></div>
    <div
      class="tw-w-full tw-px-4 tw-py-4 tw-flex tw-justify-between tw-items-center tw-mt-12 tw-border-solid tw-border-2 tw-border-[#D0D0D0] tw-rounded-xl"
    >
      <img :src="member.profileImgUrl" class="tw-h-24 tw-rounded-full" />
      <table class="tw-w-8/12 tw-table-auto tw-text-xl tw-text-center">
        <tbody>
          <tr>
            <td class="tw-text-[#ff7a00] tw-font-bold">이름</td>
            <td>{{ member.name }}</td>
          </tr>
          <tr>
            <td class="tw-text-[#ff7a00] tw-font-bold">ID</td>
            <td>{{ member.tag }}</td>
          </tr>
          <tr class="tw-cursor-pointer" @click="toggleModal">
            <td class="tw-text-[#ff7a00] tw-font-bold">마일리지</td>
            <td>{{ member.point }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tw-flex tw-justify-between tw-mt-4">
      <div class="tw-relative tw-w-full">
        <div
          class="tw-h-10 tw-flex tw-justify-center tw-items-center tw-bg-[#ff7a00] tw-rounded-lg tw-text-white tw-cursor-pointer"
          @click="toggleMenu"
        >
          <div class="tw-w-11/12 tw-text-center tw-text-lg">그룹</div>
          <Arrow
            class="tw-h-6 tw-fill-white tw-me-2"
            :class="isMenuOpen ? 'tw-rotate-90' : '-tw-rotate-90'"
          />
        </div>
        <div
          class="tw-w-full tw-absolute tw-border-solid tw-bg-white tw-border-[#ff7a00] tw-transition-all tw-duration-200 tw-ease-linear"
          :class="
            isMenuOpen
              ? 'tw-max-h-48 tw-mt-2 tw-overflow-auto tw-border-2 tw-rounded-lg'
              : 'tw-max-h-0 tw-overflow-hidden'
          "
        >
          <div v-if="teams.length > 0">
            <div class="tw-ps-4 tw-py-1 tw-text-xl tw-border-solid tw-border-[#ff7a00]">
              {{ teams[0].teamName }}
            </div>
            <div
              v-for="team in teams.slice(1)"
              class="tw-ps-4 tw-py-1 tw-text-xl tw-border-solid tw-border-[#ff7a00] tw-border-t-2"
            >
              {{ team.teamName }}
            </div>
          </div>
          <div v-else class="text-center tw-py-1 tw-text-xl">현재 참가한 팀이 없습니다.</div>
        </div>
      </div>

      <!-- <Calendar class="tw-w-[34px] tw-me-3" /> -->
      <!-- <DatePicker /> -->
    </div>
    <DatePicker v-model="range" is-range color="orange">
      <template #default="{ inputValue, inputEvents }">
        <div class="tw-mt-4 tw-flex tw-justify-between">
          <input
            class="tw-w-[50%] tw-mx-2 tw-py-1 tw-text-[#ff7a00] tw-rounded-lg tw-border-solid focus:tw-outline-none tw-border-[#ff7a00] tw-border-2 tw-text-center"
            :value="inputValue.start"
            v-on="inputEvents.start"
          />
          ~
          <input
            class="tw-w-[50%] tw-mx-2 tw-py-1 tw-text-[#ff7a00] tw-rounded-lg tw-border-solid focus:tw-outline-none tw-border-[#ff7a00] tw-border-2 tw-text-center"
            :value="inputValue.end"
            v-on="inputEvents.end"
          />
        </div>
      </template>
    </DatePicker>
    <div
      class="tw-w-full tw-h-[calc(100vh-450px)] tw-mt-4 tw-py-5 tw-px-5 tw-border-solid tw-border-2 tw-border-[#D0D0D0] tw-rounded-xl"
    >
      <div
        class="tw-w-1/3 tw-rounded tw-overflow-hidden tw-shadow-[2px_2px_10px_0px_rgba(0,0,0,0.25)]"
      >
        <img
          class="tw-w-full tw-px-2 tw-pt-2 tw-mx-auto"
          :src="member.profileImgUrl"
          alt="Sunset in the mountains"
        />
        <div class="tw-w-full tw-p-2 tw-flex tw-justify-between tw-items-end">
          <div class="tw-text-[0.8rem] tw-font-bold">12표</div>
          <div class="tw-text-[0.6rem] tw-font-bold">2024-04-01</div>
        </div>
      </div>
    </div>
  </div>
  <NavBar />
</template>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import Swal from 'sweetalert2'
import createVoteAPI from '@/apis/vote.js'

const props = defineProps({
  votee: Object,
  vote: Object
})

const voteAPI = createVoteAPI()
const emit = defineEmits(['doVote'])
const votee = props.votee

const mileageNoti = () => {
  Swal.fire({
    position: 'top-end',
    html: '<span class="custom-text">😊 마일리지 적립 +100P</span>',
    showConfirmButton: false,
    timer: 3000,
    backdrop: false,
    background: '#ffffff',
    customClass: {
      popup: 'custom-popup'
    },
    showClass: {
      popup: 'animate__animated animate__fadeInRight'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutRight'
    }
  })
}

const doVote = () => {
  voteAPI.doVote(
    props.vote.voteId,
    { voteeId: votee.id },
    () => {
      emit('doVote')
      mileageNoti()
    },
    () => {
      console.log('투표 실패')
    }
  )
}
</script>

<template>
  <div class="member-item d-flex align-items-center p-2 m-2" @click="doVote">
    <img src="./background.jpg" alt="" class="avatar rounded-circle mr-2" />
    <div>
      <div class="name ps-2">{{ votee.nickname }}</div>
      <div class="handle text-muted ps-2">@{{ votee.id }}</div>
    </div>
  </div>
</template>

<style scoped>
.member-item {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 150px;
  text-align: center;
}
.member-item:hover {
  cursor: pointer;
  transform: scale(1.2);
}
.avatar {
  width: 50px;
  height: 50px;
}
.name {
  font-weight: bold;
}
.handle {
  font-size: 0.8rem;
}
</style>

<style>
.custom-popup {
  position: absolute;
  bottom: calc(100% - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 40px;
}

.custom-text {
  font-size: 12px;
  font-weight: bold;
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

.animate__animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

.animate__fadeInRight {
  animation-name: fadeInRight;
}

.animate__fadeOutRight {
  animation-name: fadeOutRight;
}
</style>

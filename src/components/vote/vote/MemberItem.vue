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
const pointNoti = (point) => {
  Swal.fire({
    position: 'top-end',
    html: `<span class="custom-text">😊 마일리지 적립 +${point}P</span>`,
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

const createReview = (voteInfoId) => {
  Swal.fire({
    html: `
    <div class="container">
      <div class="row my-2 mx-0">
        <div class="d-flex justify-content-start p-0">
        <span class="fw-bold h4">투표 완료</span>
      </div>
      <hr>
      <div class="row my-2 mx-0 p-0">
        <div class="col-8 p-0">
          <input type="text" id="comment" class="rounded" style="height:50px" placeholder="한마디 남기기">
        </div>
        <div class="col-4 d-flex justify-content-end align-item-center p-0">
          <button type="button" id="submitButton" class="btn btn-outline-primary px-1">남기기</button>
        </div>
      </div>
    </div>`,
    showCancelButton: false,
    showConfirmButton: false,
    showCloseButton: true,
    allowOutsideClick: false,
    didOpen: () => {
      const submitButton = document.getElementById('submitButton')
      console.log(submitButton)
      submitButton.addEventListener('click', () => {
        const review = document.getElementById('comment').value
        if (!review) {
          Swal.showValidationMessage('한마디를 남겨주세요!')
        } else {
          console.log('review:', review)
          voteAPI.createReview(
            voteInfoId,
            {
              voteId: props.vote.voteId,
              review
            },
            () => {
              pointNoti(50)
            },
            () => {}
          )
        }
      })
    }
  })
}

const doVote = () => {
  voteAPI.doVote(
    props.vote.voteId,
    votee.memberTag,
    (res) => {
      if (res.status === 201) {
        emit('doVote')
        pointNoti(100)
        const voteInfoId = res.headers.location
        createReview(voteInfoId)
      }
    },
    () => {
      console.log('투표 실패')
    }
  )
}
</script>

<template>
  <div class="member-item d-flex align-items-center p-2 m-2" @click="doVote">
    <img :src="votee.profileImgUrl" alt="" class="avatar rounded-circle mr-2" />
    <div>
      <div class="name ps-2">{{ votee.nickname }}</div>
      <div class="handle text-muted ps-2">@{{ votee.memberTag }}</div>
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

.outline-orange {
  border: 1px solid #ff7a00;
}
</style>

<script setup>
import { defineProps, ref, watchEffect } from 'vue'
import VoteOpenModal from '@/components/notification/VoteOpenModal.vue'
import { lambdaAxios } from '@/utils/axios'

const lambda = lambdaAxios()

const props = defineProps({
  tag: {
    type: String,
    required: false
  },
  isOpen: {
    type: Boolean,
    required: false
  },
  opinion: {
    type: String,
    required: true
  },
  voteInfoId: {
    type: Number,
    required: true
  }
})

const member = ref({})

const showModal = ref(false)

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
const updateVote = ref(false)
const openVote = () => {
  updateVote.value = !updateVote.value
  emit('update')
}

const emit = defineEmits(['update'])

watchEffect(() => {
  if (props.isOpen && props.tag) {
    lambda
      .get(`/member/tag?tag=${props.tag}`)
      .then((res) => {
        member.value.name = res.data.name
        member.value.tag = res.data.tag
        member.value.img = res.data.profileImgUrl
      })
      .catch((error) => {
        console.log(error)
      })
  }
})
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between p-2 border-bottom">
      <div class="d-flex align-items-center">
        <img :src="member ? member.img : '/src/assets/imgs/default-img.webp'" alt="" width="40" />
        <div class="ms-3">
          <div class="d-flex flex-column">
            <div>
              <span class="member-name" v-if="member.name">{{ member.name }}</span>
              <span class="member-tag" v-if="member.tag">@{{ member.tag }}</span>
            </div>
          </div>
          <p class="member-opinion m-0">{{ opinion }}</p>
        </div>
      </div>
      <button v-if="!props.isOpen" class="btn btn-sm open-btn" @click="openModal">확인</button>
    </div>
    <VoteOpenModal
      v-if="showModal"
      :voteInfoId="props.voteInfoId"
      :opinion="opinion"
      :closeModal="closeModal"
      :member="member"
      @open-vote="openVote"
    />
  </div>
</template>

<style scoped>
.member-name {
  font-size: 18px;
  margin-right: 10px;
}
.member-tag {
  font-size: 18px;
}
.border-bottom {
  border-bottom: 1px solid #dcdcdc;
}
.open-btn {
  border: #ff7a00 1px solid;
  color: #ff7a00;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.open-btn:hover,
.open-btn:focus,
.open-btn:active {
  background-color: #ff7a00;
  color: white;
}
.member-opinion {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}
</style>

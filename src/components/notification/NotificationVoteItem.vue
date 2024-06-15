<script setup>
import { defineProps, ref } from 'vue'
import VoteOpenModal from '@/components/notification/VoteOpenModal.vue'

const props = defineProps({
  user: {
    type: Object,
    required: false
  },
  isOpen: {
    type: Boolean,
    required: false
  },
  comment: {
    type: String,
    required: true
  }
})

const showModal = ref(false)

function openModal() {
  showModal.value = true
  console.log(showModal.value)
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between p-2 border-bottom">
      <div class="d-flex align-items-center">
        <img :src="user ? user.profile : '/src/assets/imgs/default-img.webp'" alt="" width="40" />
        <div class="ms-3">
          <div class="d-flex flex-column">
            <div>
              <span class="user-name" v-if="user">{{ user.name }}</span>
              <span class="user-email" v-if="user">{{ user.email }}</span>
            </div>
          </div>
          <p class="user-comment m-0">{{ comment }}</p>
        </div>
      </div>
      <button class="btn btn-sm open-btn" @click="openModal">확인</button>
    </div>
    <VoteOpenModal v-if="showModal" :comment="comment" :closeModal="closeModal" />
  </div>
</template>

<style scoped>
.user-name {
  font-size: 18px;
  margin-right: 10px;
}
.user-email {
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
.user-comment {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}
</style>

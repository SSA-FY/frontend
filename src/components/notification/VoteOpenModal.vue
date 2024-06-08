<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  comment: {
    type: String,
    required: true
  },
  closeModal: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-dialog-centered">
      <div class="modal-wrapper">
        <div class="modal-content">
          <div class="modal-header">
            <div class="border-bottom border-2 mb-2 ms-2 w-100">
              <h5 class="modal-title mb-1">{{ comment }}</h5>
            </div>
          </div>
          <div class="modal-body mb-3 d-flex flex-column ms-2 info-msg">
            <span>정말로</span>
            <span>마일리지를 사용하여</span>
            <span>친구를 열람하시겠어요?</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm open-btn" @click="closeModal">확인</button>
            <button type="button" class="btn btn-sm close-btn ms-2" @click="closeModal">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-dialog-centered {
  max-width: 500px;
  width: 90%;
}
.modal-wrapper {
  background-color: white;
  width: 80vw;
  padding: 20px;
  border-radius: 10px;
}
.close-btn,
.open-btn {
  border: #ff7a00 1px solid;
  color: #ff7a00;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.close-btn:hover,
.close-btn:focus,
.close-btn:active,
.open-btn:hover,
.open-btn:focus,
.open-btn:active {
  background-color: #ff7a00;
  color: white;
}

.info-msg {
  font-size: 18px;
}
</style>

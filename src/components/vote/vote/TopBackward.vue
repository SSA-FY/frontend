<script setup></script>

<template>
  <div class="s-top">
    <svg
      @click="$router.go(-1)"
      class="s-back"
      width="20"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.292152 11.2128C-0.097384 10.8188 -0.097384 10.1822 0.292152 9.78722L9.53714 0.427512C10.0995 -0.142504 11.0144 -0.142504 11.5777 0.427512C12.14 0.997527 12.14 1.92265 11.5777 2.49267L3.66913 10.5005L11.5777 18.5063C12.14 19.0774 12.14 20.0025 11.5777 20.5725C11.0144 21.1425 10.0995 21.1425 9.53714 20.5725L0.292152 11.2128Z"
        fill="black"
      />
    </svg>
  </div>
</template>

<style scoped>
.s-top {
  height: 42px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.s-back {
  margin: 8px 0 0 10px;
  display: inline-block;
  cursor: pointer;
  padding: 0 0 0 4px;
}
</style>

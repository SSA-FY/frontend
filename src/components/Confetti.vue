<script setup>
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import { onMounted, ref } from 'vue'

const canvas = ref(null)
onMounted(() => {
  const customConfetti = confetti.create(canvas.value, {
    resize: true,
    useWorker: true
  })

  const count = 200
  const defaults = {
    origin: { y: 0.7 }
  }

  const fire = (particleRatio, opts) => {
    customConfetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55
  })
  fire(0.2, {
    spread: 60
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  })
})
</script>

<template>
  <canvas
    class="tw-absolute tw-w-full tw-max-w-[500px] tw-h-screen tw-top-0 tw-z-100"
    ref="canvas"
  />
</template>

<script setup></script>

<template>
  <nav class="fixed-bottom border-top bg-white">
    <div class="container-fluid d-flex justify-content-around align-items-center">
      <RouterLink to="/notification">
        <div>
          <img src="/src/assets/imgs/bell-svgrepo-com.svg" width="25" alt="Bell Icon" />
        </div>
      </RouterLink>
      <RouterLink to="/group">
        <div class="nav-link text-center">
          <img
            class="rounded-pill"
            src="/src/assets/imgs/logo_circle_800.png"
            alt="Logo"
            width="50"
            height="50"
          />
        </div>
      </RouterLink>
      <RouterLink to="/mypage">
        <div>
          <img src="/src/assets/imgs/person-svgrepo-com.svg" width="35" alt="Person Icon" />
        </div>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  z-index: 100;
  background-color: white;
  min-width: 350px;
  max-width: 500px;
}
</style>

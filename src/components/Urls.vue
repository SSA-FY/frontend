<script setup></script>

<template>
  <div>
    <p class="d-inline-flex gap-1">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        URL 목록
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="list-group">
        <router-link class="list-group-item list-group-item-action s-bb" to="/">/</router-link>
        <router-link class="list-group-item list-group-item-action" to="/login">/login</router-link>
        <router-link class="list-group-item list-group-item-action" to="/signup"
          >/signup</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/signup-success"
          >/signup-success</router-link
        >
        <router-link class="list-group-item list-group-item-action s-bb" to="/mypage"
          >/mypage</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/group">/group</router-link>
        <router-link class="list-group-item list-group-item-action" to="/group/create"
          >/group/create</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/group/create-success"
          >/group/create-success</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/group/detail"
          >/group/detail</router-link
        >
        <router-link class="list-group-item list-group-item-action s-bb" to="/group/edit"
          >/group/edit</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/notification"
          >/notification</router-link
        >

        <router-link class="list-group-item list-group-item-action" to="/notification/vote"
          >/notification/vote</router-link
        >

        <router-link
          class="list-group-item list-group-item-action s-bb"
          to="/notification/invitation"
          >/notification/invitation</router-link
        >

        <router-link class="list-group-item list-group-item-action" to="/vote">/vote</router-link>

        <router-link class="list-group-item list-group-item-action" to="/vote/finish"
          >/vote/finish</router-link
        >

        <router-link class="list-group-item list-group-item-action s-bb" to="/vote/create"
          >/vote/create</router-link
        >

        <router-link class="list-group-item list-group-item-action" to="/boards"
          >/boards</router-link
        >

        <router-link class="list-group-item list-group-item-action s-bb" to="/board/1"
          >/board/1</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.s-bb {
  border-bottom: solid 1px blue;
}
</style>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-drawer elevated show-if-above bordered :width="180">
        <q-list>
          <q-item-label header class="text-h6">本校荣誉榜</q-item-label>
          <q-item>
            <q-btn icon="emoji_events" color="blue" @click="toPage('honorBorder')">本校荣誉榜</q-btn>
          </q-item>
          <q-separator></q-separator>
          <q-item-label header class="text-h6">系统荣誉榜</q-item-label>
          <q-item>
            <q-btn icon="emoji_events" color="orange">富豪榜</q-btn>
          </q-item>
          <q-item>
            <q-btn icon="emoji_events" color="green">AC榜</q-btn>
          </q-item>
          <q-item>
            <q-btn icon="emoji_events" color="red">积分榜</q-btn>
          </q-item>
        </q-list>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPage(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

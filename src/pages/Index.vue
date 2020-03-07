<template>
  <q-page class="row q-mt-lg">
    <q-space></q-space>
    <div class="text-center">
      <p class="text-h5 text-primary">这里是主页，还没想好做成什么样</p>
      <p class="text-h5 text-primary">如果你有好的想法，通过左下角的【BUG反馈】选择【界面问题】提交给我哦</p>
      <p class="text-h5 text-negative">V0.0.X版本不再支持，请耐心等待功能迁移（SOOOOOOOOON）</p>
    </div>
    <q-space></q-space>
  </q-page>
</template>

<script>
export default {
  methods: {
    test() {
      this.$axios.get("/test/test");
    }
  }
};
</script>

<template>
  <q-page class="row">
    <q-space></q-space>
    <q-card class="q-ma-md my-card text-black bg-grey-2">
      <q-card-section>
        <div class="text-h4">现任开发团队</div>
      </q-card-section>
      <q-card-section>
        <q-list class bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">指导老师</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">陈义</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5 row">
                  开发组组长
                  <q-space></q-space>
                  <q-btn no-caps color="primary" @click="callLeader">联系组长 wyxworkmail@163.com</q-btn>
                </div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">系统设计</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">前端开发</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔、钟美林</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">后端开发</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔、钟美林</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">美工设计</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">系统测试</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">系统运维</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">系统集成</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">吴宇翔、吴盛涛</div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                <div class="text-h5">场外援助</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">魏惠新</div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-space></q-space>
  </q-page>
</template>

<script>
  export default {
    methods: {
      callLeader() {
        window.open("mailto:wyxworkmail@163.com");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-card {
    width: 50%;
  }
</style>

<template>
  <q-page class="row">
    <q-space />
    <q-card class="q-ma-md my-card text-black bg-grey-2">
      <q-card-section>
        <div class="text-h4">开发日志</div>
      </q-card-section>
      <q-card-section>
        <q-list class bordered separator>
          <q-item v-for="item in info" :key="item" v-ripple clickable @click="toUrl(item.url)">
            <q-item-section>
              <q-item-label>
                <div class="text-h5">{{item.name}}</div>
              </q-item-label>
              <q-item-label caption>
                <div class="text-h6">{{item.url}}</div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-space />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      info: [
        {
          name: "Web后端项目",
          url: "https://github.com/axiangcoding/CodingFirstApiSys"
        },
        {
          name: "Web前端项目",
          url: "https://github.com/axiangcoding/CodingFirstWebCli"
        },
        {
          name: "前端Demo（仅供页面展示）",
          url: "https://axiangcoding.github.io/"
        }
      ]
    };
  },
  methods: {
    toUrl(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 50%;
}
</style>

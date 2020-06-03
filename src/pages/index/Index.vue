<template>
  <q-page>
    <q-carousel
      class="carousel-body bg-grey-2 text-black-2 shadow-1 rounded-borders"
      height="200px"
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide img-src name="1" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">这里是广告栏位1</div>
      </q-carousel-slide>
      <q-carousel-slide img-src name="2" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">这里是广告栏位2</div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row">
      <q-space></q-space>
      <!-- <q-card class="col-6">
        <q-card-section>
          <q-parallax src="https://i.loli.net/2020/03/04/icwEGomvusd9B6Y.jpg">
            <p class="text-h5 bg-white text-primary">这里是主页，还没想好做成什么样</p>
            <p class="text-h5 bg-white text-primary">如果你有好的想法，通过左下角的【BUG反馈】选择【界面问题】提交给我哦</p>
            <p class="text-h5 bg-white text-negative">V0.0.X版本不再支持，请耐心等待功能迁移（SOOOOOOOOON）</p>
          </q-parallax>
        </q-card-section>
      </q-card>-->
      <div class="text-center"></div>
      <q-space></q-space>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: "1"
    };
  }
};
</script>

<style lang="scss" scoped>
.carousel-body {
}
</style>

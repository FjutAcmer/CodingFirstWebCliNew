<template>
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
    <q-carousel-slide
      v-for="item of data"
      :key="item.name"
      :name="item.name"
      class="column no-wrap flex-center"
    >
      <h4>
        <strong>{{item.text}}</strong>
      </h4>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  data() {
    return {
      slide: "1",
      data: [
        {
          name: "1",
          text: "(^o^)/~新版快迁移完了"
        },
        {
          name: "2",
          text: "凸(艹皿艹 )但是还是没人用"
        },
        {
          name: "3",
          text: "其实还有很多BUG没修，要死了要死了"
        },
        {
          name: "4",
          text: "现任开发团队：吴宇翔 钟美林"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>

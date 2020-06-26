<template>
  <q-page>
    <IndexCarousel></IndexCarousel>
    <div class="main-body row">
      <div class="left-body">
        <IndexLeftSide></IndexLeftSide>
      </div>
      <div class="right-body">
        <IndexRightSide></IndexRightSide>
      </div>
    </div>
  </q-page>
</template>

<script>
  import IndexCarousel from "./IndexCarousel.vue";
  import IndexLeftSide from "./IndexLeftSide.vue";
  import IndexRightSide from "./IndexRightSide.vue";

  export default {
    data() {
      return {};
    },
    components: {
      IndexCarousel,
      IndexLeftSide,
      IndexRightSide
    }
  };
</script>

<style lang="scss" scoped>
  .main-body {
    width: 95%;
    margin: auto;

    .left-body {
      width: 70%;
    }

    .right-body {
      width: 30%;
    }
  }
</style>

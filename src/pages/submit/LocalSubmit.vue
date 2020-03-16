<template>
  <q-page>
    <q-tabs v-model="tab" dense class="bg-grey-3" align="justify" inline-label narrow-indicator>
      <q-tab name="submit" icon="school" label="提交解答" />
      <q-tab name="solve" icon="live_help" label="优秀题解" />
      <q-tab name="detail" icon="details" label="题目详情" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="submit">
        <ProblemInfo></ProblemInfo>
      </q-tab-panel>

      <q-tab-panel name="solve">优秀题解</q-tab-panel>

      <q-tab-panel name="detail">题目详情</q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import ProblemInfo from "pages/submit/LocalProblemInfo";
export default {
  components: {
    ProblemInfo
  },
  data() {
    return {
      tab: "submit"
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>

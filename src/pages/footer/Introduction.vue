<template>
  <q-page>
    <q-banner class="text-white text-center bg-positive q-mb-md">
      <div class="text-h6">你知道这个项目的渊源吗？</div>
      <div class="text-h6">如果不知道，往下看，给你科普点小知识</div>
      <div class="text-h6">当然，以下的时间线都是根据记忆还原的，如果你曾是故事里的一员，觉得故事有误，请通过页面最下方的【开发团队】联系我</div>
      <div class="text-h6"></div>
    </q-banner>
    <div class="row q-gutter-md q-mb-sm">
      <q-timeline layout="comfortable" side="right" color="secondary">
        <q-timeline-entry heading>T^T Online Judge</q-timeline-entry>
        <q-timeline-entry title="渊源" subtitle="最早可追溯于2015年" side="left">
          <div>出于种种原因，朱建华学长开发T^T Online Judge，并作为福建工程学院的在线评测系统使用至今</div>

          <div>本系统的部分功能参照T^T Online Judge</div>
          <div>本地题目集的初始数据和评测机程序由朱建华学长提供</div>
        </q-timeline-entry>

        <q-timeline-entry title="现状" subtitle="2015年至今" side="right">
          <div>朱建华学长带领团队持续开发和维护T^T Online Judge至今</div>
          <div>
            可戳
            <a href="http://www.fjutacm.com" target="_blank">http://www.fjutacm.com</a> 查看和使用
          </div>
          <div>但因项目开发年代较为久远，目前已经没有继续开发</div>
        </q-timeline-entry>

        <q-timeline-entry heading>FJUT Online Judge 3.0</q-timeline-entry>

        <q-timeline-entry title="渊源" subtitle="2019年03月 - 2019年06月" side="left">
          <div>T^T Online Judge虽有团队维护，但已经没人开发</div>
          <div>出于可持续发展的目的，迟进涛学长和陆滨学长重新开发了3.0版本</div>
          <div>3.0 版本为全新的构架，采用前后端分离模式，后端采用了Spring、SpringMVC、Mybaits（简称SSM）框架，前端采用了Vue框架</div>
          <div>该版本为515创新实验室主导，陈义老师任指导老师</div>
        </q-timeline-entry>

        <q-timeline-entry title="现状" subtitle="2019年07月 - 2019年10月" side="right">
          <div>由于项目为二位学长的毕业设计，故只是一个原型，并未开发完整也没有更多同学参与团队开发</div>
          <div>项目在二位学长毕业后，交由吴宇翔同学（也就是包工头阿翔）开发</div>
        </q-timeline-entry>

        <q-timeline-entry heading>CodingFirst 0.0.X</q-timeline-entry>

        <q-timeline-entry title="渊源" subtitle="2019年07月 - 2020年02月" side="left">
          <div>吴宇翔同学带领团队在 FJUT Online Judge 3.0的基础上进行了艰苦的开发（实际上包工头阿翔写了90%的代码 TVT ）</div>
          <div>项目前端采用更新版本的Vue开发，项目后端采用Springboot开发，同时完全重新彻底地改造了数据库</div>
          <div>为了更贴近项目开发而不是做成毕业设计，引入了一系列内容</div>
          <div>项目部署在了阿里云上，并开启了内测</div>
          <div>项目正式改名为 CodingFirst | 一码当先</div>
          <div>项目获得 2019年第十届中国计算机学会软件服务创新大赛二等奖</div>
          <div>在此特别感谢 吴盛涛同学，郑佳缘同学，钟美林同学，康志江同学，陈梓良同学等的协助开发</div>
        </q-timeline-entry>

        <q-timeline-entry title="现状" subtitle="2019年07月 - 2019年10月" side="right">
          <div>由于前端界面很丑（大家都这么说），项目进入内测阶段无人测试（毕竟测试的同学也是用爱发电，不能强制）</div>
          <div>项目最终闲置（然后包工头就咕咕咕了）</div>
        </q-timeline-entry>

        <q-timeline-entry heading>CodingFirst 1.0.X</q-timeline-entry>

        <q-timeline-entry title="渊源" subtitle="2019年10月 - 2020年02月" side="left">
          <div>由于项目在某次比赛中水了，莫得名次，打击了团队的热情（其实是打击了包工头阿翔的热情），项目停滞开发</div>
          <div>然而恰逢疫情肆虐，吴宇翔同学闲得无聊到处逛小网站，无意间看到了一个漂亮的组件库Quasar</div>
          <div>得，来都来了，不写点什么吗？</div>
        </q-timeline-entry>

        <q-timeline-entry title="现状" subtitle="2020年02月 - 至今" side="right">
          <div>项目重启了，如图所示</div>
          <div>但是大家伙秉持了咕咕咕的优良传统，还是只有包工头阿翔一个人开发</div>
        </q-timeline-entry>

        <q-timeline-entry title="未来" subtitle="???" side="right">
          <div>根据某种周期律，如果项目在某届学生中开发产生了断层，那项目就黄了</div>
          <div>所以万一包工头阿翔咕了，这项目不就没了？</div>
          <div>所以，年轻的同学们啊，愿不愿意让自己的名字出现在开发团队名单里呢？</div>
          <q-btn color="warning">加入我们吧！</q-btn>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>

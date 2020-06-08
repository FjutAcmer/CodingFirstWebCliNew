<template>
  <div>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="emoji_events"></q-icon>积分榜
        </div>
      </q-card-section>
      <q-card-section>
        <el-table :data="ratingTop" :cell-style="{padding:5+'px'}">
          <el-table-column type="index" label="#" min-width="35"></el-table-column>
          <el-table-column label="用户名" min-width="50">
            <template slot-scope="scope">
              <span
                :class="selectColor(scope)"
                @click="toUser(scope.row.username)"
              >{{scope.row.nick}}</span>
            </template>
          </el-table-column>
          <el-table-column label="积分值" min-width="30">
            <template slot-scope="scope">
              <span :class="selectColor(scope)">{{scope.row.rating}}</span>
            </template>
          </el-table-column>
        </el-table>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="emoji_events"></q-icon>AC榜
        </div>
      </q-card-section>
      <q-card-section>
        <el-table :data="acTop" :cell-style="{padding:5+'px'}">
          <el-table-column type="index" label="#" min-width="35"></el-table-column>
          <el-table-column label="用户名" min-width="50">
            <template slot-scope="scope">
              <span
                :class="selectColor(scope)"
                @click="toUser(scope.row.username)"
              >{{scope.row.nick}}</span>
            </template>
          </el-table-column>
          <el-table-column label="AC题数" min-width="30">
            <template slot-scope="scope">
              <span :class="selectColor(scope)">{{scope.row.acNum}}</span>
            </template>
          </el-table-column>
        </el-table>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="emoji_events"></q-icon>富豪榜
        </div>
      </q-card-section>
      <q-card-section>
        <el-table :data="acbTop" :cell-style="{padding:5+'px'}">
          <el-table-column type="index" label="#" min-width="35"></el-table-column>
          <el-table-column label="用户名" min-width="50">
            <template slot-scope="scope">
              <span
                :class="selectColor(scope)"
                @click="toUser(scope.row.username)"
              >{{scope.row.nick}}</span>
            </template>
          </el-table-column>
          <el-table-column label="ACB" min-width="30">
            <template slot-scope="scope">
              <span :class="selectColor(scope)">{{scope.row.acb}}</span>
            </template>
          </el-table-column>
        </el-table>
      </q-card-section>
    </q-card>
    <!-- <q-card class="q-ma-sm">
      <q-card-section class="bg-blue">
        <div class="text-body1 text-white">
          <q-icon name="emoji_events"></q-icon>活跃榜
        </div>
      </q-card-section>
      <q-card-section class="text-body">排行榜</q-card-section>
    </q-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratingTop: "",
      acTop: "",
      acbTop: "",
      activeTop: ""
    };
  },
  mounted() {
    this.getAllTop();
  },
  methods: {
    selectColor(scoped) {
      if (scoped.$index === 0) {
        return "border-level-five";
      } else if (scoped.$index >= 1 && scoped.$index < 6) {
        return "border-level-four";
      } else {
        return "border-level-three";
      }
    },
    async getAllTop() {
      let params = new URLSearchParams({
        pageNum: 1,
        pageSize: 10
      });
      let dataRank = await this.$axios.get("/border/mini", params);
      this.ratingTop = dataRank.datas[0];
      this.acTop = dataRank.datas[1];
      this.acbTop = dataRank.datas[2];
      this.activeTop = dataRank.datas[3];
    }
  }
};
</script>

<style lang="scss" scoped>
.border-level-one {
  color: darkcyan;
  &:hover {
    cursor: pointer;
  }
}

.border-level-two {
  color: blue;
  &:hover {
    cursor: pointer;
  }
}

.border-level-three {
  color: #ff0080;
  &:hover {
    cursor: pointer;
  }
}

.border-level-four {
  color: #ff0000;
  &:hover {
    cursor: pointer;
  }
}

.border-level-five {
  color: #ff8000;
  &:hover {
    cursor: pointer;
  }
}
</style>

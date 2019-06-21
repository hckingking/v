<template>
  <div class="content">
    <Calendar
      ref="Calendar"
      :markDateMore="arr"
      :markDate="arr2"
      v-on:isToday="clickToday"
      agoDayHide="1530115221"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from './calendar/index'
export default {
  name: 'demo',
  data() {
    return {
      arr2: [],
      arr: []
    }
  },
  components: {
    Calendar
  },
  methods: {
    clickDay(data) {
      console.log('选中了', data) // 选中某天
      this.$toast('选中了' + data)
    },
    clickToday(data) {
      console.log('跳到了本月今天', data) // 跳到了本月
    },
    changeDate(data) {
      this.$toast('切换到的月份为' + data)
      console.log('左右点击切换月份', data) // 左右点击切换月份
    },
    demo() {
      this.$refs.Calendar.ChoseMonth('2018-12-13') // 跳到12月12日选中12月12日
    }
  },
  created() {

  }
}
</script>

<style scoped>

.wh_container >>> .mark1 {
  background-color: orange;
}

.wh_container >>> .mark2 {
  background-color: skyblue;
}
.wh_content_item > .wh_isMark {
  background:  rgba(12, 219, 167, 0.384);
}

</style>
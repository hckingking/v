<template>
  <div>
    <div align="left">
      <el-button size="mini" plain title="查询" icon="god god-icon-test1" circle @click="getTabs()" class="bdStyle"></el-button>
    </div>
    <div id="main" style="width: 600px;height: 500px;margin:auto"></div>
  </div>
</template>
<script>
import { getPieTabs } from '@/api/ip/city'
import echarts from 'echarts'
export default {
  name: 'charts',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.getTabs()
  },
  methods: {
    getTabs() {
      var elem = document.getElementById('main')
      console.log(elem)
      var myChart = echarts.init(elem)
      getPieTabs().then(response => {
        myChart.setOption({
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              dataZoom: {
                show: true
              },
              saveAsImage: { show: true },
              magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] }
            }
          },
          title: {
            text: '神君集团九月报表'
          },
          tooltip: { show: true },
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: response.data.data.opinion
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'line',
              data: response.data.data.opinionData
            }
          ]
        })
      })
      myChart.on('click', params => {
        console.log(params)
      })
    }
  }
}
</script>

<template>
  <div>
    <div align="left">
      <el-button size="mini" plain title="查询" icon="el-icon-refresh" circle @click="getTabs()"></el-button>
    </div>
    <div id="mains" style="width: 300px;height: 400px;margin:auto"></div>
  </div>
</template>
<script>
import { getPieTabs } from '@/api/ip/city'
import echarts from 'echarts'
export default {
  name: 'tab',
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
      var elem = document.getElementById('mains')
      console.log(elem)
      var charts = echarts.init(elem)
      getPieTabs().then(response => {
        charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            bottom: 10,
            left: 'right',
            data: response.data.data.opinion
          },
          series: [
            {
              name: 'god',
              type: 'pie',
              radius: ['40%', '70%'],
              data: response.data.data.opinionData,
              itemStyle: {
                normal: {
                  borderWidth: 10,
                  borderColor: '#fff'
                }
              },
              color: [
                '#00C5E9',
                'rgba(219, 12, 64, 0.384)',
                'rgb(228, 192, 35)',
                'rgba(12, 219, 167, 0.384)',
                'rgb(196, 199, 27)'
              ]
            }
          ]
        })
      })
      // 饼形图的点击事件
      charts.on('click', params => {
        console.log(params)
      })
    }
  }
}
</script>

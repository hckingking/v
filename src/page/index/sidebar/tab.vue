<template>
  <div>
   <div id="main" style="width: 500px;height: 400px;margin:auto"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'tab',
  data() {
    return {
      opinion: ['A', 'B', 'C', 'D'],
      opinionData: [
        { value: 25, name: 'A' },
        { value: 19, name: 'B' },
        { value: 35, name: 'C' },
        { value: 21, name: 'D' }
      ]
    }
  },
  mounted() {
    console.log(document.getElementById('main'))
    this.charts = echarts.init(document.getElementById('main'))
    this.charts.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'right',
        data: this.opinion
      },
      series: [
        {
          name: 'god',
          type: 'pie',
          radius: ['40%', '70%'],
          data: this.opinionData,
          itemStyle: {
            normal: {
              borderWidth: 10,
              borderColor: '#fff'
            }
          },
          color: ['#00C5E9', 'rgba(219, 12, 64, 0.384)', 'rgb(228, 192, 35)', 'rgba(12, 219, 167, 0.384)']
        }
      ]
    })
    // 饼形图的点击事件
    this.charts.on('click', params => {
      console.log(params)
    })
  },
  methods: {}
}
</script>

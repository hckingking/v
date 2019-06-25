<template>
  <div>
    <div style="height:400px;width:100%" ref="myEchart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/world.js'
export default {
  name: 'world',
  data() {
    return {
      title: '图表',
      placeholder: '用户',
      find: '2', // 1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      window.onresize = echarts.init(this.$refs.myEchart).resize
      // 把配置和数据放这里
      this.chart.setOption({
        backgroundColor: '#eee',
        title: {
          left: '40%',
          top: '0px',
          textStyle: {
            color: '#fff',
            opacity: 0.7
          }
        },
        dataRange: {
          show: false,
          min: 0,
          max: 1000000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'world',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              areaColor: '#37376e',
              borderColor: '#000'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'world',
            mapLocation: {
              y: 100
            },
            data: [
              {
                name: 'Canada',
                value: 34126.24
              },
              {
                name: 'Switzerland',
                value: 7830.534
              },
              {
                name: 'Chile',
                value: 17150.76
              },
              {
                name: 'China',
                value: 1359821.465
              },
              {
                name: 'France',
                value: 63230.866
              },
              {
                name: 'Greenland',
                value: 56.546
              },

              {
                name: 'India',
                value: 12054.648
              },

              {
                name: 'Japan',
                value: 127352.833
              }
            ],
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      })
    }
  }
}
</script>
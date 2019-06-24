
<template>
  <div align="center">
    <div id="container" style="width:600px; height:400px"></div>
  </div>
</template>

<script>
import MapLoader from '@/assets/img/AMap.js'
export default {
  name: 'maps',
  data() {
    return {
      map: null
    }
  },
  mounted() {
    console.log('地图加载!!!!!')
    this.lookMap()
  },
  methods: {
    // 查看位置
    lookMap() {
      this.$nextTick(function() {
        console.log('地图加载中!!!!!')
        this.mapReq()
      })
    },
    // 获取高德地图api
    mapReq() {
      const that = this
      MapLoader().then(
        AMap => {
          console.log('地图加载成功!!!!')
          AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,
              // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonOffset: new AMap.Pixel(10, 20),
              // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,
              // 定位按钮的排放位置, RB表示右下
              buttonPosition: 'RB'
            })

            geolocation.getCurrentPosition()

            AMap.event.addListener(geolocation, 'complete', e => {
              console.log(e) // 定位成功之后做的事 // 定位成功之后再定位处添加一个marker
              console.log(e.position.lat)
              console.log(e.position.lng)

              var mapSet = []

              mapSet[1] = e.position.lat
              mapSet[0] = e.position.lng
              console.log(mapSet)

              that.map = new AMap.Map('container', {
                resizeEnable: true,
                center: mapSet, // 地图标记title
                zoom: 12 // 地图视图缩放级别
              })
              const marker = new AMap.Marker({
                position: that.map.getCenter()
              })
              marker.setMap(that.map)
            })

            AMap.event.addListener(geolocation, 'error', e => {
              console.log(e) // 定位失败做的事
            })
          })
        },
        e => {
          console.log('地图加载失败', e)
        }
      )
    }
  }
}
</script>
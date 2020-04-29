import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtIcon, AtMessage, AtTag } from "taro-ui";
import Cart from "../../components/cart/cart";
import memoryUtil from "../../util/memoryUtil";

class CommodityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '商品详情'
  };
  componentWillMount = async () => {
    this.getRemoteData()
  };
  componentDidMount = () => {
    this.timeID = setInterval(async () => {
      this.getRemoteData()
    }, 100)
  };
  componentWillUnmount = () => {
    clearInterval(this.timeID)
  };
  getRemoteData = async () => {
    const res = await Taro.request({
      url: 'https://archie.zone/product/search-id?id='+this.$router.params.id,
      method: 'GET'
    });
    if(res.statusCode === 200 ){
      if(res.data.status === 0){
        let data = res.data.data;
        data.count = 0;
        memoryUtil.cart.forEach(item => {
          if(data.id === item.id) data.count = item.count;
        });
        this.setState({data: data})
      }else{
        Taro.atMessage({
          'type': 'warning',
          'message': '请求失败! 服务器发生了未知错误'
        })
      }
    }else{
      Taro.atMessage({
        'type': 'warning',
        'message': '请求失败! 请检查网络连接状况'
      })
    }
  };
  handleAdd = (item1) => {
    let obj = {
      id: item1.id,
      name: item1.name,
      count: 1,
      picture: item1.pictures.split(',')[0],
      price: item1.price,
      discount_gold: item1.discount_gold,
      discount_platinum: item1.discount_platinum,
      discount_diamond: item1.discount_diamond,
      integral: item1.integral
    };
    let tag = 0;
    let cart = memoryUtil.cart.map(item2 => {
      if(item1.id === item2.id){
        item2.count++;
        tag = 1
      }
      return item2
    });
    if(tag === 0) cart.push(obj);
    memoryUtil.cart = cart;
  };
  handleSub = (item1) => {
    let cart = [];
    memoryUtil.cart.forEach(item2 => {
      if(item1.id === item2.id){
        if(item2.count > 1){
          item2.count--;
          cart.push(item2)
        }
      }else{
        cart.push(item2)
      }
    });
    memoryUtil.cart = cart;
  };
  render () {
    return (
      <View style='height: 100vh; padding: 10px 10px 50px; background: #F0F0F0'>
        <AtMessage />
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          indicatorDots
          style='height: 300px'
        >
          {
            this.state.data.pictures ? this.state.data.pictures.split(',').map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image
                    style='height: 300px; width: 100%; margin-bottom: 10px'
                    src={'https://archie.zone/upload/'+item}
                    mode='scaleToFill'
                  />
                </SwiperItem>
              )
            }) : (
              <View style='height: 300px; width: 100%'>
                <AtTag value='image' />
                <text>暂无图片</text>
              </View>
            )
          }
        </Swiper>

        <View style='margin-top: 10px; padding: 10px 10px 20px 10px; width: 100%; background: white; box-sizing: border-box'>
          <View style='font-weight: bolder; font-size: 20px'><Text>{this.state.data.name}</Text></View>
          <View><Text>标签：<AtTag size='small'>{this.state.data.tag}</AtTag></Text></View>
          <View><Text>可得积分：{this.state.data.integral}</Text></View>
          {/*<View>月销：22份</View>*/}
          <View><Text>简介：{this.state.data.introduce}</Text></View>
          <View style='display: flex; flex-direction: row; margin-top: 12px'>
            <View style='width: 65%'><Text>售价：￥{this.state.data.price}</Text></View>
            <View style='width: 35%'>
              {
                this.state.data.count === 0 ? (
                  <View style='display: inline-block; visibility: hidden'>
                    <AtIcon value='subtract-circle' size='22' color='darkblue' />
                    <Text style='margin: 0 10px'>{this.state.data.count}</Text>
                  </View>
                ) : (
                  <View style='display: inline-block '>
                    <AtIcon value='subtract-circle' size='22' color='darkblue' onClick={() => this.handleSub(this.state.data)} />
                    <Text style='margin: 0 10px'>{this.state.data.count}</Text>
                  </View>
                )
              }
              <AtIcon value='add-circle' size='22' color='darkblue' onClick={() => this.handleAdd(this.state.data)} />
            </View>
          </View>
        </View>

        <View style='position: fixed; width: 100vw; bottom: 0; left: 0'>
          <Cart />
        </View>
      </View>
    )
  }
}

export default CommodityDetail

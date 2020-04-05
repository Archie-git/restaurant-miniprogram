import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from "taro-ui"

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current: 0
    }
  };
  handlePay = () => {
    Taro.navigateTo({url: '/pages/payment/payment'}).then(() => {
      console.log("跳转至支付页面")
    }, err => {
      console.log(err)
    })
  };
  render () {
    return (
      <View className='at-row' style='background: lightgreen; display: flex; flex-direction: row; padding: 10px 0'>
        <View style='width: 35vw; background: yellow'>盒子</View>
        <View style='width: 45vw'><Text>￥40</Text></View>
        <View style='width: 20vw; margin: auto 20px' ><AtButton size='small' type='primary' onClick={this.handlePay}>去结算</AtButton></View>
      </View>
    )
  }
}

export default Cart

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtBadge } from "taro-ui"
import memoryUtil from "../../util/memoryUtil";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  };
  componentWillMount = () => {
    this.setState({data: memoryUtil.cart})
  };
  componentDidMount = () => {
    this.timeID = setInterval(() => {
      this.setState({data: memoryUtil.cart})
    }, 100)
  };
  componentWillUnmount = () => {
    clearInterval(this.timeID)
  };
  getPayment = () => {
    if(memoryUtil.user.hasOwnProperty('status')){
      let payment = 0;
      this.state.data.forEach(item => {
        switch (memoryUtil.user.status) {
          case 0: payment = payment + item.price*item.count;break;
          case 1: payment = payment + item.price*item.discount_gold*item.count/10;break;
          case 2: payment = payment + item.price*item.discount_platinum/10*item.count;break;
          case 3: payment = payment + item.price*item.discount_diamond/10*item.count;break;
        }
      });
      return payment.toFixed(2);
    }
  };
  getCount = () => {
    let count = 0;
    this.state.data.forEach(item => {
      count = count + item.count
    });
    return count
  };
  handleDetail = async () => {
    Taro.navigateTo({url: '/pages/cart-detail/cart-detail'}).then(ret => {
      console.log(ret)
    }, err => {
      console.log(err)
    })
  };
  preventBubble = (e) => {
    e.stopPropagation()
  };
  handlePay = async () => {
    await Taro.navigateTo({url: '/pages/payment/payment'})
  };
  render () {
    return (
      <View
        style='color: white; background: #7F7F7F; display: flex; flex-direction: row; padding: 5px 10px 10px'
        onClick={() => this.handleDetail()}
      >
        <View style='width: 25vw; padding-left: 20px'>
          <AtBadge value={this.getCount() === 0 ? null : this.getCount()}>
            <AtIcon value='shopping-bag' size={40} />
          </AtBadge>
        </View>
        <View style='width: 55vw'>
          <View style='font-size: 16px'><Text>￥{this.getPayment()}</Text></View>
          <View style='font-size: 12px'><Text>共{this.getCount()}件商品</Text></View>
        </View>
        <View
          style='width: 20vw; margin: auto 20px'
          onClick={this.preventBubble}
        >
          <AtButton
            size='small'
            type='primary'
            onClick={this.handlePay}
            disabled={this.getCount() === 0}
          >
            去结算
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Cart

import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from "taro-ui";
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import Cart from "../../components/cart/cart";


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class CommodityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: ''
    }
  }

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '下单'
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  handleEvaluationChange = (value) => {
    console.log(value)
  };
  handleSubmit = () => {
    console.log("handle submit")
  };
  render () {
    return (
      <View style='height: 100vh; padding: 10px 10px 50px; background: #F0F0F0'>
        <View style='width: 100%; height: 40vh; background: yellow; margin-bottom: 10px'>图片</View>
        <View style='background: white; padding: 5px'>
          <View><Text>鱼香肉丝放</Text></View>
          <View><Text>月售22份</Text></View>
          <View style='display: flex; flex-direction: row'>
            <View style='width: 70%'><Text>价格￥111</Text></View>
            <View style='width: 30%'>
              <AtIcon value='subtract-circle' size='18' />
              <Text style='margin: 0 15px'>1</Text>
              <AtIcon value='add-circle' size='18' />
            </View>
          </View>
          <View><Text>商品简介</Text></View>
          <View><Text>我是简介</Text></View>
        </View>
        <View style='position: fixed; width: 100vw; bottom: 0; left: 0'>
          <Cart />
        </View>
      </View>
    )
  }
}

export default CommodityDetail

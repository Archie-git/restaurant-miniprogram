import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtIcon } from "taro-ui";
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
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'dsff'
    }
  }

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '搜索'
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  onChange = () => {
    console.log("click")
  };
  render () {
    return (
      <View style='height: 100vh; background: #F0F0F0'>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange}
          onActionClick={this.onChange}
          placeholder='搜索商品'
          // showActionButton
          fixed
        />
        <View style='padding: 50px 10px 50px; font-size: 13px'>
          <View className='at-row' style='margin-bottom: 10px; padding: 5px; box-sizing: border-box; background: white'>
            <View className='at-col at-col-3' style='background: yellow'>ddd</View>
            <View className='at-col at-col-9' style='margin-left: 10px'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='at-row'>
                <Text className='at-col at-col-7'>价格</Text>
                <View className='at-col at-col-5'>
                  <AtIcon value='subtract-circle' size='20' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='22' />
                </View>
              </View>
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

export default Search

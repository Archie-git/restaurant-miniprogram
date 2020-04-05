import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from "taro-ui";

class Order extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '好评'
  };

  handleView = () => {
    Taro.navigateTo({url: '/pages/order-detail/order-detail'}).then(() => {
      console.log("跳转至商品搜索页面")
    }, err => {
      console.log('跳转至商品搜索页面失败：');
      console.log(err)
    });
    console.log('handleSearch work');
  };
  render () {
    return (
      <View style='margin: 5px 0 50px'>
        <View
          style='margin-bottom: 10px; padding: 10px; background: white'
          onClick={this.handleView}
        >
          <View style='margin-bottom: 10px'>
            <Text>2020-1-11 </Text>
            <AtTag size='small' active> 已完成 </AtTag>
            <AtIcon value='chevron-right' style='margin-left: 200px' />
          </View>
          <View className='at-row' style='font-size: 13px; color: gray'>
            <Text className='at-col at-col-10'>红烧牛肉等两件商品</Text>
            <Text className='at-col at-col-2'>￥100</Text>
          </View>
        </View>



        <View
          style='margin-bottom: 10px; padding: 10px; background: white'
          onClick={this.handleView}
        >
          <View style='margin-bottom: 10px'>
            <Text>2020-1-11 </Text>
            <AtTag size='small' active> 已完成 </AtTag>
            <AtIcon value='chevron-right' style='margin-left: 200px' />
          </View>
          <View className='at-row' style='font-size: 13px; color: gray'>
            <Text className='at-col at-col-10'>红烧牛肉等两件商品</Text>
            <Text className='at-col at-col-2'>￥100</Text>
          </View>
        </View>






      </View>
    )
  }
}

export default Order

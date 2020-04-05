import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtList, AtListItem } from "taro-ui";
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'


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
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: ''
    }
  }

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '订单详情'
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
  handleEvaluate = () => {
    Taro.navigateTo({url: '/pages/evaluate/evaluate'}).then(() => {
      console.log("跳转至商品搜索页面")
    }, err => {
      console.log('跳转至商品搜索页面失败：');
      console.log(err)
    });
    console.log('handleEvaluate work');
  };

  render () {
    return (
      <View style='padding: 20px 10px 50px; background: #F0F0F0'>
        <View>
          {/*/已付款/待评价/已完成/请求取消/已取消*/}
          {/*<Text className='at-article__h1'>订单已付款</Text>*/}
          <View className='at-row'>
            <View className='at-col at-col-4'><Text className='at-article__h2'>订单已付款</Text></View>
            <View className='at-col at-col-2'>
              <AtButton size='small' type='primary' onClick={this.handleEvaluate}>去评价</AtButton>
            </View>
          </View>
          {/*待评价/已完成/已取消*/}
          <View><Text className='at-article__h3' style='color: gray'>感谢您的信任与选择，欢迎下次光临~</Text></View>
          {/*已付款*/}
          <View><Text className='at-article__h3' style='color: gray'>蟹宝王竭诚为您提供服务~</Text></View>
          {/*请求取消*/}
          <View><Text className='at-article__h3' style='color: gray'>商家正在处理请求，请稍后~</Text></View>
        </View>
        <View style='margin: 15px 0 5px'><Text className='at-article__h2'>商品列表</Text></View>
        <View style='padding: 10px; background: white; font-size: 13px'>
          {/*根据订单的商品列表进行渲染*/}
          <View className='at-row' style='margin-bottom: 10px'>
            <View className='at-col at-col-2' style='margin-right: 10px; background: yellow'>图</View>
            <View className='at-col at-col-10'>
              <View className='at-row'>
                <Text className='at-col at-col-7'>牛腩烩饭</Text>
                <View className='at-col at-col-3'><AtIcon value='close' size='10' />1</View>
                <Text className='at-col at-col-2'>￥23</Text>
              </View>
              <Text>中辣</Text>
            </View>
          </View>
          <View className='at-row' style='margin-bottom: 10px'>
            <View className='at-col at-col-2' style='margin-right: 10px; background: yellow'>图</View>
            <View className='at-col at-col-10'>
              <View className='at-row'>
                <Text className='at-col at-col-7'>牛腩烩饭</Text>
                <View className='at-col at-col-3'><AtIcon value='close' size='10' />1</View>
                <Text className='at-col at-col-2'>￥23</Text>
              </View>
              <Text>中辣</Text>
            </View>
          </View>


        </View>
        {/*订单信息，需要根据订单状态显示*/}
        <View style='margin: 15px 0 5px'><Text className='at-article__h2'>订单信息</Text></View>
        <View style='background: yellow; border-radius: 10px'>
          <AtList hasBorder={false}>
            <AtListItem title='订单号' note='2020-1-11 11:11' hasBorder={false} />
            <AtListItem title='下单时间' note='2020-1-11 11:11' hasBorder={false} />
            <AtListItem title='支付方式' note='2020-1-11 11:11' hasBorder={false} />
            <AtListItem title='实付金额' note='￥￥￥￥￥' hasBorder={false} />
            <AtListItem title='获得积分' note='我是评价文字' hasBorder={false} />
          </AtList>
        </View>



        {/*我的评价, 需要根据订单是否被评价显示*/}
        <View style='margin: 15px 0 5px'><Text className='at-article__h2'>我的评价</Text></View>
        <View style='background: yellow; border-radius: 10px'>
          <AtList hasBorder={false}>
            <AtListItem title='评价时间' note='2020-1-11 11:11' hasBorder={false} />
            <AtListItem title='评价等级' note='￥￥￥￥￥' hasBorder={false} />
            <AtListItem title='评价时间' note='我是评价文字' hasBorder={false} />
          </AtList>
        </View>
      </View>
    )
  }
}

export default OrderDetail

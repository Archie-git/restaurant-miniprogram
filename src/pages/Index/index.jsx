import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane, AtAvatar, AtIcon, AtNoticebar } from "taro-ui"
import Commodity from '../../components/commodity/commodity'
import Order from '../../components/order/order'
import Introduce from '../../components/introduce/introduce'
import Cart from '../../components/cart/cart'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  };
  componentWillMount = () => {
    console.log("获取用户信息")
  };
  //eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页'
  };
  handleTabClick = (value) => {
    this.setState({current: value})
  };
  handleSearch = () => {
    Taro.navigateTo({url: '/pages/search/search'}).then(() => {
      console.log("跳转至商品搜索页面")
    }, err => {
      console.log('跳转至商品搜索页面失败：');
      console.log(err)
    });
    console.log('handleSearch work');
  };
  handlePay = () => {
    Taro.navigateTo({url: '/pages/payment/payment'}).then(() => {
      console.log("跳转至支付页面")
    }, err => {
      console.log(err)
    })
  };
  handleScroll = (e) => {
    console.log("kkk");
    console.log(e.detail)
  };
  render () {
    const tableList = [{title: '点餐'}, {title: '我的订单'}, {title: '品牌信息'}, ];
    return (
      <View style='padding: 10px; background: #F0F0F0; min-height: 100vh'>
        {/*头部*/}
        <View className='at-row'>
          <AtAvatar className='at-col' image='https://jdc.jd.com/img/200' circle />
          <View className='at-col at-article__h1' style='margin: auto 10px' >蟹宝王餐厅</View>
          <View className='at-col' style='margin: auto 35px'>
            <AtButton size='small' type='primary' onClick={this.handleSearch} circle>
              <AtIcon value='search' size='15' />
              <Text> 搜一下</Text>
            </AtButton>
          </View>
        </View>
        {/*通告栏*/}
        <View style='margin: 10px auto'>
          <AtNoticebar icon='volume-plus'>
            这是 NoticeBar 通告栏
          </AtNoticebar>
        </View>

        {/*<View style='position: sticky; top: 10px'>*/}
        {/*  <View>dksljfddddddddddddd</View>*/}
        {/*</View>*/}
        {/*/!*领券活动*!/*/}
        {/*<View style='background: yellow; margin-top: 10px'>*/}
        {/*  <View>我是领券</View>*/}
        {/*</View>*/}
        {/*/!*广告活动*!/*/}
        {/*<View style='background: yellow; margin-top: 10px'>*/}
        {/*  <View>我是广告</View>*/}
        {/*</View>*/}


        {/*功能模块*/}
        <View style='margin-bottom: 50px'>
          <AtTabs current={this.state.current} tabList={tableList} onClick={this.handleTabClick}>
            <AtTabsPane current={this.state.current} index={0}><Commodity /></AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}><Order /></AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}><Introduce /></AtTabsPane>
          </AtTabs>
        </View>
        {
          this.state.current===0 ? (
            <View style='position: fixed; width: 100vw; bottom: 0; left: 0'>
              <Cart />
            </View>
          ) : null
        }
      </View>
    )
  }
}

export default Index

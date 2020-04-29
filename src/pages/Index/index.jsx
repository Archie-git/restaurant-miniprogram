import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane, AtAvatar, AtIcon, AtNoticebar, AtMessage } from "taro-ui"
import Commodity from '../../components/commodity/commodity'
import Customer from '../../components/customer/customer'
import Introduce from '../../components/introduce/introduce'
import Cart from '../../components/cart/cart'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      data: {},
    }
  };

  //eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '首页'
  };
  componentWillMount = async () => {
    this.getRemoteData()
  };
  componentDidMount = () => {
    this.timeID = setInterval(async () => {
      this.getRemoteData();
    }, 1000)
  };
  componentWillUnmount = () => {
    clearInterval(this.timeID)
  };
  getRemoteData = async () => {
    const res = await Taro.request({
      url: 'https://archie.zone/shop/info',
      method: 'GET'
    });
    if(res.statusCode === 200){
      if(res.data.status === 0){
        res.data.data.profile = 'https://archie.zone/upload/'+res.data.data.profile;
        this.setState({data: res.data.data})
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
  handleTabClick = (value) => {
    this.setState({current: value});
  };
  handleSearch = async () => {
    await Taro.navigateTo({url: '/pages/search/search'})
  };
  render () {
    const tableList = [{title: '点餐'}, {title: '个人中心'}, {title: '品牌信息'}];
    return (
      <View style='padding: 10px; background: #F0F0F0; min-height: 100vh'>
        <AtMessage />
        {/*头部*/}
        <View className='at-row'>
          <AtAvatar className='at-col' image={this.state.data.profile} circle />
          <View className='at-col at-article__h1' style='margin: auto 10px'>{this.state.data.name}</View>
          <View className='at-col' style='margin: auto 35px'>
            <AtButton size='small' type='primary' onClick={this.handleSearch} circle>
              <AtIcon value='search' size='15' />
              <Text> 搜一下</Text>
            </AtButton>
          </View>
        </View>
        {/*通告栏*/}
        <View style='margin: 10px auto'>
          <AtNoticebar icon='volume-plus'>{this.state.data.notice}</AtNoticebar>
        </View>


        {/*活动领券以及轮播图广告*/}
        {/*<Swiper*/}
        {/*  className='test-h'*/}
        {/*  indicatorColor='#999'*/}
        {/*  indicatorActiveColor='#333'*/}
        {/*  vertical*/}
        {/*  circular*/}
        {/*  indicatorDots*/}
        {/*  autoplay>*/}
        {/*  <SwiperItem>*/}
        {/*    <View className='demo-text-1'>1</View>*/}
        {/*  </SwiperItem>*/}
        {/*  <SwiperItem>*/}
        {/*    <View className='demo-text-2'>2</View>*/}
        {/*  </SwiperItem>*/}
        {/*  <SwiperItem>*/}
        {/*    <View className='demo-text-3'>3</View>*/}
        {/*  </SwiperItem>*/}
        {/*</Swiper>*/}


        {/*功能模块*/}
        <View style='margin-bottom: 50px'>
          <AtTabs current={this.state.current} tabList={tableList} onClick={this.handleTabClick}>
            <AtTabsPane current={this.state.current} index={0}><Commodity /></AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}><Customer /></AtTabsPane>
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

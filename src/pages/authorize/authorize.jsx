import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar, AtDivider, AtMessage } from 'taro-ui'
import memoryUtil from '../../util/memoryUtil'

class Authorize extends Component{
  constructor(props){
    super(props);
    this.state = {
      current: 0,
      profile: ''
    }
  }
  componentWillMount = async () => {
    let status = 0;
    const res1 = await Taro.request({
      url: 'https://archie.zone/shop/info',
      method: 'GET'
    });
    if(res1.statusCode === 200){
      if(res1.data.status === 0){
        this.setState({profile: 'https://archie.zone/upload/'+res1.data.data.profile})
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
    //尝试获取用户昵称、性别等信息、并保存nickName至memoryUtil
    Taro.getUserInfo().then(async res2 => {
      memoryUtil.user.name = res2.userInfo.nickName;
      memoryUtil.user.profile = res2.userInfo.avatarUrl;
      memoryUtil.user.status = status;
      await Taro.redirectTo({url: '/pages/index/index'})
      // this.setState({current: 1})
    }, () => {
      this.setState({current: 0})
    });
    //获取电话号码,在服务器上请求openid和session_id,并保存唯一标识openid至memoryUtil
    Taro.login().then(res3 => {
      Taro.request({
        url: 'https://archie.zone/openid',
        method: 'GET',
        data: {
          appid: 'wx3fd4b9536147115f',
          secret: 'e49510d55089741203d3685093d4f628',
          js_code: res3.code
        }
      }).then( (res4) => {
        memoryUtil.user.openid = res4.data.openid;
        // console.log("openid:"+res4.data.openid);
        // console.log("session_key:"+res4.data.session_key)
      }, () => {
        Taro.atMessage({
          'type': 'warning',
          'message': '请求失败! 请检查网络连接状况'
        })
      })
    });
  };
  config = {
    navigationBarTitleText: '登录授权'
  };
  getInfo = async (e) => {
    if(this.state.current === 0){
      memoryUtil.user.name = e.detail.userInfo.nickName;
      memoryUtil.user.profile = e.detail.userInfo.avatarUrl;
      await Taro.redirectTo({url: '/pages/index/index'})
      // this.setState({current: 1});
    }else{
      // console.log("拿到了手机号码");
      // console.log(e)
    }
  };
  render () {
    return (
      <View style='text-align: center; padding: 40px; font-size: 15px'>
        <AtMessage />
        <View style='display: inline-block'>
          <AtAvatar image={this.state.profile} circle />
        </View>
        <AtDivider />
        <View style='text-align: left; margin: 20px 0'><Text>申请获取以下权限：</Text></View>
        <View style='text-align: left; margin: 20px 0'>
          {
            this.state.current === 0 ? (
              <Text>获取你的公开信息(昵称、头像、地区及性别)</Text>
            ) : (
              <Text>获取你的电话号码</Text>
            )
          }
        </View>
        <Button
          type='primary'
          style='margin: 60px 0'
          open-type={this.state.current === 0 ? 'getUserInfo' : 'getPhoneNumber'}
          ongetuserinfo={this.getInfo}
        >
          授权登录
        </Button>
      </View>
    )
  }
}



export default Authorize

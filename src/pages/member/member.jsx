import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtMessage, AtButton, AtModal } from 'taro-ui'
import memoryUtil from '../../util/memoryUtil'

class Member extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: {},
      isModalOpen: false,
      selector: ['黄金会员', '白金会员', '钻石会员'],
      selectorChecked: '黄金会员'
    }
  }
  componentWillMount = async () => {
    const res = await Taro.request({
      url: 'https://archie.zone/shop/info',
      method: 'GET'
    });
    if(res.statusCode === 200){
      if(res.data.status === 0){
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
  config = {
    navigationBarTitleText: '升级会员'
  };
  handleSubmit = async () => {
    let res = await Taro.request({
      url: 'https:/archie.zone/customer/update',
      method: 'POST',
      data: {id: memoryUtil.user.id, status: 0}
    });
    if(res.statusCode === 200){
      if(res.data.status === 0){
        Taro.atMessage({
          'type': 'success',
          'message': '您已成功升级为会员'
        });
        await Taro.navigateTo({url: '/pages/index/index'})
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
  handleModalClose = () => {
    this.setState({isModalOpen: false})
  };
  handleModalOpen = () => {
    this.setState({isModalOpen: true})
  };
  render () {
    return (
      <View style='text-align: center; padding: 40px; font-size: 15px'>
        <AtModal
          isOpened={this.state.isModalOpen}
          title='提示'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleModalClose}
          onCancel={this.handleModalClose}
          onConfirm={this.handleSubmit}
          content='确定要升级为会员吗'
        />
        <AtMessage />
        <View>{this.state.data.name}+会员规则</View>
        <View>{this.state.data.treaty}</View>
        <View>
          <Text>1. 黄金会员及以上等级的有效期为1年，自升级之日起计算；银卡会员等级为长期有效。

            2. 在等级有效期内，如达到上一等级标准，即可升级。

            3. 等级到期后，如满足以下条件即可享受会员等级有效期顺延一年。

            等级有效期内：

            黄金会员：消费金额 ≥ ¥5000

            铂金会员：消费金额 ≥ ¥15000

            钻石会员：消费金额 ≥ ¥300000

            若未能满足上述条件，则等级顺次下调一个等级。
          </Text>
        </View>
        <Picker mode='selector' range={this.state.selector} onChange={this.onChange} value={0}>
          <View className='picker'>
            当前选择：{this.state.selectorChecked}
          </View>
        </Picker>
        <AtButton
          type='primary'
          style='margin: 60px 0'
          onClick={this.handleModalOpen}
        >
          确认并支付
        </AtButton>
      </View>
    )
  }
}





export default Member

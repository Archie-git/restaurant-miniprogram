import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtTag, AtIcon, AtAvatar} from "taro-ui"
import memoryUtil from "../../util/memoryUtil"

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      order: []
    }
  };
  componentWillMount = async () => {
    let customer = {};
    const res1 = await Taro.request({
      url: 'https://archie.zone/customer/login',
      method: 'GET',
      data: {openid: memoryUtil.user.openid}
    });
    if(res1.statusCode === 200){
      if(res1.data.status === 0){
        customer = res1.data.data;
        memoryUtil.user.id = customer.id;
        memoryUtil.user.status = customer.status;
        this.setState({customer: customer})
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
    //根据用户信息中的订单id，请求所有订单的信息
    if(!!customer.orderid){
      const res3 = await Taro.request({
        url: 'https://archie.zone/order/list-customer',
        method: 'GET',
        data: {customer: customer.orderid}
      });
      if(res3.statusCode === 200){
        if(res3.data.status === 0){
          let order = res3.data.data.map(item1 => {
            item1.commodity = JSON.parse(item1.commodity);
            return item1;
          });
          order = order.sort((a, b) => {
            return b.createtime - a.createtime
          });
          this.setState({
            order: order
          })
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
    }
  };
  handleView = async (id) => {
    await Taro.navigateTo({url: '/pages/order-detail/order-detail?id='+id})
  };
  handleMember = async () => {
    await Taro.navigateTo({url: '/pages/member/member'})
  };
  getTimeForm = (time) => {
    time = new Date(time);
    let month = time.getMonth()+1;
    month = month>=10 ? month : "0"+month;
    let date = time.getDate()>=10 ? time.getDate() : "0"+time.getDate();
    let hour = time.getHours()>=10 ? time.getHours() : "0"+time.getHours();
    let minute = time.getMinutes()>=10 ? time.getMinutes() : "0"+time.getMinutes();
    let second = time.getSeconds()>=10 ? time.getSeconds() : "0"+time.getSeconds();
    return time.getFullYear()+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
  };
  getCommodityTip = (commodity) => {
    if(commodity.length === 1){
      return commodity[0].name
    }else if(commodity.length === 2){
      return commodity[0].name+'、'+commodity[1].name
    }else {
      return commodity[0].name+'、'+commodity[1].name + "等"+commodity.length+"件商品"
    }
  };
  getCustomerStatus = () => {
    let status = '';
    switch (this.state.customer.status) {
      case 0: status = '普通用户';break;
      case 1: status = '黄金会员';break;
      case 2: status = '白金会员';break;
      case 3: status = '钻石会员';break;
    }
    return status;
  };
  render () {
    return (
      <View>
        <View style='font-size: 15px; margin: 5px 0 10px; padding: 10px 0 10px 5px; background: white'>
          <View style='display: inline-block; margin-right: 15px; vertical-align: middle'>
            <AtAvatar image={memoryUtil.user.profile} circle />
          </View>
          <View style='display: inline-block; vertical-align: middle; width: 80%'>
            <Text>{this.state.customer.name} </Text>
            <View style='display: inline-block; width: 60%'>
              <AtTag size='small' active circle>{this.getCustomerStatus()}</AtTag>
            </View>
            {
              this.state.customer.status === 0 ?  (
                <View style='display: inline-block; vertical-align: top'>
                  <Text style='text-decoration: underline; color: blue; font-size: 14px' onClick={this.handleMember}>升级会员?</Text>
                </View>
              ) : null
            }
            <View>积分：{this.state.customer.integral}</View>
          </View>
        </View>
        <View style='margin: 5px 0 20px'>
          <View style='font-size: 14px; margin: 10px auto'><Text>我的订单</Text></View>
          {
            this.state.order.length === 0 ? (
              <View style='color: lightgray; background: white; padding: 100px 0 250px'>
                <View style='text-align: center'><AtIcon value='alert-circle' size={80} /></View>
                <View style='text-align: center; margin-top: 20px; font-weight: bolder'><Text>未找到相关记录</Text></View>
              </View>
            ) : this.state.order.map((item, index) => {
              return (
                <View
                  key={index}
                  style='margin-bottom: 5px; padding: 10px; background: white'
                  onClick={() => this.handleView(item.id)}
                >
                  <View style='margin-bottom: 10px; font-size: 13px'>
                    <View style='display: inline-block; width: 90%'>
                      <Text>{this.getTimeForm(item.createtime)} </Text>
                      <AtTag size='small' active>
                        {
                          item.state === 0 ? '已付款' :
                            item.state === 1 ? '请求取消' :
                              item.state === 2 ? '已退款' :
                                item.state === 3 && item.evaluated === 0 ? '待评价' :
                                  item.state === 3 && item.evaluated ===1 ? '已完成' : null
                        }
                      </AtTag>
                    </View>
                    <AtIcon style='display: inline-block; width: 10%' value='chevron-right' />
                  </View>
                  <View style='font-size: 12px; color: gray'>
                    <Text style='display: inline-block; width: 60%'>{this.getCommodityTip(item.commodity)}</Text>
                    <Text style='display: inline-block; width: 40%'>￥{item.payment}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default Customer


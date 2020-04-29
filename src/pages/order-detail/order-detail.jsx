import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtIcon, AtActionSheet, AtActionSheetItem } from "taro-ui";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      commodity: [],
      isOpen: false
    }
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '订单详情'
  };
  componentWillMount = async () => {
    const res1 = await Taro.request({
      url: 'https://archie.zone/order/search',
      method: 'GET',
      data: {id: this.$router.params.id}
    });
    if(res1.statusCode === 200){
      if(res1.data.status === 0){
        let order = res1.data.data[0];
        let commodity = JSON.parse(order.commodity);
        this.setState({
          order: order,
          commodity: commodity
        });
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
  handleEvaluate = async () => {
    await Taro.navigateTo({url: '/pages/evaluate/evaluate?id='+this.$router.params.id});
  };
  handleCancel = () => {
    this.setState({isOpen: true})
  };
  handleCancelConfirm = () => {
    Taro.request({
      url: 'https://archie.zone/order/',
      method: 'POST',
      data: {}
    }).then(res => {
      if(res.statusCode === 200){
        if(res.data.status === 0){
          Taro.atMessage({
            'type': 'primary',
            'message': '已向商家请求取消订单，请稍等'
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
    })
  };
  handleUrge = () => {
    console.log("请求催单")
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
  render () {

    return (
      <View style='padding: 20px 10px 50px; background: #F0F0F0'>
        <AtActionSheet isOpened={this.state.isOpen} cancelText='取消' title='确定要取消该订单吗'>
          <AtActionSheetItem onClick={() => this.handleCancelConfirm}>确定</AtActionSheetItem>
        </AtActionSheet>
        {
          this.state.order.state === 0 ? (
            <View>
              <View className='at-row'>
                <View className='at-col at-col-3'>
                  <Text style='margin: 0 20px; font-size: 20px'>已付款</Text>
                </View>
                <View className='at-col at-col-2'>
                  {
                    this.state.order.urged === 0 ? (
                      <AtButton size='small' type='primary' onClick={this.handleUrge}>催单</AtButton>
                    ) : (
                      <AtButton size='small' type='primary' onClick={this.handleUrge} disabled>催单</AtButton>
                    )
                  }
                </View>
                <View className='at-col at-col-3' style='margin-left: 10px'>
                  <AtButton size='small' type='primary' onClick={this.handleCancel}>取消订单</AtButton>
                </View>
              </View>
              <View style='margin: 0 20px; font-size: 14px; color: gray'><Text>我是已付款</Text></View>
            </View>
          ) : this.state.order.state === 1 ?(
            <View>
              <View><Text style='margin: 0 20px; font-size: 20px'>正在请求取消</Text></View>
              <View><Text style='margin: 0 20px; font-size: 14px; color: gray'>请稍等片刻，商家正在处理</Text></View>
            </View>
          ) : this.state.order.state === 2 ? (
            <View>
              <View style='margin: 0 20px; font-size: 20px'><Text>已取消</Text></View>
              <View><Text style='margin: 0 20px; color: gray; font-size: 14px'>欢迎下次再来</Text></View>
            </View>
          ) : this.state.order.state === 3 ? (
            <View>
              <View className='at-row'>
                <View className='at-col at-col-3'>
                  <Text style='margin: 0 20px; font-size: 20px'>已完成</Text>
                </View>
                <View className='at-col at-col-2'>
                  {
                    this.state.order.evaluated === 0 ? (
                      <AtButton size='small' type='primary' onClick={this.handleEvaluate}>去评价</AtButton>
                    ) : null
                  }
                </View>
              </View>
              <View><Text style='margin: 0 20px; color: gray; font-size: 14px'>感谢您的信任与选择，欢迎下次光临~</Text></View>
            </View>
          ) : null
        }



        <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>商品列表</Text></View>
        <View style='font-size: 14px'>
          {/*根据订单的商品列表进行渲染*/}
          {
             this.state.commodity.length === 0 ? null : this.state.commodity.map((item, index) => {
               return (
                 <View
                   key={index}
                   style='margin-bottom: 5px; padding: 10px; box-sizing: border-box; background: white'
                   onClick={() => this.handleDetail(item.id)}
                 >
                   <Image
                     style='display: inline-block; vertical-align: top; height: 60px; width: 60px'
                     src={'https://archie.zone/upload/'+item.picture} mode='scaleToFill'
                   />
                   <View style='display: inline-block; margin-left: 10px; width: 70%'>
                     <View style='display: inline-block; width: 30%'><Text>{item.name}</Text></View>
                     <View style='display: inline-block; width: 20%'><AtIcon value='close' size='10' />{item.count}</View>
                     <View style='display: inline-block; width: 20%'><Text>￥{item.price}</Text></View>
                     <View><Text>{item.note}</Text></View>
                   </View>
                 </View>
               )
             })
           }
        </View>
        {/*订单信息，需要根据订单状态显示*/}
        <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>订单信息</Text></View>
        <AtList hasBorder={false}>
          <AtListItem title='订单号' note={''+this.state.order.createtime} hasBorder={false} />
          <AtListItem title='下单时间' note={this.getTimeForm(this.state.order.createtime)} hasBorder={false} />
          <AtListItem title='支付方式' note='微信支付' hasBorder={false} />
          <AtListItem title='订单总额' note={'￥'+this.state.order.amount} hasBorder={false} />
          <AtListItem title='实付金额' note={'￥'+this.state.order.payment} hasBorder={false} />
          <AtListItem title='获得积分' note={''+this.state.order.integral} hasBorder={false} />
        </AtList>


        {/*我的评价, 需要根据订单是否被评价显示*/}
        {
          this.state.order.evaluated === 1 ? (
            <View>
              <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>我的评价</Text></View>
              <AtList hasBorder={false}>
                <AtListItem title='评价时间' note={this.getTimeForm(this.state.order.evaluatetime)} hasBorder={false} />
                <AtListItem title='评价等级' note={this.state.order.stars} hasBorder={false} />
                <AtListItem title='评价内容' note={this.state.order.evaluation} hasBorder={false} />
              </AtList>
            </View>
          ) : null
        }
      </View>
    )
  }
}

export default OrderDetail

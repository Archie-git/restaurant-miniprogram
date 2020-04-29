import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Picker} from '@tarojs/components'
import {AtIcon, AtTextarea, AtButton, AtList, AtListItem, AtToast} from "taro-ui";
import memoryUtil from "../../util/memoryUtil";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      commodity: [],
      selector: [1, 2, 3, 4, 5 ,6],
      selectorChecked: 0,
      openToast: false
    }
  }
  componentWillMount = async () => {
    const res = await Taro.request({
      url: 'https://archie.zone/shop/info',
      mothod: 'GET'
    });
    if(res.statusCode === 200){
      if(res.data.status === 0){
        // let selector = [];
        // for(let i=0; i<res.data.data.seats; i++){
        //   selector.push(i)
        // }
        // this.setState({
        //   selector: selector
        // })
        if(memoryUtil.hasOwnProperty('seat')){
          this.setState({selectorChecked: memoryUtil.seat})
        }
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
    // console.log(memoryUtil.user);
    let payment = 0;
    let amount = 0;
    let integral = 0;
    memoryUtil.cart.forEach(item => {
      amount = amount + item.price*item.count;
      integral = integral + item.integral*item.count;
      switch (memoryUtil.user.status) {
        case 0: payment = payment + item.price*item.count;break;
        case 1: payment = payment + item.price*item.discount_gold*item.count/10;break;
        case 2: payment = payment + item.price*item.discount_platinum/10*item.count;break;
        case 3: payment = payment + item.price*item.discount_diamond/10*item.count;break;
      }
    });
    let commodity = JSON.stringify(memoryUtil.cart);
    let order = {
      state: 0,
      customer: memoryUtil.user.id,
      createtime: new Date().getTime(),
      urgetime: 0,
      canceltime: 0,
      finishtime: 0,
      evaluatetime: 0,
      amount: amount.toFixed(2),
      evaluation: '',
      cancelreason: '',
      payment: payment.toFixed(2),
      integral: integral,
      seat: 0,
      evaluated: 0,
      urged: 0,
      note: '',
      stars: 0,
      commodity: commodity
    };
    this.setState({
      commodity: memoryUtil.cart,
      order: order
    })
  };
  componentWillUnmount = () => {
    clearInterval(this.timeID)
  };
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '下单'
  };
  handleEvaluationChange = (value) => {
    let order = this.state.order;
    order.note = value;
    this.setState({order: order})
  };
  onPickerChange = (e) => {
    memoryUtil.seat = this.state.selector[e.target.value];
    this.setState({selectorChecked: this.state.selector[e.target.value]})
  };
  handleDetail = async (id) => {
    await Taro.navigateTo({url: '/pages/commodity-detail/commodity-detail?id='+id});
  };
  handleSubmit = async () => {
    if(memoryUtil.hasOwnProperty('seat')){
      let data = this.state.order;
      data.seat = memoryUtil.seat;
      console.log(data);
      const res = await Taro.request({
        url: 'https://archie.zone/order/add',
        method: 'POST',
        data: data
      });
      if(res.statusCode === 200){
        if(res.data.status === 0){
          Taro.atMessage({
            'type': 'success',
            'message': '下单成功，可在个人中心查看订单状态'
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
    }else{
      this.setState({openToast: true});
      this.timeID = setInterval(() => {
        this.setState({openToast: false})
      }, 3000)
    }
  };
  render () {
    return (
      <View style='padding: 10px 10px 50px; background: #F0F0F0'>
        <AtToast isOpened={this.state.openToast} text='请选择桌号' icon='alert-circle' />
        <View style='margin: 15px 20px 5px; font-size: 20px; color: #346FC2'>
          <Picker
            mode='selector'
            range={this.state.selector}
            onChange={this.onPickerChange}
            value={0}
          >
            <View>
              <Text>{this.state.selectorChecked === 0 ? '请选择桌号' : this.state.selectorChecked+'号桌'}</Text>
              <AtIcon value='chevron-down' size={20} />
            </View>
          </Picker>
        </View>
        <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>商品列表</Text></View>
        <View style='font-size: 14px'>
          {/*根据订单的商品列表进行渲染*/}
          {
            this.state.commodity.length === 0 ? null : this.state.commodity.map((item, index) => {
              return (
                <View
                  key={index}
                  style='margin-bottom: 5px; padding: 5px; box-sizing: border-box; background: white'
                  onClick={() => this.handleDetail(item.id)}
                >
                  <Image
                    style='display: inline-block; vertical-align: top; height: 40px; width: 40px'
                    src={'https://archie.zone/upload/'+item.picture} mode='scaleToFill'
                  />
                  <View style='display: inline-block; margin-left: 20px; width: 70%'>
                    <View>
                      <View style='display: inline-block; width: 80%'><Text>{item.name}</Text></View>
                      <View style='display: inline-block; width: 20%'><AtIcon value='close' size='10' />{item.count}</View>
                    </View>
                    <View style='margin-top: 2px; font-size: 12px'><Text>￥{item.price}</Text></View>
                  </View>
                </View>
              )
            })
          }
        </View>


        {/*订单信息*/}
        <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>订单信息</Text></View>
        <AtList hasBorder={false}>
          <AtListItem
            title='桌号'
            note={this.state.selectorChecked === 0 ? '未选择' : this.state.selectorChecked+'号'}
            hasBorder={false}
          />
          <AtListItem title='订单号' note={''+this.state.order.createtime} hasBorder={false} />
          <AtListItem title='支付方式' note='微信支付' hasBorder={false} />
          <AtListItem title='订单总额' note={'￥'+this.state.order.payment} hasBorder={false} />
          <AtListItem title='实付金额' note={'￥'+this.state.order.payment} hasBorder={false} />
          <AtListItem title='获得积分' note={''+this.state.order.integral} hasBorder={false} />
        </AtList>

        {/*备注*/}
        <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>填写备注</Text></View>
        <View style='margin: 5px 0 20px'>
          <AtTextarea
            value={this.state.evaluation}
            placeholder='请输入口味备注'
            onChange={this.handleEvaluationChange}
            height={200}
          />
        </View>
        <AtButton style='margin-top: 5px' type='primary' onClick={this.handleSubmit}>提交</AtButton>
      </View>
    )
  }
}

export default Payment

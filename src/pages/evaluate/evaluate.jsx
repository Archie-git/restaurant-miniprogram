import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import { AtIcon, AtTextarea, AtForm, AtButton, AtRate } from "taro-ui";

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodity: [],
      stars: 5,
      evaluation: ''
    }
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '评价'
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
  handleEvaluationChange = (value) => {
    this.setState({evaluation: value})
  };
  handleRateChange = (value) => {
    this.setState({stars: value})
  };
  handleSubmit = () => {
    console.log("handle submit")
  };
  render () {
    return (
      <View style='height: 100vh; padding: 10px 10px 50px; background: #F0F0F0'>
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


        <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>评价</Text></View>
        <View style='padding: 10px 10px 50px; background: white; font-size: 14px'>
          <View style='margin-bottom: 15px'>
            <Text>等级：</Text>
            <View style='display: inline-block; vertical-align: top'>
              <AtRate max={5} value={this.state.stars} margin={5} onChange={this.handleRateChange} /></View>
          </View>
          <View>
            <Text style='margin-bottom: 5px'>描述：</Text>
            <View style='margin: 5px 0 20px'>
              <AtTextarea
                value={this.state.evaluation}
                placeholder='请输入评价描述'
                onChange={this.handleEvaluationChange}
                height={200}
              />
            </View>
            <AtButton style='margin-top: 5px' type='primary' onClick={() => this.handleSubmit}>提交</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default Evaluate

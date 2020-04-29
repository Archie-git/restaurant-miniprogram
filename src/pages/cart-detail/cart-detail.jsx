import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from "taro-ui";
import memoryUtil from "../../util/memoryUtil";

class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount = () => {
    console.log(memoryUtil.cart);
    this.setState({data: memoryUtil.cart})
  };
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '我的购物车'
  };
  handleDetail = async (id) => {
    await Taro.navigateTo({url: '/pages/commodity-detail/commodity-detail?id='+id});
  };
  preventBubble = (e) => {
    e.stopPropagation();
  };
  handleAdd = (item1) => {
    let cart = memoryUtil.cart.map(item2 => {
      if(item1.id === item2.id){
        item2.count++;
      }
      return item2
    });
    memoryUtil.cart = cart;
    this.setState({data: cart})
  };
  handleSub = (item1) => {
    let cart = [];
    memoryUtil.cart.forEach(item2 => {
      if(item1.id === item2.id){
        if(item2.count > 1){
          item2.count--;
          cart.push(item2)
        }
      }else{
        cart.push(item2)
      }
    });
    memoryUtil.cart = cart;
    this.setState({data: cart})
  };
  render () {
    return (
      <View style='padding: 10px 10px 50px; background: #F0F0F0; min-height: 100vh'>
        {
          this.state.data.length === 0 ? (
            <View style='color: lightgray'>
              <View style='text-align: center; margin-top: 200px'><AtIcon value='shopping-bag' size={80} /></View>
              <View style='text-align: center; margin-top: 20px; font-weight: bolder'><Text>您还未添加任何商品</Text></View>
            </View>
          ) : (
            <View>
              <View style='margin: 15px 20px 5px; font-weight: bolder; font-size: 15px'><Text>商品列表</Text></View>
              {
                this.state.data.map((item, index) => {
                  return (
                    <View key={index}>
                      <View
                        key={index}
                        style='margin-bottom: 5px; padding: 5px; box-sizing: border-box; background: white; font-size: 14px'
                        onClick={() => this.handleDetail(item.id)}
                      >
                        <Image
                          style='display: inline-block; vertical-align: top; height: 43px; width: 43px'
                          src={'https://archie.zone/upload/'+item.picture} mode='scaleToFill'
                        />
                        <View style='display: inline-block; margin-left: 20px; width: 70%'>
                          <View><Text>{item.name}</Text></View>
                          <View style='display: inline-block; width: 70%; font-size: 12px'><Text>￥{item.price}</Text></View>
                          <View style='display: inline-block; width: 30%' onClick={this.preventBubble}>
                            <View style='display: inline-block '>
                              <AtIcon value='subtract-circle' size='22' color='darkblue' onClick={() => this.handleSub(item)} />
                              <Text style='margin: 0 10px'>{item.count}</Text>
                            </View>
                            <AtIcon value='add-circle' size='22' color='darkblue' onClick={() => this.handleAdd(item)} />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          )
        }
      </View>
    )
  }
}

export default CartDetail

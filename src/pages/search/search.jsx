import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtIcon, AtMessage } from "taro-ui"
import Cart from "../../components/cart/cart"
import memoryUtil from "../../util/memoryUtil"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
    }
  }
  componentDidMount = () => {
    this.timeID = setInterval(async () => {
      this.getRemoteData(this.state.value)
    }, 100)
  };
  componentWillUnmount = () => {
    clearInterval(this.timeID)
  };
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '搜索商品'
  };
  getRemoteData = async (value) => {
    if(value !== ""){
      const res = await Taro.request({
        url: 'https://archie.zone/product/search-name',
        method: 'GET',
        data: {name: value}
      });
      if(res.statusCode === 200){
        if(res.data.status === 0){
          let data = res.data.data.map(item1 => {
            item1.count = 0;
            memoryUtil.cart.forEach(item2 => {
              if(item1.id === item2.id) item1.count = item2.count;
            });
            return item1
          });
          this.setState({data: data})
        }
      }else{
        Taro.atMessage({
          'type': 'warning',
          'message': '请求失败! 请检查网络连接状况'
        })
      }
    }else{
      this.setState({data: []})
    }
  };
  onSearchChange = (value) => {
    this.setState({value: value});
  };
  getImageUrl = (pictures) => {
    if(pictures){
      return 'https://archie.zone/upload/'+pictures.split(',')[0]
    }
  };
  handleDetail = async (id) => {
    await Taro.navigateTo({url: '/pages/commodity-detail/commodity-detail?id='+id})
  };
  preventBubble = (e) => {
    e.stopPropagation();
  };
  handleAdd = (item1) => {
    let obj = {
      id: item1.id,
      name: item1.name,
      count: 1,
      picture: item1.pictures.split(',')[0],
      price: item1.price,
      discount_gold: item1.discount_gold,
      discount_platinum: item1.discount_platinum,
      discount_diamond: item1.discount_diamond,
      integral: item1.integral
    };
    let tag = 0;
    let cart = memoryUtil.cart.map(item2 => {
      if(item1.id === item2.id){
        item2.count++;
        tag = 1
      }
      return item2
    });
    if(tag === 0) cart.push(obj);
    memoryUtil.cart = cart;
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
  };
  render () {
    return (
      <View style='height: 100vh; background: #F0F0F0'>
        <AtMessage />
        {/*搜索框*/}
        <AtSearchBar
          value={this.state.value}
          onChange={this.onSearchChange}
          placeholder='搜索商品'
          // showActionButton
          fixed
        />
        {/*中部搜索结果*/}
        <View style='padding: 50px 10px 50px; font-size: 13px'>
          {
            this.state.data.length === 0 ? (
              <View style='color: lightgray'>
                <View style='text-align: center; margin-top: 200px'><AtIcon value='shopping-bag' size={80} /></View>
                <View style='text-align: center; margin-top: 20px; font-weight: bolder'><Text>未找到相关商品</Text></View>
              </View>
            ) : (
              this.state.data.map((item, index) => {
                return (
                  <View
                    key={index}
                    style='margin-bottom: 5px; padding: 5px; box-sizing: border-box; background: white'
                    onClick={() => this.handleDetail(item.id)}
                  >
                    <Image
                      style='display: inline-block; vertical-align: top; height: 80px; width: 80px'
                      src={this.getImageUrl(item.pictures)} mode='scaleToFill'
                    />
                    <View style='display: inline-block; margin-left: 5px; width: 70%'>
                      <View ><Text style='font-weight: bolder'>{item.name}</Text></View>
                      <View>{item.introduce}</View>
                      <View>{item.introduce}</View>
                      <View style='display: flex; flex-direction: row'>
                        <View style='width: 65%'><Text>￥{item.price}</Text></View>
                        <View style='width: 35%' onClick={this.preventBubble}>
                          {
                            item.count === 0 ? (
                              <View style='display: inline-block; visibility: hidden'>
                                <AtIcon value='subtract-circle' size='22' color='darkblue' />
                                <Text style='margin: 0 10px'>{item.count}</Text>
                              </View>
                            ) : (
                              <View style='display: inline-block '>
                                <AtIcon value='subtract-circle' size='22' color='darkblue' onClick={() => this.handleSub(item)} />
                                <Text style='margin: 0 10px'>{item.count}</Text>
                              </View>
                            )
                          }
                          <AtIcon value='add-circle' size='22' color='darkblue' onClick={() => this.handleAdd(item)} />
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })
            )
          }
        </View>
        {/*底部购物车*/}
        <View style='position: fixed; width: 100vw; bottom: 0; left: 0'>
          <Cart />
        </View>
      </View>
    )
  }
}

export default Search


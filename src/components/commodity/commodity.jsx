import Taro, { Component } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { AtIcon } from "taro-ui"
import './commodity.less'
import memoryUtil from "../../util/memoryUtil";

class Commodity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      categorySelected: {title: '新品上市', id: 998},
      commodityAll: [],
      commodity: []
    }
  }
  componentWillMount = async () => {
    this.getRemoteData(0);
  };
  componentDidMount = () => {
    this.timeID = setInterval(async () => {
      this.getRemoteData(1)
    }, 100)
  };
  componentWillUnmount = () => {
    clearInterval(this.timeID)
  };
  getRemoteData = async (type) => {
    const res1 = await Taro.request({
      url: 'https://archie.zone/category/list',
      method: 'GET',
    });
    const res2 = await Taro.request({
      url: 'https://archie.zone/product/list-onsale',
      method: 'GET'
    });
    if(res1.statusCode === 200 && res2.statusCode === 200){
      if(res1.data.status === 0 && res2.data.status === 0){
        let category = res1.data.data.map(item => {
          return {title: item.name, id: item.id}
        });
        category.sort((a, b) => { return a.level - b.level});
        category.unshift({title: '新品上市', id: 998}, {title: '招牌推荐', id: 999});
        let commodityAll = res2.data.data.map(item1 => {
          item1.count = 0;
          memoryUtil.cart.forEach(item2 => {
            if(item1.id === item2.id) item1.count = item2.count
          });
          return item1
        });
        let commodity = [];
        commodityAll.forEach(item3 => {
          item3.isnew === 1 ? commodity.push(item3) : null
        });
        if(type === 0){
          this.setState({
            category: category,
            commodityAll: commodityAll,
            commodity: commodity
          })
        }else{
          this.setState({
            category: category,
            commodityAll: commodityAll
          });
          this.handleCategoryClick(this.state.categorySelected)
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
  };
  handleCategoryClick = (category) => {
    let commodity = [];
    if(category.id === 998){
      this.state.commodityAll.forEach(item => {
        if(item.isnew === 1) commodity.push(item)
      })
    }else if(category.id === 999){
      this.state.commodityAll.forEach(item => {
        if(item.recommend === 1) commodity.push(item)
      })
    }else{
      this.state.commodityAll.forEach(item => {
        if(item.category === category.id) commodity.push(item)
      })
    }
    this.setState({
      categorySelected: category,
      commodity: commodity
    });
  };
  handleDetail = async (id) => {
    await Taro.navigateTo({url: '/pages/commodity-detail/commodity-detail?id='+id});
  };
  getImageUrl = (pictures) => {
    if(pictures){
      return 'https://archie.zone/upload/'+pictures.split(',')[0]
    }
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
      <View className='commodity-container'>
        {/*品类列表*/}
        <View className='commodity-category'>
          {
            this.state.category.map((item, index) => {
              return (
                <View
                  key={index}
                  className={this.state.categorySelected.id === item.id ? 'category-item selected' : 'category-item'}
                  onClick={()=>this.handleCategoryClick(item)}
                  style='font-size: 14px'
                >
                  {item.title}
                </View>
              )
            })
          }
        </View>
        {/*商品列表*/}
        <View className='commodity-list'>
          <View style='margin: 0 0 5px 10px; font-size: 11px'>
            <Text>{this.state.categorySelected.title}</Text>
          </View>
          {
            this.state.commodity.map((item, index) => {
              return (
                <View
                  key={index}
                  onClick={()=>this.handleDetail(item.id)}
                  style='background: white; margin-bottom: 5px; padding: 5px; box-sizing: border-box'
                >
                  <Image
                    style='display: inline-block; vertical-align: top; height: 80px; width: 80px'
                    src={this.getImageUrl(item.pictures)} mode='scaleToFill'
                  />
                  <View style='display: inline-block; margin-left: 5px; width: 65%; font-size: 12px'>
                    <View><Text style='font-weight: bold'>{item.name}</Text></View>
                    <View><Text>{item.introduce}</Text></View>
                    <View><Text>{item.introduce}</Text></View>
                    <View style='display: flex; flex-direction: row'>
                      <View style='width: 55%'><Text>￥{item.price}</Text></View>
                      <View style='width: 45%; margin-top: 5px' onClick={this.preventBubble}>
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
          }



        </View>
        {/*商品列表*/}
      </View>




    )
  }
}

export default Commodity

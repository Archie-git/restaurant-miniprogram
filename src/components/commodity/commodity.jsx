import Taro, { Component } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtIcon } from "taro-ui"
import './commodity.less'

class Commodity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      // data: "我是this.state.data"
      categoryList: [
        { title: '标签页0', id: 0 },
        { title: '标签页1', id: 1 },
        { title: '标签页2', id: 2 },
        { title: '标签页3', id: 3 },
        { title: '标签页4', id: 4 },
        { title: '标签页5', id: 5 },
        { title: '标签页6', id: 6 },
        { title: '标签页7', id: 7 },
      ]
    }
  }
  // eslint-disable-next-line react/sort-comp
  // config = {
  //   // navigationBarTitleText: '首页'
  // };
  // handleClick (value) {
  //   this.setState({
  //     current: value
  //   })
  // }
  handleCategoryClick = (id) => {
    this.setState({current: id});
    console.log(id);
  };
  handleDetail = () => {
    Taro.navigateTo({url: '/pages/commodity-detail/commodity-detail'}).then(() => {
      console.log("即将跳转至商品详情页面")
    }, err => {
      console.log("跳转至商品详情页面失败");
      console.log(err)
    })
  };
  onPageScroll(e){
    console.log(e.scrollTop, this.data.scroll_top);
    console.log("kkkk")
  }
  handleScroll = () => {
    console.log("ddddd")
  };
  render () {
    return (
      <View className='commodity-container'>
        <View className='commodity-category'>
          {
            this.state.categoryList.map((item, index) => {
              return (
                <View
                  className={this.state.current===item.id ? 'commodity-category-item selected' : 'commodity-category-item'}
                  key={index}
                  onClick={()=>this.handleCategoryClick(item.id)}
                >
                  {item.title}
                </View>
              )
            })
          }
        </View>
        {/*商品列表*/}
        <View className='commodity-list' onScroll={this.handleScroll}>
          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>
          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View id='kkkk' className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>

          <View className='commodity-list-item' onClick={this.handleDetail}>
            <View className='commodity-pic'>ddd</View>
            <View className='commodity-info'>
              <View>名称</View>
              <View>介绍</View>
              <View>优惠折扣</View>
              <View className='commodity-info-bottom'>
                <View style='width: 60%'><Text>价格</Text></View>
                <View style='width: 40%'>
                  <AtIcon value='subtract-circle' size='18' />
                  <Text style='margin: 0 15px'>1</Text>
                  <AtIcon value='add-circle' size='18' />
                </View>
              </View>
            </View>
          </View>





        </View>
        {/*商品列表*/}
      </View>
    )
  }
}

export default Commodity

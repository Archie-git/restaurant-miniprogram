import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui";

class Introduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {"id":1000,"name":"汉堡王","address":"江西省南昌市青山湖区南京东路235号","tel":"18379888508","businesshour":"08:00 ~ 23:00","story":"汉堡王(Burger King，NYSE:BKC )，又译:保加敬，是全球大型连锁快餐企业，在全球61个国家及地区拥有超过11,220间分店。1954年，詹姆士·麦克拉摩(James Mclamore)及大卫·艾杰敦(David Edgerton)在美国佛罗里达州迈阿密共同经营创设第一家\"汉堡王\"(Burger King)餐厅。两位\"汉堡王\"创办人始终保持着要提供给顾客合理的价格、高品质的产品、快速的服务以及干净的环境的理念。经过无数次的失败和教训，终于将一家寒酸的小店变为拥有上千家分店，资产达数十亿美元的商业帝国，成为流行文化不可或缺的一部分。"}
    }
  }
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '商家信息'
  };
  componentWillMount = () => {
    //获取远程数据
    // Taro.request({
    //   url: 'http://localhost:3001/user/list'
    // }).then(ret => {
    //   console.log("Yes");
    //   console.log(ret);
    // }, err => {
    //   console.log("No");
    //   console.log(err)
    // })
  };
  render () {
    return (
      <View style='margin: 5px 0 50px'>
        <AtList hasBorder={false}>
          <AtListItem title='品牌名称' note={this.state.data.name} />
          <AtListItem title='地址' note={this.state.data.address} />
          <AtListItem title='联系电话' note={this.state.data.tel} />
          <AtListItem title='营业时间' note={this.state.data.businesshour} />
          <AtListItem title='品牌故事' note={this.state.data.story} hasBorder={false} />
        </AtList>
      </View>

      // <view className='container'>
      //   <view className='left'>
      //     <scroll-view className='leftScroll' scroll-y>
      //       <block wx:for="{{list}}" wx:key="list">
      //         <view bindtap='clickScroll' data-id="{{item}}">{{item}}</view>
      //       </block>
      //     </scroll-view>
      //   </view>
      //   <view className='right'>
      //     <scroll-view className='rightScroll' scroll-y scroll-into-view="{{toView}}" scroll-with-animation="true">
      //       <block wx:for="{{list}}" wx:key="list">
      //         <view bindtap='clickScroll' id="{{item}}">{{item}}</view>
      //       </block>
      //     </scroll-view>
      //   </view>
      // </view>

    )
  }
}

export default Introduce

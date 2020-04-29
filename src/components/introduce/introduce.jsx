import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui";

class Introduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  };
  componentWillMount = async () => {
    this.getRemoteData()
  };
  componentDidMount = () => {
    this.timeID = setInterval(async () => {
      this.getRemoteData()
    }, 1000)
  };
  getRemoteData = async () => {
    const res = await Taro.request({
      url: 'https://archie.zone/shop/info',
      mothod: 'GET'
    });
    if(res.statusCode === 200){
      if(res.data.status === 0){
        this.setState({
          data: res.data.data
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
    )
  }
}

export default Introduce

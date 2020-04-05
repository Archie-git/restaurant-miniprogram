import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtTextarea, AtForm, AtButton } from "taro-ui";
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '评价'
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  handleEvaluationChange = (value) => {
    console.log(value)
  };
  handleSubmit = () => {
    console.log("handle submit")
  };
  render () {
    return (
      <View style='height: 100vh; padding: 10px 10px 50px; background: #F0F0F0'>
        <View style='margin: 15px 0 5px'><Text className='at-article__h2'>商品列表</Text></View>
        <View style='padding: 10px; background: white; font-size: 13px'>
          {/*根据订单的商品列表进行渲染*/}
          <View className='at-row' style='margin-bottom: 10px'>
            <View className='at-col at-col-2' style='margin-right: 10px; background: yellow'>图</View>
            <View className='at-col at-col-10'>
              <View className='at-row'>
                <Text className='at-col at-col-7'>牛腩烩饭</Text>
                <View className='at-col at-col-3'><AtIcon value='close' size='10' />1</View>
                <Text className='at-col at-col-2'>￥23</Text>
              </View>
              <Text>中辣</Text>
            </View>
          </View>
          <View className='at-row' style='margin-bottom: 10px'>
            <View className='at-col at-col-2' style='margin-right: 10px; background: yellow'>图</View>
            <View className='at-col at-col-10'>
              <View className='at-row'>
                <Text className='at-col at-col-7'>牛腩烩饭</Text>
                <View className='at-col at-col-3'><AtIcon value='close' size='10' />1</View>
                <Text className='at-col at-col-2'>￥23</Text>
              </View>
              <Text>中辣</Text>
            </View>
          </View>


        </View>

        <View style='margin: 15px 0 5px'><Text className='at-article__h2'>评价</Text></View>
        <View style='padding: 10px 10px 50px; background: white'>
          <View>
            <Text>等级：</Text>
            <Text>$$$$$</Text>
          </View>
          <View>
            <Text style='margin-bottom: 5px'>描述：</Text>
            <AtForm onSubmit={this.handleSubmit}>
              <View style='margin: 5px 0 20px'>
                <AtTextarea
                  value=''
                  placeholder='请输入评价描述'
                  onChange={()=>this.handleEvaluationChange(this.target.value)}
                  height={200}
                />
              </View>
              <AtButton style='margin-top: 5px' type='primary' formType='submit'>提交</AtButton>
            </AtForm>
          </View>
        </View>
      </View>
    )
  }
}

export default Evaluate

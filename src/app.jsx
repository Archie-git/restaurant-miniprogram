import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import 'taro-ui/dist/style/index.scss'
import Authorize from "./pages/authorize/authorize";
import configStore from './store';
import './app.less';

const store = configStore();

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    pages: [
      'pages/authorize/authorize',
      'pages/index/index',
      'pages/search/search',
      'pages/order-detail/order-detail',
      'pages/evaluate/evaluate',
      'pages/payment/payment',
      'pages/commodity-detail/commodity-detail',
      'pages/cart-detail/cart-detail',
      'pages/member/member'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Authorize />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'));

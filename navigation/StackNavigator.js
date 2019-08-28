import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../containers/HomeScreen'
import CameraScreen from '../containers/CameraScreen'
import ListScreen from '../containers/ListScreen'
import InputScreen from '../containers/InputScreen'
import ResultScreen from '../containers/ResultScreen'

export default createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Camera: {
      screen: CameraScreen
    },
    List: {
      screen: ListScreen
    },
    Input: {
      screen: InputScreen
    },
    Result: {
      screen: ResultScreen
    }
  }, {
      initialRouteName: 'Home',
      headerMode: 'none'
  }
)
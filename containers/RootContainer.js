import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppLoading, Asset, Font } from 'expo'
import AppNavigator from '../navigation/AppNavigator'
import { handleFinishLoading } from '../actions'

class Component extends React.Component {

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/trianglify.png'),
      ]),
      Font.loadAsync({
        'lobster': require('../assets/fonts/Lobster_1.3.otf'),
        'exo2ExtraBold': require('../assets/fonts/Exo2-ExtraBold.otf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  render() {
    if (!this.props.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={() => this.props.handleFinishLoading()}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoadingComplete: state.app.isLoadingComplete
  }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
       handleFinishLoading
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})


  
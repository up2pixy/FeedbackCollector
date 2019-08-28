import React from 'react'
import {
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  View
} from 'react-native'
import { LobsterText, ExoBoldText } from '../components/StyledText'
import { AppBackground } from '../components/AppBackground'

export default class HomeScreen extends React.Component {
  
   _handleStartPress = () => {
    this.props.navigation.navigate('Camera')
  }

  render() {
    return (
      <AppBackground>
        <View style={styles.container}>
          <LobsterText style={styles.titleText}>Feedback Collector</LobsterText>
          <View style={styles.subtitleBlock} ß>
            <ExoBoldText style={styles.subtitleText}>Take a picture of the Xbox screen where you see a translation issue.</ExoBoldText>
            <ExoBoldText style={styles.subtitleText}>Help us by sending your translation to make Xbox better!</ExoBoldText>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={this._handleStartPress}>
            <ExoBoldText style={styles.startButtonText}>START</ExoBoldText>
          </TouchableOpacity>
        </View>
      </AppBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  titleText: {
    fontSize: PixelRatio.get() <= 2 ? 38 : 44,
    color: '#fff',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    marginTop: PixelRatio.get() <= 2 ? 100 : 150,
    flex: 1
  },
  subtitleBlock: {
    flex: 1
  },
  subtitleText: {
    fontSize: PixelRatio.get() <= 2 ? 18 : 22,
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    paddingHorizontal: 40,
    paddingVertical: 5
  },
  startButton: {
    height: 70,
    width: 180,
    alignSelf: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
    marginTop: 100,
    marginBottom: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  startButtonText: {
    fontSize: 40,
    color: '#2e78b7',
    lineHeight: 42
  },
})

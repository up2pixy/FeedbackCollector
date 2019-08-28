import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native'
import { Camera, Permissions, ImagePicker } from 'expo'
import { SimpleLineIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleCameraPermissionGranting, cropPhotoAndQueryServerForUiStringItemList, queryServerForUiStringItemList } from '../actions'
import Layout from '../constants/Layout'
import { ExoBoldText } from '../components/StyledText'
import { AppBackground } from '../components/AppBackground' 

class CameraScreen extends React.Component {

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.props.handleCameraPermissionGranting(status === 'granted')
  }
  
  frameLayout = {x: 0, y: 0, width:0 , height:0 }
  cameraLayout = {x: 0, y: 0, width:0 , height:0 }

  _handleShutterButton = async () => {
    if (this.camera) {
      this.props.navigation.navigate('List')
      let photo = await this.camera.takePictureAsync()
      this.props.cropPhotoAndQueryServerForUiStringItemList(photo, cameraLayout, frameLayout)
    }
  }

  _handleImageLibraryButton = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!result.cancelled) {
        this.props.navigation.navigate('List')
        this.props.queryServerForUiStringItemList(result)
      }
    }
  }

  render() {
    const { hasCameraPermission } = this.props
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <AppBackground>
          <View style={styles.overlayView}>
            <View style={styles.titleBlock}>
              <ExoBoldText style={styles.introText}>
                Put your screen in the frame below
              </ExoBoldText>
            </View>
            <Camera
              style={styles.camera} 
              type={Camera.Constants.Type.back}
              ref={ref => { this.camera = ref; }}
              onLayout={event => {cameraLayout = event.nativeEvent.layout}}
              >
              <View style={styles.frameBlock} onLayout={event => {frameLayout = event.nativeEvent.layout}}>
                <View style={styles.frameRow}>
                  <Text style={styles.frameText}>┌</Text>
                  <Text style={styles.frameText}>┐</Text>
                </View>
                <View style={styles.frameRow}>
                  <Text style={styles.frameText}>└</Text>
                  <Text style={styles.frameText}>┘</Text>
                </View>
              </View>
            </Camera>
            <View style={styles.commandButtonBlock}>
              <View style={styles.commandButtons}>
                <View >
                  <TouchableOpacity style={styles.transparentButton}
                    onPress={() => this.props.navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={35} color="#fff" bold="true" />
                  </TouchableOpacity>
                </View>
                <View >
                  <TouchableOpacity style={styles.roundButton}
                    onPress={this._handleShutterButton}>
                    <SimpleLineIcons name="camera" size={35} color="#2e78b7" bold="true" />
                  </TouchableOpacity>
                </View>
                <View >
                  <TouchableOpacity style={styles.transparentButton}
                    onPress={this._handleImageLibraryButton}>
                    <SimpleLineIcons name="picture" size={35} color="#fff" bold="true" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </AppBackground>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    hasCameraPermission: state.capture.hasCameraPermission
  }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
       handleCameraPermissionGranting,
       cropPhotoAndQueryServerForUiStringItemList,
       queryServerForUiStringItemList
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)

const styles = StyleSheet.create({
  titleBlock: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  camera: {
    flex: 7,
    justifyContent: 'center',
  },
  overlayView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  introText: {
    fontSize: PixelRatio.get() <= 2 ? 20 : 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
  },
  frameBlock:{
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: Layout.window.width * 0.95
  },
  frameRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Layout.window.width * 0.95
  },
  frameText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  commandButtonBlock: {
    width: '100%',
    height: 140,
    paddingTop: 20,
    alignItems: 'center',
  },
  commandButtons: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  transparentButton: {
    height: 70,
    width: 80,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  roundButton: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
    borderRadius: 40,
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

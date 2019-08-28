import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  PixelRatio,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'
import { ExoBoldText } from '../components/StyledText'
import { setEmail, sendEmail } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppBackground } from '../components/AppBackground'

class ResultScreen extends React.Component {

  render() {
    let content = null
    let emailSubmitButton = null

    if (!this.props.result.emailSent) {
      emailSubmitButton = (
        <TouchableOpacity style={styles.emailSubmitButton} onPress={() => this.props.sendEmail(this.props.result.feedbackId, this.props.result.email)}>
          <ExoBoldText style={styles.commandButtonText}>OK</ExoBoldText>
        </TouchableOpacity>
      )
    } else {
      emailSubmitButton = (
        <TouchableOpacity style={styles.emailSubmitButton}>
          <Ionicons name="md-checkmark" size={40} color="lightgreen" bold="true" />
        </TouchableOpacity>
      )
    }

    if (this.props.result.isSending) {
      content = (
        <View style={styles.loadingBlock} >
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Sending...</Text>
        </View>
      )
    } else if (this.props.result.submitSucceed){
      content = (
        <View style={styles.resultBlock} >
          <KeyboardAvoidingView style={styles.contentBlock} behavior="padding" enabled>
            <SimpleLineIcons name="check" size={PixelRatio.get() <= 2 ? 130 : 150} color="lightgreen" bold="true" />
            <ExoBoldText style={styles.resultTitle}>You made it!</ExoBoldText>
            <ExoBoldText style={styles.resultText}>We got your feedback. Want to get updates for the feedback?</ExoBoldText>
            <View style={styles.emailBlock}>
              <View style={this.props.result.emailSent ? styles.disabledEmailBox : styles.emailBox}>
                <TextInput
                  style={styles.emailBoxText}
                  onChangeText={text => this.props.setEmail(text)}
                  placeholder='Your email address'
                  value={this.props.result.email}
                  returnKeyType = {'done'}
                  blurOnSubmit = {true}
                  autoCapitalize = {'none'}
                  autoComplete = {'email'}
                  autoCorrect = {false}
                  keyboardType = {'email-address'}
                  editable = {!this.props.result.emailSent}
                />
              </View>
              {emailSubmitButton}
            </View>
          </KeyboardAvoidingView>
          <View style={styles.commandButtonBlock}>
            <TouchableOpacity style={styles.commandButton} onPress={() => this.props.navigation.goBack()}>
              <ExoBoldText style={styles.commandButtonText}>BACK</ExoBoldText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commandButton} onPress={() => this.props.navigation.navigate('Home')}>
              <ExoBoldText style={styles.commandButtonText}>CANCEL</ExoBoldText>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      content = (
        <Text style={styles.startButtonText}>Failed.</Text>
      )
    }

    return ( 
      <AppBackground>
        {content}
      </AppBackground>
    )
  }
}

const mapStateToProps = state => {
  return {
    result: state.result
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setEmail,
    sendEmail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  loadingBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 22,
    color: '#fff',
    paddingLeft: 10
  },
  resultBlock: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resultTitle: {
    fontSize: PixelRatio.get() <= 2 ? 35 : 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
  },
  resultText: {
    fontSize: PixelRatio.get() <= 2 ? 22 : 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
  },
  contentBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  emailBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  emailBox: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height:50,
    borderRadius: 20,
  },
  disabledEmailBox: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height:50,
    borderRadius: 20,
  },
  emailBoxText: {
    width: '100%',
    paddingHorizontal:10,
    fontSize: 20,
  },
  emailSubmitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10
  },
  commandButtonBlock: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 110,
    paddingTop: 20
  },
  commandButton: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
    opacity: 0.7,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  commandButtonText: {
    fontSize: 25,
    color: '#2e78b7',
    lineHeight: 27,
  },
})

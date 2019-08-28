import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  KeyboardAvoidingView
} from 'react-native'
import { ExoBoldText } from '../components/StyledText'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setNewTranslation, handleSendButton } from '../actions'
import { AppBackground } from '../components/AppBackground'

class InputScreen extends React.Component {

  _onSubmit = () => {
    this.props.handleSendButton(this.props.input.uiStringItem, this.props.input.newTranslation)
    this.props.navigation.navigate('Result')
  }

  render() {
    let content = null
    if(this.props.input.uiStringItem) {
      content = (
        <View style={styles.container} >

          <View style={styles.titleBlock}>
            <ExoBoldText style={styles.titleText}>Edit the translation and send to us:</ExoBoldText>
          </View>

          <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding" enabled>
            <View style={styles.resourceBlock}>
              <View style={styles.sourceBlock}>
                <Text style={styles.sourceBlockContentText}>{this.props.input.uiStringItem.SourceString}</Text>
              </View>
              <View style={styles.translationBlock}>
                <TextInput
                  style={styles.translationBlockContentText}
                  onChangeText={text => this.props.setNewTranslation(text)}
                  value={this.props.input.newTranslation}
                  multiline = {true}
                  spellCheck = {true}
                  returnKeyType = {'done'}
                  numberOfLines = {1}
                  blurOnSubmit = {true}
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.commandButtonBlock}>
            <TouchableOpacity style={styles.commandButton} onPress={() => this.props.navigation.goBack()}>
              <ExoBoldText style={styles.commandButtonText}>BACK</ExoBoldText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={this._onSubmit}>
              <ExoBoldText style={styles.commandButtonText}>SEND</ExoBoldText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commandButton} onPress={() => this.props.navigation.navigate('Home')}>
              <ExoBoldText style={styles.commandButtonText}>CANCEL</ExoBoldText>
            </TouchableOpacity>
          </View>

        </View>
      )
    }
    else {
      content = (
        <Text style={styles.commandButtonText}>You haven't select any string to edit.</Text>
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
    input: state.input
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setNewTranslation,
    handleSendButton
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputScreen)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  titleBlock: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1 
  },
  titleText: {
    fontSize: PixelRatio.get() <= 2 ? 18 : 25,
    paddingHorizontal: 30,
    paddingTop: 30,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
  },
  keyboardAvoidingView: {
    flex: 4,
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  resourceBlock: {
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  sourceBlock: {
    width: '100%',
    flex: 1,
    backgroundColor: '#ddd',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
  },
  translationBlock: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 18,
  },
  sourceBlockContentText: {
    fontSize: 18,
    color: '#000',
  },
  translationBlockContentText: {
    fontSize: 18,
    color: '#000',
    width: '100%',
    height: '100%'
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
    width: 110,
    backgroundColor: '#fff',
    opacity: 0.7,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  sendButton: {
    height: 50,
    width: 110,
    backgroundColor: 'lightgreen',
    opacity: 0.8,
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
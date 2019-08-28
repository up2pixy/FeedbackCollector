import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  PixelRatio
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StringItemList } from '../components/StringItemList'
import { selectStringItemToGiveFeedback } from '../actions'
import { ExoBoldText } from '../components/StyledText'
import { AppBackground } from '../components/AppBackground'
import { MaterialCommunityIcons } from '@expo/vector-icons'

class ListScreen extends React.Component {

  _onPressStringItem = id => {
    this.props.selectStringItemToGiveFeedback(this.props.list.uiStringItemList[id])
    this.props.navigation.navigate('Input')
  }

  render() {
    let content = null

    let commandBlock = (
      <View style={styles.commandButtonBlock}>
        <TouchableOpacity style={styles.commandButton} onPress={() => this.props.navigation.goBack()}>
          <ExoBoldText style={styles.commandButtonText}>BACK</ExoBoldText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={() => this.props.navigation.navigate('Home')}>
          <ExoBoldText style={styles.commandButtonText}>CANCEL</ExoBoldText>
        </TouchableOpacity>
      </View>
    )

    if (this.props.list.isSendingPictures) {
      content = (
        <View style={styles.loadingBlock} >
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Recognizing...</Text>
        </View>
      )
    }
    else if (this.props.list.uiStringItemList !== null) {
      if (this.props.list.uiStringItemList.length == 0) {
        content = (
          <View style={styles.sorryBlock} >
            <MaterialCommunityIcons name="emoticon-sad" size={70} color="black" />
            <Text style={styles.sorryText}>Sorry, we can't recognize the text in your picture. Do you want to try again?</Text>
          </View>
        )
      } else {
        content = <StringItemList list={this.props.list.uiStringItemList} onPressStringItem={this._onPressStringItem} />
      }
    }
    else {
      content = <Text style={styles.loadingText}>The string list is null and it's not loading.</Text>
    }

    return ( 
      <AppBackground>
      <View style={styles.container}>
          <View style={styles.titleBlock}>
            <ExoBoldText style={styles.titleText}>Choose the translation you want to fix:</ExoBoldText>
          </View>
          <View style={styles.listBlock}>
            {content}
          </View>
          {commandBlock}
        </View>
      </AppBackground>
    )
  }
}

const mapStateToProps = state => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectStringItemToGiveFeedback
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)

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
    color: '#000',
    paddingLeft: 10
  },
  sorryBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sorryText: {
    fontSize: 18,
    color: '#000',
    padding: 10,
    width: 250
  },
  titleBlock: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  titleText: {
    fontSize: PixelRatio.get() <= 2 ? 18 : 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
  },
  listBlock: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 4
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

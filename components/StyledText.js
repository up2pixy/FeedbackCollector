import React from 'react'
import { Text } from 'react-native'

export class LobsterText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'lobster' }]} />
  }
}

export class ExoBoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'exo2ExtraBold' }]} />
  }
}

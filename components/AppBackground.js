import React from 'react'
import { ImageBackground } from 'react-native'

export class AppBackground extends React.Component {
  render() {
    return (
      <ImageBackground source={require('../assets/images/azure.png')} style={{width: '100%', height: '100%'}} >
        {this.props.children}
      </ImageBackground>
    );
  }
}
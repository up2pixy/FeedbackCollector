import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

export class StringItem extends React.Component {

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPressItem()}>
        <View style={styles.container} >
          <View style={styles.leftBlock}>
            <Text style={styles.targetString}>{this.props.item.TargetString}</Text>
            <Text style={styles.sourceString}>{this.props.item.SourceString}</Text>
          </View>
          <View style={styles.rightBlock}>
            <SimpleLineIcons name="arrow-right" size={25} color="#999" bold="true"/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  leftBlock: {
    flex:8,
  },
  rightBlock: {
    flex:1,
    alignItems: 'flex-end',
    paddingRight: 8
  },
  targetString: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 3,
    color: '#444',
  },
  sourceString: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 10,
    color: '#888',
  }
})
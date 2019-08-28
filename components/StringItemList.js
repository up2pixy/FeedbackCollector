import React from 'react'
import { FlatList } from 'react-native'
import { StringItem } from './StringItem'

export class StringItemList extends React.Component {

  _renderItem = ({item, index}) => (
    <StringItem
      onPressItem={() => this.props.onPressStringItem(index)}
      item={item}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={{width: '100%', padding:10}}
      />
    );
  }
}

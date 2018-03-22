import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Switch } from 'native-base';

import FilterModal from './FilterModal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  button: {
    flex: 1,
  },
});

export default props => (
  <View style={styles.container}>
    <Switch
      value={props.switch}
      onValueChange={props.switchToggle}
    />
    <Button light={!props.switch} onPress={props.onBackdropPress} style={styles.button}>
      <Text>{props.text}</Text>
    </Button>
    <FilterModal
      {...props}
    />
  </View>
);

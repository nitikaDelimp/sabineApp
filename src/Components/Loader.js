import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../Layout/Colors';
import Device from '../Layout/Device';

const Loader = props => {
  return (
    <React.Fragment>
      {props.visible && (
        <View style={styles.container}>
          <ActivityIndicator
            size={'large'}
            color={Colors.primary}
            animating={props.visible}
          />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Device.width,
    height: Device.height,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loader;

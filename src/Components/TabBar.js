import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Tab from './Tab';

const TabBar = ({state, navigation}) => {
  const [selected, setSelected] = useState('New');
  const {routes} = state;

  const renderColor = currentTab =>
    currentTab === selected ? '#000' : '#575757';
  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            // icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
});

export default TabBar;

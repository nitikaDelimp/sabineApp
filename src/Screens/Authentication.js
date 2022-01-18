import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import Colors from '../Layout/Colors';
import Device from '../Layout/Device';

import Login from './Login';
import Register from './Register';
import Loader from '../Components/Loader';
import Font from '../Layout/Font';

const Authentication = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = React.useState([
    {key: 'first', title: 'Sign In', selected: true},
    {key: 'second', title: 'Register', selected: false},
  ]);

  const _renderScene = ({route, props}) => {
    switch (route.key) {
      default:
      case 'first':
        return <Login setLoading={setLoading} props />;
      case 'second':
        return <Register setLoading={setLoading} props />;
    }
  };

  const select = i => {
    setIndex(i);
    check(i);
  };
  const check = i => {
    const newRoutes = routes.map((item, j) => {
      if (j === i) {
        return {...item, selected: true};
      } else {
        return {...item, selected: false};
      }
    });
    setRoutes(newRoutes);
  };

  const _handleIndexChange = i => select(i);

  const _renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <Pressable
              key={i.toString()}
              style={[
                styles.tabItem,
                {
                  backgroundColor: route.selected
                    ? Colors.primary
                    : '#dadada',
                },
              ]}
              onPress={() => select(i)}>
              <Text
                style={[
                  styles.tabTitle,
                  {color: route.selected ? Colors.white : '#848484'},
                ]}>
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <View style={styles.content}>
        <View style={styles.maxHeight}>
          <View style={styles.tabViewContainer}>
            <TabView
              swipeEnabled={false}
              navigationState={{index, routes}}
              renderTabBar={_renderTabBar}
              renderScene={_renderScene}
              onIndexChange={_handleIndexChange}
              initialLayout={{width: layout.width}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    // padding: 10,
  },
  tabViewContainer: {
    marginVertical: 50,
    height: Device.height * 0.85,
  },
  maxHeight: {height: '100%'},
  tabBar: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    width: '50%',
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: Font.LatoBold,
  },
});

export default Authentication;

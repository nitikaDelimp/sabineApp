import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View} from 'react-native';
import {Input, Icon, ListItem} from 'react-native-elements';
import Colors from '../Layout/Colors';
import Font from '../Layout/Font';
import {useNavigation} from '@react-navigation/native';
import MainNavbar from '../Components/MainNavbar';

const Setting = () => {
  const [keyword, setKeyword] = useState(null);

  const navigation = useNavigation();

  const defaults = [
    {
      key: 'menu-item-one',
      title: 'Account',
      icon: 'user-o',
      iconType: 'font-awesome',
      route: 'MyAccount',
    },
    {
      key: 'menu-item-two',
      title: 'Notification',
      icon: 'ios-notifications-outline',
      iconType: 'ionicon',
      route: 'Notification',
    },
    {
      key: 'menu-item-four',
      title: 'Privacy & Security',
      icon: 'lock-closed-outline',
      iconType: 'ionicon',
      route: 'Security',
    },
    {
      key: 'menu-item-five',
      title: 'Help & Support',
      icon: 'headset',
      iconType: 'font-awesome-5',
      route: 'Support',
    },
    {
      key: 'menu-item-six',
      title: 'About',
      icon: 'infocirlceo',
      iconType: 'ant-design',
      route: 'About',
    },
  ];

  const [menus, setMenus] = useState(defaults);

  const keyExtractor = item => item.key.toString();

  const renderItem = ({item}) => (
    <ListItem
      containerStyle={styles.menuContainerStyle}
      onPress={() => navigation.navigate(item.route)}>
      <Icon
        iconStyle={styles.menuIconStyle}
        containerStyle={styles.menuIconContainerStyle}
        name={item.icon}
        type={item.iconType}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron color={Colors.primary} />
    </ListItem>
  );

  const search = () => {
    const filteredMenu = menus.filter(function (menu) {
      return menu.title === keyword;
    });
    if (filteredMenu.length > 0) {
      setMenus(filteredMenu);
    } else {
      setMenus(defaults);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainNavbar />
      <View style={styles.content}>
        <View style={styles.fullWidth}>
          <View>
            <Input
              leftIcon={
                <Icon
                  onPress={() => search()}
                  name="search"
                  type={'font-awesome'}
                  size={14}
                  color={Colors.mutedText}
                />
              }
              onChangeText={text => setKeyword(text)}
              placeholder={'Search for settings'}
              placeholderTextColor={Colors.mutedText}
              inputContainerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
            />
          </View>
          <View>
            <FlatList
              keyExtractor={keyExtractor}
              data={menus}
              renderItem={renderItem}
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
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  searchInputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.mutedText,
  },
  searchInput: {fontFamily: Font.LatoRegular, fontSize: 14},
  menuContainerStyle: {
    height: 'auto',
  },
  menuIconStyle: {
    fontSize: 18,
    color: Colors.primary,
  },
  menuIconContainerStyle: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Setting;

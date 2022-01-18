import React, {useState} from 'react';

import {SafeAreaView, FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../Layout/Colors';
import BackButtonNavbar from '../Components/BackButtonNavbar';
import {Icon} from 'react-native-elements';
import Font from '../Layout/Font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Back from '../Assets/img/back.png';
import NotificationButton from '../Assets/img/Notification.png';

const Notification = (props) => {
  const list = [
    {
      id: 1,
      title: 'New Product',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 2,
      title: 'New Arrival from our designer',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 3,
      title: 'New Design launched',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 4,
      title: 'New Product',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 5,
      title: 'New Product',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 6,
      title: 'New Product Arrival',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 7,
      title: 'Account password changed',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 8,
      title: 'Account section accessed',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 9,
      title: 'Account section accessed',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 10,
      title: 'Account section accessed',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 11,
      title: 'Account section accessed',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
    {
      id: 12,
      title: 'Account section accessed',
      description:
        'Lorem Ipsum Dummy Description Is Written Here , click here to see it',
    },
  ];
  const [notifications, setNotifications] = useState(list);

  const deleteNotification = id => {
    let newList = notifications.map(item => {
      return item.id !== id ? item : {};
    });
    setNotifications(newList);
  };
  const _renderItem = ({item}) => {
    return (
      <>
        {Object.keys(item).length > 0 && (
          <View style={styles.card}>
            <View style={{flexDirection:'row'}}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <Icon name={'notifications-outline'} type={'ionicon'} size={25} />
            </View>
            <View style={{width: wp(70), paddingLeft:wp(2)}}>
              <Text style={styles.title}>{item?.title}</Text>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
            </View>
            <TouchableOpacity >
              <Icon
                onPress={() => deleteNotification(item?.id)}
                name={'trash-outline'}
                type={'ionicon'}
                size={25}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButtonNavbar props
      leftIconSource={Back}
      rightIcon={NotificationButton}
      />
      <View style={styles.contentWrapper}>
        <View style={{marginLeft:wp(5), }}>
          <Text style={styles.notificationTitle}>Notification</Text>
          <View style={styles.lineWrapper}/>
        </View>
        <View style={styles.content}>
          <View style={styles.notificationSection}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={notifications}
              renderItem={_renderItem}
              keyExtractor={item => item?.id?.toString()}
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
  contentWrapper: {
    padding: 15,
  },
  content: {
    width: '100%',
  },
  notificationSection: {
    marginVertical: 20,
  },
  card: {
    marginVertical: hp(2),
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal:wp(2)
  },
  title: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.black,
    paddingVertical:hp(.5)
  },
  description: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    // color: Colors.mutedText,
    color: '#848484'
  },
  lineWrapper:{height:hp(.1), width:wp(82), backgroundColor:'#848484', marginTop:hp(3)},
  notificationTitle:{fontFamily: Font.LatoRegular, fontSize:18, color: Colors.black}
});

export default Notification;

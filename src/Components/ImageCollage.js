import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../Layout/Colors';
import Font from '../Layout/Font';
import Device from '../Layout/Device';
import {useNavigation} from '@react-navigation/native';

const ImageCollage = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Search')}
      containerStyle={styles.card}>
      <View style={styles.imageCollageWrapper}>
        {props.images.map((item, index) => {
          return (
            <Image
              key={Math.random() + '-' + index.toString()}
              style={styles.collageImage}
              source={item.image}
            
            />
          );
        })}
      </View>
      <View>
        <View style={styles.cardBottom}>
          <View style={{marginVertical: 5}}>
            <Text style={styles.title}>The Journal</Text>
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={styles.text}>May Best-Dressed Girls</Text>
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={[styles.text,{textDecorationLine:'underline'}]}>Read More</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Device.width * 0.98,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mutedText,
  },
  cardBottom: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCollageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collageImage: {
    width: Device.width * 0.92 * 0.2,
    height: 250,
  },
  title: {
    fontFamily: Font.LatoBold,
    fontSize: 15,
    color: Colors.primary,
  },
  text: {
    fontFamily: Font.LatoRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },
});

export default ImageCollage;

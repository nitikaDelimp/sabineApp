import React, { useState } from 'react';

import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../Layout/Colors';
import Font from '../Layout/Font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Support = (props) => {
  const[ support, setSupport] = useState(false);

  return (
    <SafeAreaView>
      <View style={{marginHorizontal:wp(5), marginTop:hp(3)}}>
        <View style={{marginVertical:hp(3)}}>
        <Text style={styles.headingFacingWrapper}>What issue are you facing ? </Text>

        </View>
    
        <TouchableOpacity onPress={() => setSupport(!support)} style={styles.btnWrapp}>
          <Text style={styles.btnTitle}>I want to track my order</Text>
          <AntDesign name={support ? "up" : "down"} size={16} color={Colors.black} />
        </TouchableOpacity>

        {
          support ? <View>
            <Text style={styles.accordianTitle}>Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum Loreun ipsum </Text>
          </View> : null
        }
         <View style={styles.lineWrapp}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headingFacingWrapper:{fontSize: 17, fontFamily: Font.LatoRegular, color: Colors.black},
 btnWrapp:{justifyContent:'space-between', flexDirection:'row', marginVertical:hp(2)},
  lineWrapp:{height:hp(.1), backgroundColor: '#8c8c8c',marginVertical:hp(2)},
  btnTitle:{fontSize: 15, fontFamily: Font.LatoRegular, color: Colors.black},
  accordianTitle:{fontSize: 13, fontFamily: Font.LatoRegular, color: '#848484'}


 
});
export default Support;

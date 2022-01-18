import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, FlatList,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../Components/Loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackButtonNavbar from '../Components/BackButtonNavbar';
import Font from '../Layout/Font';
import Colors from '../Layout/Colors';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Back from '../Assets/img/back.png';


const MyAddress = ({ navigation, props }) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);


    const [address, setAddress] = useState([
        {
            id: 1,
            imageData: require('../Assets/img/home.png'),
            label: "420, Noida India Pincode: 20129090 9000000 hjdkjdkjowkdw",
        },
        // {
        //     id: 2,
        //     imageData: require('../Assets/img/home.png'),
        //     label: "420, Noida India Pincode: 20129090 9000000 hjdkjdkjowkdw",
        // }
    ])
    const addressItem = ({ item, index }) => {
        return (
            <>
                <View style={styles.addressWrapper}>
                    <View style={styles.leftAddressWrapper}>
                        <Image source={item.imageData} resizeMode='contain' style={{ height: hp(6), width: wp(6) }} />
                        <View style={styles.centerTextWrapper}>
                            <Text style={styles.centerlabel}>{item.label}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.rightWrapper} onPress={showMenu}>

                        <Menu
                            visible={visible}
                            anchor={<Image source={require("../Assets/img/selet-dots.png")} resizeMode='contain' style={{ height: hp(6), width: wp(6) }} />}
                            // <Text onPress={showMenu}>Show menu</Text>}
                            onRequestClose={hideMenu}
                        >
                            <MenuItem onPress={hideMenu}>Edit</MenuItem>
                            <MenuItem onPress={hideMenu}>Delete</MenuItem>

                        </Menu>

                    </TouchableOpacity>
                </View>
                <View style={styles.lineWrapper} />

            </>

        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackButtonNavbar 
            props
            leftIconSource={Back}/>
            <Loader visible={loading} />
            <ScrollView style={{ marginBottom: hp(7) }} showsVerticalScrollIndicator={false} >
                <View style={{ marginVertical: hp(2), marginHorizontal: wp(5.5) }}>
                    <View style={styles.addressTittleWrapper}>
                        <Text style={styles.leftHeadingAddress}>My Address</Text>
                        <TouchableOpacity>
                            <Text style={styles.rightUnderlineText}>Add Address</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineWrapper} />

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={address}
                        renderItem={addressItem}
                        keyExtractor={item => item?.id?.toString()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    addressTittleWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    leftHeadingAddress: { fontSize: 20, fontFamily: Font.LatoBold, color: Colors.black },
    rightUnderlineText: { textDecorationLine: 'underline', fontSize: 14, color: '#848484', fontFamily: Font.LatoRegular },
    lineWrapper: { height: hp(.1), width: wp(90), backgroundColor: '#848484', marginTop: hp(3) },
    addressWrapper: { justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: wp(3), marginTop: hp(2) },
    leftAddressWrapper: { flexDirection: 'row', alignItems: 'center' },
    centerTextWrapper: { width: wp(70), paddingLeft: wp(2) },
    centerlabel: { fontFamily: Font.LatoRegular, fontSize: 13, paddingLeft: wp(2), color: '#848484' },
    rightWrapper: { alignItems: 'center', justifyContent: 'center' }
});

export default MyAddress;

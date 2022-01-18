import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DividerLine from '../Components/DividerLine';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {fetchDesigners} from '../Reducers/Product.slice';
import Colors from '../Layout/Colors';
import Loader from '../Components/Loader';
import MainNavbar from '../Components/MainNavbar';

const AtoZ = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {designers = [], loading = false} = useSelector(
    state => state?.products,
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchDesigners());
    }
  }, [isFocused]);
  const Item = ({item}) => (
    <View style={{marginVertical: 3}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Designer', {id: item?.term_id})}>
        <Text style={{color: Colors.black}}>{item?.name}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView>
      <Loader visible={loading} />
      <MainNavbar />
      <ScrollView style={{marginBottom: 50}}>
        <DividerLine />
        <View style={{marginHorizontal: 16}}>
          {designers?.length > 0 && (
            <SectionList
              sections={designers}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Item item={item} />}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.heading}>{title}</Text>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
    marginBottom: 5,
  },
  heading: {
    fontSize: 22,
    marginTop: 16,
    marginBottom: 8,
  },
});
export default AtoZ;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../constants/Metrics';
import {COLORS} from '../constants/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Storage_Context} from '../storageContext/StorageContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {_retriveMyTrips} = useContext(Storage_Context);
  const [trips, settrips] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      settrips(_retriveMyTrips());
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <NavBar
        title={'My Trips'}
        leftButton={<AntDesign name="home" size={30} />}
        rightButton={<Ionicons name="add-circle-outline" size={30} />}
        rightBtn_opress={() => navigation.navigate('AddTrips')}
      />
      {trips.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Trips Found !!</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddTrips')}>
            <Text>Add Trips</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {trips.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.tripCard}
                  onPress={() =>
                    navigation.navigate('DetailsScreen', {
                      trip_details: item,
                    })
                  }>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddTrips', {
                        itemData: item,
                        isEdit: true,
                      })
                    }
                    activeOpacity={0.7}
                    style={styles.tripFavButton}>
                    <Feather
                      name={'edit'}
                      size={20}
                      color={COLORS.primary_color}
                    />
                  </TouchableOpacity>
                  <Image
                    style={{width: '100%', aspectRatio: 1}}
                    source={{
                      uri: item.trip_bg.uri,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={[
                        styles.TripCardTxt,
                        {fontSize: moderateScale(16)},
                      ]}>
                      {item.trip_title}
                    </Text>
                    <TouchableOpacity
                      style={{alignItems: 'center', top: 8, padding: 4}}>
                      <MaterialIcons
                        name={'more-vert'}
                        size={22}
                        color={COLORS.yellow}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons
                      name={'location-on'}
                      size={16}
                      color={COLORS.grey_medium}
                    />
                    <Text numberOfLines={2} style={styles.propertyCardTxt}>
                      {item.trip_destination}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tripCard: {
    backgroundColor: COLORS.white,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    width: '44%',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  TripCardTxt: {
    fontSize: moderateScale(12),
    color: COLORS.black,
  },
  tripFavButton: {
    backgroundColor: COLORS.white,
    padding: 4,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
    right: 6,
    top: 6,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addBtn: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    backgroundColor: COLORS.white,
    margin: 10,
    borderRadius: 6,
  },
});

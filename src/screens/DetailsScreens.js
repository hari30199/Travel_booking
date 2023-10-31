import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/Constants';
import moment from 'moment';
import {moderateScale} from '../constants/Metrics';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item_details = route.params?.trip_details || null;

  console.log('hari-->>details-->>', item_details);
  return (
    <View style={styles.container}>
      <NavBar
        title={item_details.trip_title}
        leftButton={<Ionicons name="arrow-back" size={30} />}
        leftBtn_onpress={() => navigation.goBack()}
      />
      <View style={styles.ImageContainer}>
        <Image
          style={[styles.backgroundImage]}
          Image
          source={{
            uri: item_details?.trip_bg?.uri,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{width: '90%', marginTop: 20, alignSelf: 'center'}}>
        <View>
          <Text style={styles.Title}>Destination </Text>
          <Text style={styles.desc}>{item_details.trip_destination}</Text>
        </View>
        <View>
          <Text style={styles.Title}>Start Date </Text>
          <Text style={styles.desc}>
            {moment(item_details.trip_startDate).format('DD-MMM-YYYY')}
          </Text>
        </View>
        <View>
          <Text style={styles.Title}>End Date </Text>
          <Text style={styles.desc}>
            {moment(item_details.trip_endDate).format('DD-MMM-YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    width: '100%',
    aspectRatio: 1 / 0.6,
  },
  ImageContainer: {
    width: '94%',
    aspectRatio: 1 / 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: COLORS.white,
    marginTop: 4,
  },
  Title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.black,
    paddingVertical: 8,
  },
  desc: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.grey_light,
    paddingVertical: 2,
  },
});

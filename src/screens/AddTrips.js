/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedTextInput from '../components/InputContainer';
import {COLORS} from '../constants/Constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {moderateScale, verticalScale} from '../constants/Metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Storage_Context} from '../storageContext/StorageContext';

const AddTrips = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {addNewTrip, _updateAddedTrip, destination_trip} =
    useContext(Storage_Context);
  const item_data = route.params?.itemData || null;
  const isEdit = route.params?.isEdit || null;

  console.log('hari--->>destination-->>', destination_trip);

  const [customDateTime, updateCustomDateTime] = useState(null);
  const [showDate, updateShowDate] = useState(false);

  const [title, setTitle] = useState(isEdit ? item_data.trip_title : null);
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState(
    isEdit ? item_data.trip_startDate : new Date(),
  );
  const [endDate, setEndDate] = useState(
    isEdit ? item_data.trip_endDate : new Date(),
  );
  const [selectedPhoto, updateSelectedPhoto] = useState(
    isEdit ? item_data.trip_bg : null,
  );

  useFocusEffect(
    React.useCallback(() => {
      if (isEdit && destination_trip === null) {
        setDestination(item_data.trip_destination);
      } else {
        setDestination(destination_trip);
      }
    }, [destination_trip, isEdit, item_data]),
  );

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      cropping: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const newPhotos = response.assets[0];
        updateSelectedPhoto(newPhotos);
        console.log('hari-->>images->>', newPhotos);
      }
    });
  };

  const _renderDate = (value, input_title, type, objData) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          const newObj = objData;
          newObj.value = newObj.value || new Date();
          newObj.update(newObj.value || new Date());
          console.log('hari-->>objData-->>', objData);
          updateCustomDateTime(newObj);
          updateShowDate(true);
        }}>
        <AnimatedTextInput
          label={input_title}
          value={moment(value).format('DD-MMM-YYYY')}
          editable={false}
        />
      </TouchableOpacity>
    </View>
  );

  const _renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',

            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            updateShowDate(false);
          }}>
          <View
            style={{
              maxHeight: 250,

              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 15,
              flex: 1,
            }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={customDateTime?.value}
              mode={customDateTime?.type}
              is24Hour={false}
              display="spinner"
              onChange={(e, a) => {
                updateShowDate(false);
                customDateTime.value = a;
                customDateTime?.update(a);
              }}
              style={{
                // color: Colors.default.greyDark,
                fontSize: 18,
                top: Platform.OS === 'ios' ? 3 : 0,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={customDateTime?.value ? customDateTime?.value : null}
        mode={customDateTime?.type}
        is24Hour={false}
        display="default"
        minimumDate={new Date()}
        onChange={(e, a) => {
          updateShowDate(false);
          customDateTime?.update(a);
        }}
        style={{
          color: COLORS.primary_color,
          fontSize: 18,
          top: Platform.OS === 'ios' ? 3 : 0,
        }}
      />
    );
  };

  const _renderNavbar = () => {
    return (
      <NavBar
        title={isEdit ? 'Update Trip' : 'Add Trips'}
        leftButton={<Ionicons name="arrow-back" size={30} />}
        leftBtn_onpress={() => navigation.goBack()}
      />
    );
  };

  const _renderInputContainers = () => {
    return (
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <AnimatedTextInput
          label={'Title'}
          value={title}
          onChangeText={value => setTitle(value)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Destinations')}>
          <AnimatedTextInput
            label={'Destination'}
            value={destination}
            editable={false}
            onChangeText={value => setDestination(value)}
          />
        </TouchableOpacity>
        {_renderDate(`${startDate ? startDate : ''}`, 'Start Date', 'Date', {
          type: 'Date',
          update: setStartDate,
          value: startDate,
        })}

        {_renderDate(`${endDate ? endDate : ''}`, 'End Date', 'Date', {
          type: 'Date',
          update: setEndDate,
          value: endDate,
        })}
        <View style={styles.addPhotocontainer}>
          <TouchableOpacity onPress={() => openImagePicker()}>
            <Text style={styles.addPhtTitle}>
              {isEdit ? 'Update Photo' : 'Add Photo'}
            </Text>
          </TouchableOpacity>
          {selectedPhoto ? (
            <View>
              <Image
                source={{uri: selectedPhoto.uri}}
                style={{width: '40%', aspectRatio: 1, margin: 10}}
              />
              <TouchableOpacity
                onPress={() => updateSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: COLORS.grey_xlight,
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome5 name="trash" size={16} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          ) : (
            <MaterialIcons name="add-a-photo" size={50} />
          )}
        </View>
      </ScrollView>
    );
  };

  const createTrips = () => {
    addNewTrip(title, destination, startDate, endDate, selectedPhoto);
  };

  const updateAddedTrips = async () => {
    _updateAddedTrip(
      item_data,
      title,
      destination,
      startDate,
      endDate,
      selectedPhoto,
    );
  };

  const _renderBottomBtn = () => {
    return (
      <TouchableOpacity
        disabled={
          title === null || destination === null || selectedPhoto === null
        }
        style={styles.createBtn}
        onPress={() => (isEdit ? updateAddedTrips() : createTrips())}>
        <Text style={styles.createTripTitle}>
          {isEdit ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {_renderNavbar()}
      {_renderInputContainers()}
      {_renderBottomBtn()}
      {showDate && _renderDatePicker()}
    </View>
  );
};

export default AddTrips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  addPhotocontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    paddingBottom: 10,
  },
  addPhtTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: COLORS.blue,
    marginTop: 8,
  },
  createBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: verticalScale(20),
    backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    height: verticalScale(45),
    borderRadius: 4,
  },
  createTripTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

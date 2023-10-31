/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedTextInput from '../components/InputContainer';
import {COLORS} from '../constants/Constants';
import {moderateScale, verticalScale} from '../constants/Metrics';
import ModalView from '../components/Modal';
import {Storage_Context} from '../storageContext/StorageContext';

const Destinations = () => {
  const navigation = useNavigation();
  const {_createNewDestination, _retriveMyDestinations, updateDestination} =
    useContext(Storage_Context);
  const [searchValue, setSearchValue] = useState(null);
  const [addDestinationName, setAddDestinationName] = useState(null);
  const [addDestinationDesc, setAddDestinationDesc] = useState(null);
  const [showModal, updateShowModal] = useState(false);

  const createDestinations = async () => {
    _createNewDestination(addDestinationName, addDestinationDesc);
  };

  const _renderModal = () => {
    return (
      <View>
        <ModalView
          supportedOrientations={['portrait', 'landscape']}
          animationType="slide"
          transparentType={true}
          modalVisible={showModal}
          modalStyle={{}}>
          <View
            style={{
              width: '100%',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              shadowColor: COLORS.black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View
              style={[
                {
                  paddingVertical: 20,
                },
              ]}>
              <View>
                <AnimatedTextInput
                  label={'Destination Name'}
                  value={addDestinationName}
                  onChangeText={value => setAddDestinationName(value)}
                />
              </View>
              <View>
                <AnimatedTextInput
                  label={'Destination Description'}
                  value={addDestinationDesc}
                  onChangeText={value => setAddDestinationDesc(value)}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={styles.modalStyle}>
                  <TouchableOpacity
                    style={styles.modalButtonStyle}
                    onPress={() => {
                      updateShowModal(false);
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={
                      addDestinationName === null || addDestinationDesc === null
                    }
                    style={[
                      styles.modalButtonStyle,
                      {backgroundColor: COLORS.blue},
                    ]}
                    onPress={() => {
                      createDestinations(), updateShowModal(false);
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ModalView>
      </View>
    );
  };

  const updatedestination = item => {
    updateDestination(item.destination_title);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.renderItem}
      onPress={() => {
        console.log('hari>>latlong??fromSeacrH>>>', item);
        // navigation.navigate('AddTrips', {title: item.destination_title});
        updatedestination(item);
      }}>
      <Text style={styles.titletxt}>{item.destination_title}</Text>
      <Text style={styles.destxt}>{item.destination_desc}</Text>
    </TouchableOpacity>
  );

  const filtered_Data = _retriveMyDestinations().filter(item =>
    item.destination_title.includes(searchValue),
  );

  return (
    <View style={styles.container}>
      <NavBar
        title={'Destinations'}
        leftButton={<Ionicons name="arrow-back" size={30} />}
        leftBtn_onpress={() => navigation.goBack()}
      />
      <AnimatedTextInput
        label={'Search Destination'}
        value={searchValue}
        onChangeText={value => setSearchValue(value)}
      />
      {_retriveMyDestinations().length === 0 ? (
        <View style={styles.noData}>
          <Text>No Data Found !!!</Text>
        </View>
      ) : (
        <FlatList
          style={styles.dropdown}
          data={searchValue === null ? _retriveMyDestinations() : filtered_Data}
          renderItem={renderItem}
          keyExtractor={item => item.destination_id}
        />
      )}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => updateShowModal(true)}>
        <Text style={styles.createTripTitle}>Create Destination</Text>
      </TouchableOpacity>
      {_renderModal()}
    </View>
  );
};

export default Destinations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  modalStyle: {
    marginRight: 5,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  modalButtonStyle: {
    backgroundColor: COLORS.black,
    paddingVertical: 10,
    width: '50%',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  titletxt: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.black,
  },
  renderItem: {
    width: '94%',
    alignSelf: 'center',
    borderBottomWidth: 0.3,
    paddingVertical: 6,
  },
});

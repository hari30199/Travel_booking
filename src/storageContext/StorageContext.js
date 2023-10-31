import {Alert} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import Realm from 'realm';
import {useNavigation} from '@react-navigation/native';

export const Storage_Context = createContext();

let realm;

export const StorageContext = ({children, props}) => {
  const navigation = useNavigation();
  const [destination_trip, setdestination] = useState(null);
  realm = new Realm({path: 'travel_booking.realm'});

  //   initialize DB
  useEffect(() => {
    realm = new Realm({
      path: 'travel_booking.realm',
      schema: [
        {
          name: 'trip_details',
          properties: {
            trip_id: {type: 'int', default: 0},
            trip_title: 'string',
            trip_destination: 'string',
            trip_startDate: 'date',
            trip_endDate: 'date',
            trip_bg: 'trip_bg',
          },
        },
        {
          name: 'trip_bg',
          properties: {
            uri: 'string',
            fileName: 'string',
            type: 'string',
          },
        },
        {
          name: 'destinations',
          properties: {
            destination_id: {type: 'int', default: 0},
            destination_title: 'string',
            destination_desc: 'string',
          },
        },
      ],
    });
  }, []);

  //   retrive My_tripsData
  function _retriveMyTrips() {
    let mytrips_Data = [];
    try {
      mytrips_Data = realm.objects('trip_details');
    } catch (e) {
      console.log('hari--->>error-->>_retriveMyTrips-->>', e);
    }
    return mytrips_Data;
  }

  useEffect(() => {
    _retriveMyTrips();
  }, []);

  // retrive Destinations
  function _retriveMyDestinations() {
    let destinations_Data = [];
    try {
      destinations_Data = realm.objects('destinations');
    } catch (e) {
      console.log('hari--->>error-->>', e);
    }
    return destinations_Data;
  }

  // Add New Trip
  const addNewTrip = async (
    title,
    destination,
    startDate,
    endDate,
    selectedPhoto,
  ) => {
    try {
      await realm.write(() => {
        var ID =
          realm.objects('trip_details').sorted('trip_id', true).length > 0
            ? realm.objects('trip_details').sorted('trip_id', true)[0].trip_id +
              1
            : 1;
        realm.create('trip_details', {
          trip_id: ID,
          trip_title: title,
          trip_destination: destination,
          trip_startDate: startDate,
          trip_endDate: endDate,
          trip_bg: {
            uri: selectedPhoto.uri,
            fileName: selectedPhoto.fileName,
            type: selectedPhoto.type,
          },
        });
        _retriveMyTrips()
        Alert.alert(
          'Success',
          'Trip Created successfully',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.goBack(), _retriveMyTrips();
              },
            },
          ],
          {cancelable: false},
        );
      });
    } catch (e) {
      console.log('hari-->>>Error-->>savingDate->>', e);
    }
  };

  // Update Added Trips
  const _updateAddedTrip = async (
    item_data,
    title,
    destination,
    startDate,
    endDate,
    selectedPhoto,
  ) => {
    try {
      await realm.write(() => {
        const added_trips = realm
          .objects('trip_details')
          .filtered('trip_id =' + item_data.trip_id);
        (added_trips[0].trip_title = title),
          (added_trips[0].trip_destination = destination),
          (added_trips[0].trip_startDate = startDate.toString()),
          (added_trips[0].trip_endDate = endDate.toString()),
          (added_trips[0].trip_bg = {
            uri: selectedPhoto.uri,
            fileName: selectedPhoto.fileName,
            type: selectedPhoto.type,
          });
        Alert.alert(
          'Success',
          'Trips updated successfully',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.goBack(), _retriveMyTrips();
              },
            },
          ],
          {cancelable: false},
        );
      });
    } catch (e) {
      console.log('hari-->>>Error-->>UpdatingDate->>', e);
    }
  };

  // Add New Destination
  const _createNewDestination = async (
    addDestinationName,
    addDestinationDesc,
  ) => {
    try {
      await realm.write(() => {
        var ID =
          realm.objects('destinations').sorted('destination_id', true).length >
          0
            ? realm.objects('destinations').sorted('destination_id', true)[0]
                .destination_id + 1
            : 1;
        realm.create('destinations', {
          destination_id: ID,
          destination_title: addDestinationName,
          destination_desc: addDestinationDesc,
        });
        Alert.alert(
          'Success',
          'Destinaion Created successfully',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: true},
        );
      });
    } catch (e) {
      console.log('hari-->>>Error-->>savingDate->>', e);
    }
  };

  // update Destions to My trips
  const updateDestination = name => {
    console.log('destination-->>incontext-->>', name);
    setdestination(name);
    navigation.goBack();
  };

  return (
    <Storage_Context.Provider
      value={{
        _retriveMyTrips,
        addNewTrip,
        _updateAddedTrip,
        _createNewDestination,
        _retriveMyDestinations,
        updateDestination,
        destination_trip,
      }}>
      {children}
    </Storage_Context.Provider>
  );
};

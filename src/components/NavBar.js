import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../constants/Metrics';
import {COLORS} from '../constants/Constants';

const CustomNavbar = props => {
  const {title, leftButton, rightButton, leftBtn_onpress, rightBtn_opress} =
    props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftBtn_onpress}>
        {leftButton}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={rightBtn_opress}>
        {rightButton}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(70),
    backgroundColor: COLORS.blue,
    paddingHorizontal: horizontalScale(16),
  },
  title: {
    fontSize: moderateScale(20),
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default CustomNavbar;

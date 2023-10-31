import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const ModalView = ({
  isVisible,
  onModalHide,
  backDropPress,
  backDropColor,
  animationIn,
  animationOut,
  coverScreenValue,
  backdropOpacity,
  animationType,
  transparentType,
  modalVisible,
  onRequestClose,
  supportedOrientations,
  onSwipeComplete,
  modalStyle,
  children,
}) => {
  return (
    <Modal
      testID="modalstyle"
      isVisible={isVisible}
      onModalHide={onModalHide}
      style={modalStyle}
      supportedOrientations={supportedOrientations}
      onBackdropPress={backDropPress}
      animationIn={animationIn}
      animationOut={animationOut}
      coverScreen={coverScreenValue}
      backdropColor={backDropColor}
      backdropOpacity={backdropOpacity}
      animationType={animationType}
      transparent={transparentType}
      visible={modalVisible}
      onRequestClose={onRequestClose}
      onSwipeComplete={onSwipeComplete}>
      {children}
    </Modal>
  );
};

ModalView.propTypes = {
  isVisible: PropTypes.bool,
  onModalHide: PropTypes.func,
  backDropPress: PropTypes.func,
  backDropColor: PropTypes.string,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  children: PropTypes.node,
  coverScreenValue: PropTypes.bool,
  backdropOpacity: PropTypes.any,
  animationType: PropTypes.string,
  transparentType: PropTypes.bool,
  modalVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  supportedOrientations: PropTypes.array,
  onSwipeComplete: PropTypes.func,
  modalStyle: PropTypes.object,
};

ModalView.defaultProps = {
  isVisible: false,
  onModalHide: () => {},
  backDropPress: () => {},
  backDropColor: '#fff',
  children: null,
  animationIn: 'slideInDown',
  animationOut: 'slideOutUp',
  coverScreenValue: false,
  backdropOpacity: 0.35,
  animationType: 'slide',
  transparentType: true,
  modalVisible: false,
  onRequestClose: () => {},
  supportedOrientations: ['portrait', 'landscape'],
  onSwipeComplete: () => {},
  modalStyle: {margin: 0},
};

export default ModalView;

import React, { useImperativeHandle, useState } from 'react';
import { PopUpTypeConstants } from '../../constants/type-constants';
import SnackBar from 'react-native-snackbar-component';
import { colors } from '../../main-styles';

export const Popup = React.forwardRef((props: CustomPopUp, ref) => {
  const [open, setOpen] = useState(false);
  const snackColors = new Map();
  snackColors.set(PopUpTypeConstants.INFO, colors.lightBlue);
  snackColors.set(PopUpTypeConstants.ERROR, colors.lightRed);
  snackColors.set(PopUpTypeConstants.SUCCESS, colors.lightGreen);
  snackColors.set(PopUpTypeConstants.WARNING, colors.lightYellow);

  useImperativeHandle(ref, () => ({
    show: () => setOpen(true),
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackBar
      visible={open}
      textMessage={props.message}
      actionHandler={handleClose}
      actionText="X"
      accentColor={colors.white}
      position={'top'}
      backgroundColor={snackColors.get(props.type)}
      messageColor={colors.white}
    />
  );
});

interface CustomPopUp {
  message: string;
  type: PopUpTypeConstants;
}

import * as React from 'react';
import { Linking, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { ActionsService } from '../../redux/actions';
import { BottomSheet } from '../bottom-sheet';
import { getLicenseBuyUrl } from '../../utils/utils';

export const LicenseBottomSheet: React.FC<any> = () => {
  const dispatch = useDispatch();

  const licenseRequired = useSelector<any>(
    (state) => state.serviceStore.showLicenseRequired
  );
  const modalRef = useRef<any>();

  const changeShowLicense = () => {
    dispatch({
      type: ActionsService.SHOW_LICENSE_REQUIRED,
      payload: false,
    });
  };

  const goToBuyLicense = async () => {
    const LicenseBuyUrl = getLicenseBuyUrl();
    await Linking.openURL(LicenseBuyUrl);
  };

  const bottomSheetCloseHandler = () => {
    changeShowLicense();
  };

  const RenewLicenseHandler = () => {
    modalRef.current?.close();
    goToBuyLicense();
  };

  useEffect(() => {
    if (licenseRequired) {
      modalRef.current.open();
    }
  }, [licenseRequired]);

  return (
    <BottomSheet
      ref={modalRef}
      title={'Отсутствует подписка!'}
      height={450}
      onCloseCallback={bottomSheetCloseHandler}
    >
      <View style={{ paddingTop: 16 }}>
        <Text style={{ marginBottom: 16 }}>
          При отсутствии подписки Вам не доступен данный функционал.
        </Text>
        <Button
          buttonStyle={{
            width: 200,
            alignSelf: 'center',
          }}
          onPress={RenewLicenseHandler}
          title="Продлить лицензию"
        />
      </View>
    </BottomSheet>
  );
};

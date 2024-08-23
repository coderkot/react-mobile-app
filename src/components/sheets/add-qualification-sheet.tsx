import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { DatePicker } from '../date-picker';
import { Text, View } from 'react-native';
import { SheetStyles } from './styles';
import { QualificationCertificateModel } from '../../server/models/models';
import moment from 'moment';
import { requestAddQualificationCertificate } from '../../server/requests';
import { DateFormat } from '../../constants/format-constants';
import { getErrorObject } from '../../utils/utils';
import { useDispatch } from 'react-redux';

export const AddQualificationSheet = React.forwardRef(
  (props: ResumeCertificateProps, modalRef) => {
    const [certificateNumber, setCertificateNumber] = useState<any>();
    const [certificateDate, setCertificateDate] = useState<any>();
    const dispatch = useDispatch();
    const [disableButton, setDisableButton] = useState(true);

    const addCertificate = () => {
      let certificate: QualificationCertificateModel = {
        number: certificateNumber,
        dateIssue: moment(certificateDate).format(DateFormat.ISO_FORMAT),
      };

      requestAddQualificationCertificate(certificate).then((response) => {
        if (response.status === 201) {
          certificate.id = response.data;
          props.certificates?.push(certificate);
          props.update();
        } else {
          dispatch(getErrorObject());
        }
      });

      //@ts-ignore
      modalRef.current.close();
    };

    return (
      <View style={{ marginTop: 32 }}>
        <Input
          value={certificateNumber}
          label={'Номер удостоверения'}
          labelStyle={SheetStyles.modalLabel}
          inputStyle={SheetStyles.inputStyle}
          inputContainerStyle={SheetStyles.inputContainerStyle}
          containerStyle={SheetStyles.modalContainer}
          onChangeText={(val) => setCertificateNumber(val.replace(/^\s+/g, ''))}
        />
        <DatePicker
          label={'Дата удостоверения'}
          width={'100%'}
          height={65}
          currentValue={certificateDate}
          onChange={(value) => {
            setCertificateDate(value);
            setDisableButton(false);
          }}
        />
        <Button
          title={'Подтвердить'}
          buttonStyle={SheetStyles.modalButton}
          onPress={() => addCertificate()}
          disabled={!certificateNumber || disableButton}
        />
        <Text
          style={SheetStyles.modalCancel}
          /*@ts-ignore*/
          onPress={() => modalRef.current.close()}
        >
          Отмена
        </Text>
      </View>
    );
  }
);

interface ResumeCertificateProps {
  update: Function;
  certificates?: Array<QualificationCertificateModel | number>;
}

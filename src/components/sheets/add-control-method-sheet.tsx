import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SheetStyles } from './styles';
import { Picker } from '@react-native-picker/picker';
import { QualificationMethodModel } from '../../server/models/models';
import { requestAddQualificationMethod } from '../../server/requests';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorObject, getObjetsDictionary } from '../../utils/utils';
import { Dictionary, ServiceStore } from '../../redux/reducers';
import { SelectBox } from '../SelectBox/SelectBox';
import { Item } from 'react-native-picker-select';

export const AddControlMethodSheet = React.forwardRef(
  (props: AddControlMethodSheetProps, modalRef) => {
    const [method, setMethod] = useState<number>(0);
    const [listMethod, setListMethod] = useState<Array<Item>>();
    const [listQualifications, setListQualifications] = useState<Array<Item>>();
    const [qualifications, setQualifications] = useState<number>(0);
    const serviceStore = useSelector<any>((state) => state.serviceStore);
    const dispatch = useDispatch();

    const addMethod = () => {
      if (method && qualifications) {
        const item: QualificationMethodModel = {
          controlMethodId: method.toString(),
          qualifications: qualifications.toString(),
        };
        requestAddQualificationMethod(item).then((response) => {
          if (response.status == 201) {
            item.id = response.data;
            props.methods?.push(item);
            props.update();
          } else {
            dispatch(getErrorObject());
          }
        });
      }
      //@ts-ignore
      modalRef?.current?.close();
    };

    useEffect(() => {
      const result = getObjetsDictionary(
        (serviceStore as ServiceStore).controlMethods
      ).map((dict) => {
        return {
          label: `${dict.code} - ${dict.name}`,
          value: dict?.id,
        };
      });
      setListMethod(result);
    }, [(serviceStore as ServiceStore).controlMethods]);

    useEffect(() => {
      const userQualifications = (serviceStore as ServiceStore)
        .userQualifications;
      if (userQualifications) {
        const result = userQualifications.map((item) => {
          return {
            label: item.description,
            value: item?.id,
          };
        });
        setListQualifications(result);
      }
    }, [(serviceStore as ServiceStore).userQualifications]);

    return (
      <View>
        <View style={{ ...SheetStyles.pickerContainer }}>
          {listMethod && (
            <SelectBox
              list={listMethod}
              change={(value) => setMethod(value)}
              placeholder={{ label: 'Метод (вид) контроля', value: '' }}
              value={method}
              styles={SheetStyles.picker}
            />
          )}
        </View>
        <View style={SheetStyles.pickerContainer}>
          {listQualifications && (
            <SelectBox
              list={listQualifications}
              placeholder={{ label: 'Уровень квалификации', value: '' }}
              change={(value) => setQualifications(value)}
              value={qualifications}
              styles={SheetStyles.picker}
            />
          )}
        </View>
        <Button
          title={'Подтвердить'}
          buttonStyle={SheetStyles.modalButton}
          /*@ts-ignore*/
          onPress={() => addMethod()}
          disabled={!method || !qualifications}
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

interface AddControlMethodSheetProps {
  update: Function;
  methods?: Array<QualificationMethodModel | number>;
}

import React from 'react';
import { QualificationMethodModel } from '../../../server/models/models';
import { Text, View } from 'react-native';
import { ProfileStyles } from '../styles';
import { getMethodName, getQualificationName } from '../../../utils/utils';
import { Dictionary, ServiceStore } from '../../../redux/reducers';
import { useSelector } from 'react-redux';
import { SvgIcon } from '../../../components/svg-icon';
import { colors } from '../../../main-styles';

export const MethodControl: React.FC<MethodControlProps> = (props) => {
  const serviceStore = useSelector<any>((state) => state.serviceStore);
  const deleteMethod = (index: number) => {
    props.methods?.splice(index, 1);
    props.update();
  };

  return (
    <View>
      {props.methods &&
        (props.methods as Array<QualificationMethodModel>).map(
          (item: QualificationMethodModel, index: number) => (
            <View key={item.id + index} style={ProfileStyles.section}>
              <View>
                <Text style={ProfileStyles.controlMethodTitle}>Метод:</Text>
                <Text style={ProfileStyles.controlMethodValue}>
                  {getMethodName(
                    (serviceStore as ServiceStore)
                      .controlMethods as Array<Dictionary>,
                    item.controlMethodId
                  )}
                </Text>
                <Text style={ProfileStyles.controlMethodTitle}>
                  Уровень квалификации:
                </Text>
                <Text style={ProfileStyles.controlMethodValue}>
                  {isNaN(Number(item?.qualifications))
                    ? item?.qualifications
                    : getQualificationName(
                        (serviceStore as ServiceStore)
                          .userQualifications as Array<any>,
                        item?.qualifications
                      )}
                </Text>
              </View>

              <View style={{ right: 8, marginTop: 16 }}>
                <SvgIcon
                  icon={'close'}
                  color={colors.middleGray}
                  onPress={() => deleteMethod(index)}
                  height={16}
                  width={16}
                />
              </View>
            </View>
          )
        )}
    </View>
  );
};

interface MethodControlProps {
  methods?: Array<QualificationMethodModel | number>;
  update: Function;
}

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProfileStyles } from '../styles';
import { Dictionary } from '../../../redux/reducers';
import { useSelector } from 'react-redux';
import { getObjetsDictionary } from '../../../utils/utils';
import { SvgIcon } from '../../../components/svg-icon';
import { colors } from '../../../main-styles';
import { Item } from 'react-native-picker-select';
import { SelectBox } from '../../../components/SelectBox/SelectBox';

export const ObjectControl: React.FC<ObjectControlProps> = (props) => {
  const controlObjectsDictionary = useSelector<any>(
    (state) => state.serviceStore.controlObjects
  );

  const controlObjects = useMemo(() => {
    return getObjetsDictionary(
      controlObjectsDictionary as Array<Dictionary>
    ).map((dict) => {
      return {
        label: `${dict.code} - ${dict.name}`,
        value: dict?.id,
      };
    });
  }, [controlObjectsDictionary]);

  const changeObject = (value: any, index: number) => {
    const element = getObjetsDictionary(
      controlObjectsDictionary as Array<Dictionary>
    ).find((item) => item.id == value);

    if (props.objects && element) {
      (props.objects as Array<Dictionary>)[index] = element;
      props.update();
    }
  };

  const deleteObject = (id: number, index: number) => {
    props.objects?.splice(index, 1);
    props.update();
  };

  const filter = (
    objectDictionary: Array<Item>,
    id: number,
    userObjects?: any
  ) => {
    const noUserObjects = !userObjects || (userObjects?.length ?? 0) <= 0;
    const filteredObjectsDictionary = () => {
      return objectDictionary.filter((object: any) => {
        const isUserObject = userObjects?.find(
          (currentObject: any) => currentObject.id == object.value
        );
        const isSelectedObject = object.value == id;
        return !isUserObject || isSelectedObject;
      });
    };

    return noUserObjects ? objectDictionary : filteredObjectsDictionary();
  };

  return (
    <View>
      {props.objects &&
        (props.objects as Array<Dictionary>).map(
          (item: Dictionary, index: number) => (
            <View style={ProfileStyles.section} key={`view${item.id}.${index}`}>
              <View style={ProfileStyles.pickerContainer}>
                {controlObjects && (
                  <SelectBox
                    list={filter(controlObjects, item.id, props?.objects)}
                    change={(value) => changeObject(value, index)}
                    value={item.id}
                    key={'picker' + item.id}
                    styles={ProfileStyles.picker}
                    placeholder={{
                      label: 'Выберите объет контроля',
                      value: null,
                      inputLabel: 'Выберите объет контроля',
                    }}
                  />
                )}
              </View>
              <View style={{ right: 8, marginTop: 20 }}>
                <SvgIcon
                  icon={'close'}
                  color={colors.middleGray}
                  onPress={() => deleteObject(item.id, index)}
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

interface ObjectControlProps {
  objects?: Array<Dictionary | number>;
  update: Function;
}

import React, { useImperativeHandle, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { SvgIcon } from '../../svg-icon';
import { styles } from './styles';
import { CustomButton } from '../custom-button';
import { colors } from '../../../main-styles';

export const NotificationView = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal animationType={'slide'} visible={open} onRequestClose={handleClose}>
      <View style={styles.controlContainerOnView}>
        <Pressable onPress={handleClose}>
          <SvgIcon
            color={colors.middleGray}
            icon={'close'}
            onPress={handleClose}
            width={20}
            height={20}
          />
        </Pressable>
      </View>

      <View>
        <Text style={styles.dateOnView}>03.05.2021</Text>
      </View>

      <View style={styles.descriptionOnView}>
        <Text style={styles.descriptionTitleOnView}>Обновление в разделе:</Text>
        <Text style={styles.descriptionTextOnView}>Нормативная документация</Text>
      </View>

      <View style={styles.descriptionOnView}>
        <Text style={styles.descriptionTitleOnView}>Добавлен документ:</Text>
        <Text style={styles.descriptionTextOnView}>
          Название документа Название документа{'\n'}
          Название документа Название документа{'\n'}
          Название документа Название документа{'\n'}
          Название документа
        </Text>
      </View>

      <View style={styles.descriptionOnView}>
        <Text style={styles.descriptionTitleOnView}>В папке:</Text>
        <Text style={styles.descriptionTextOnView}>
          Метод > Подметод > Объект > Подобъект
        </Text>
      </View>

      {/* TODO: реализовать переходы без navigation props */}
      <View style={styles.buttonContainerOnView}>
        <CustomButton title={'Перейти'} styles={styles.buttonOnView} onPress={() => {}} />
      </View>
    </Modal>
  );
});

import React, { useEffect, useRef } from 'react';
import { DefectModel } from '../../../server/models/models';
import { useFormik } from 'formik';
import { FieldSet } from '../../../components/common/text-box-field-set';
import { Input } from 'react-native-elements';
import { DefectStyles } from './style';
import { Text, TouchableOpacity, View } from 'react-native';
import AddIcon from '../../../assets/icons/svg/add-button-icon.svg';
import { ImagePicker } from '../../../components/ImagePicker';
import { isEmpty } from '../../../utils/utils';

export const DefectTabForm: React.FC<DefectTabFormProps> = (props) => {
  const constructRef = useRef<any>();
  const placementRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const recommendationRef = useRef<any>();
  const formik = useFormik({
    initialValues: {
      controlObjectDescription: '',
      address: '',
      description: '',
      recommendations: '',
    },
    onSubmit: (data) => {
      props.defect.address = data.address;
      props.defect.controlObjectDescription = data.controlObjectDescription;
      props.defect.description = data.description;
      props.defect.recommendations = data.recommendations;
      props.update();
    },
  });

  const showPhotosAddButton = () => {
    const photosCount = props.defect.photoIds?.length || 0;
    return photosCount < 4;
  };

  const addImage = (id: string) => {
    !props.defect.photoIds
      ? (props.defect.photoIds = [id])
      : props.defect.photoIds?.push(id);
    props.update();
  };

  const removeImage = (id: string, index: number) => {
    const indexPhoto = props.defect.photoIds?.findIndex((item) => item == id);
    if (!isEmpty(indexPhoto)) {
      props.defect.photoIds?.splice(indexPhoto as number, 1);
      props.update();
    }
  };

  useEffect(() => {
    formik.setValues({
      controlObjectDescription: props.defect.controlObjectDescription as string,
      address: props.defect.address as string,
      description: props.defect.description as string,
      recommendations: props.defect.recommendations as string,
    });
  }, [props.defect]);

  return (
    <View style={{ width: '100%' }}>
      {/*TODO: В будущем избавиться от FieldSet-ов везде*/}
      <FieldSet
        placeholder="Объект контроля"
        textBoxFieldSetContainerStyle={{
          height: 100,
        }}
      >
        <Input
          placeholder={'Объект контроля'}
          inputStyle={DefectStyles.textBoxInputStyle}
          value={formik.values.controlObjectDescription}
          multiline={true}
          ref={constructRef}
          onPressIn={() => constructRef.current.focus()}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={formik.handleChange('controlObjectDescription')}
          onEndEditing={formik.handleSubmit}
        />
      </FieldSet>

      <FieldSet
        placeholder="Расположение"
        textBoxFieldSetContainerStyle={{
          height: 100,
        }}
      >
        <Input
          placeholder="Расположение"
          inputStyle={DefectStyles.textBoxInputStyle}
          multiline={true}
          value={formik.values.address}
          ref={placementRef}
          onPressIn={() => placementRef.current.focus()}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={formik.handleChange('address')}
          onEndEditing={formik.handleSubmit}
        />
      </FieldSet>
      <FieldSet
        placeholder="Описание дефекта"
        textBoxFieldSetContainerStyle={{
          height: 100,
        }}
      >
        <Input
          placeholder="Описание дефекта"
          inputStyle={{
            borderWidth: 0,
            height: 96,
          }}
          multiline={true}
          value={formik.values.description}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          ref={descriptionRef}
          onPressIn={() => descriptionRef.current.focus()}
          onChangeText={formik.handleChange('description')}
          onEndEditing={formik.handleSubmit}
        />
      </FieldSet>
      <FieldSet
        placeholder="Рекомендации по устранению"
        textBoxFieldSetContainerStyle={{
          height: 100,
        }}
      >
        <Input
          placeholder="Рекомендации по устранению"
          inputStyle={DefectStyles.textBoxInputStyle}
          multiline={true}
          value={formik.values.recommendations}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          ref={recommendationRef}
          onPressIn={() => recommendationRef.current.focus()}
          onChangeText={formik.handleChange('recommendations')}
          onEndEditing={formik.handleSubmit}
        />
      </FieldSet>

      <View style={DefectStyles.photoSection}>
        <View style={DefectStyles.photoHeader}>
          <Text style={DefectStyles.photoText}>Фотографии</Text>
          {showPhotosAddButton() && (
            <TouchableOpacity onPressIn={() => props.sheetRef.current.open()}>
              <AddIcon />
            </TouchableOpacity>
          )}
        </View>

        <ImagePicker
          photos={props.defect.photoIds}
          addFile={addImage}
          ref={props.imagePickerRef}
          isCreated={props.isCreated}
          remove={removeImage}
        />
      </View>
    </View>
  );
};

interface DefectTabFormProps {
  defect: DefectModel;
  update: () => void;
  isCreated?: boolean;
  imagePickerRef: any;
  sheetRef: any;
}

import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { HelpType } from '../../../constants/text-constants';
import { colors } from '../../../main-styles';
import { Button, Input } from 'react-native-elements';
import { SvgIcon } from '../../../components/svg-icon';
import { styles } from './styles';
import { Formik } from 'formik';
import { validationSupportQuestionSchema } from './validation';
import { createSupportTask } from '../../../server/requests';
import { ProjectTypes, TaskTypes } from '../../../constants/type-constants';
import { useDispatch } from 'react-redux';
import { defaultRequestParams, getErrorObject } from '../../../utils/utils';
import { getHelpTasks } from '../../../redux/thunks';
import { launchImageLibrary } from 'react-native-image-picker';
import { Close } from '../../../components/common/close';
import { KeyBoardScrollView } from '../../../components/KeyBoardScrollView';
import { SelectBox } from '../../../components/SelectBox/SelectBox';

export const HelpAddForm = React.forwardRef((props, ref: any) => {
  const [helpType, setHelpType] = useState<ProjectTypes>(
    ProjectTypes.TECHNICAL_SUPPORT
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<Array<any>>([]);
  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const addPhoto = (value: any) => {
    if (!value.didCancel) {
      value.assets.map((item) => {
        attachments.push({
          name: item.fileName,
          uri: item.uri,
          type: item.type,
          size: item.fileSize,
        });
        setAttachments([...attachments]);
      });
    }
  };
  const deleteImage = (fileName: string) => {
    attachments.splice(
      attachments.findIndex((item) => item.fileName == fileName),
      1
    );
    setAttachments([...attachments]);
  };

  const submitHandler = (values: any) => {
    setIsLoading(true);
    createSupportTask({
      attachments: attachments,
      description: values.description,
      projectType: helpType,
      taskType: TaskTypes.INCIDENT,
      title: values.title,
    })
      .then((response) => {
        if (response.status === 201) {
          ref.current.close();
          dispatch(getHelpTasks(defaultRequestParams('DESC', 'id')));
        } else {
          dispatch(getErrorObject());
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <KeyBoardScrollView
      offset={200}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => {
        setOffset(event.nativeEvent.contentOffset.y);
      }}
      keyboardShouldPersistTaps={'handled'}
    >
      <View>
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          validationSchema={validationSupportQuestionSchema}
          onSubmit={submitHandler}
        >
          {(formikProps) => (
            <View
              style={{
                paddingHorizontal: 50,
                alignItems: 'center',
              }}
            >
              <View style={styles.helpTypeContainer}>
                <SelectBox
                  list={[
                    {
                      label: HelpType.SPECIALIST,
                      value: ProjectTypes.SPECIALIST,
                    },
                    {
                      label: HelpType.TECHNICAL_SUPPORT,
                      value: ProjectTypes.TECHNICAL_SUPPORT,
                    },
                  ]}
                  change={(value) => setHelpType(value)}
                  value={helpType}
                  styles={styles.picker}
                />
              </View>
              <Input
                ref={titleRef}
                onBlur={formikProps.handleBlur('title')}
                value={formikProps.values.title}
                inputStyle={styles.helpTitle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={'Тема вопроса'}
                placeholderTextColor={colors.gray}
                returnKeyType={'next'}
                onSubmitEditing={() => descriptionRef.current.focus()}
                blurOnSubmit={false}
                errorMessage={
                  formikProps.touched.title && formikProps.errors.title
                    ? formikProps.errors.title
                    : ''
                }
                onChangeText={formikProps.handleChange('title')}
              />
              <Input
                ref={descriptionRef}
                onBlur={() => formikProps.handleBlur('description')}
                value={formikProps.values.description}
                inputStyle={styles.helpDescription}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder={'Описание вопроса'}
                placeholderTextColor={colors.gray}
                returnKeyType={'done'}
                onSubmitEditing={() => descriptionRef.current.blur()}
                blurOnSubmit={false}
                errorMessage={
                  formikProps.touched.description &&
                  formikProps.errors.description
                    ? formikProps.errors.description
                    : ''
                }
                onChangeText={formikProps.handleChange('description')}
              />

              <View>
                <Button
                  title={'Добавить файл'}
                  buttonStyle={styles.attachFileButton}
                  titleStyle={{ color: colors.darkGray, marginLeft: 10 }}
                  icon={<SvgIcon color={colors.middleGray} icon={'add'} />}
                  containerStyle={{ marginTop: 24, alignSelf: 'center' }}
                  onPress={() =>
                    launchImageLibrary({ mediaType: 'photo' }, addPhoto)
                  }
                />
                <View>
                  {attachments.map((item: any) => (
                    <View key={item.name} style={{ flexDirection: 'row' }}>
                      <Text style={{ marginRight: 10 }}>
                        {item.name.replace('rn_image_picker_lib_temp_', '')}
                      </Text>
                      <View style={{ marginTop: 5 }}>
                        <Close onPress={() => deleteImage(item.name)} />
                      </View>
                    </View>
                  ))}
                </View>

                <Button
                  title={'Отправить'}
                  buttonStyle={styles.sendNewQuestion}
                  containerStyle={{ marginTop: 40, alignSelf: 'center' }}
                  onPress={() => formikProps.handleSubmit()}
                  loading={isLoading}
                  disabled={isLoading}
                />

                <Button
                  title={'Отмена'}
                  buttonStyle={styles.attachFileButton}
                  titleStyle={{ color: colors.darkGray }}
                  containerStyle={{ marginVertical: 16 }}
                  onPress={() => ref.current.close()}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyBoardScrollView>
  );
});

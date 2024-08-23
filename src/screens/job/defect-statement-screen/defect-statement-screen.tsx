import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import moment from 'moment';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { Button, TabView } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { TextBox } from '../../../components/common/text-box';
import { FieldSet } from '../../../components/common/text-box-field-set';
import { DefectHeaderTabs } from '../../../components/defect-statements/defect-header-tabs';
import { validationStatementSchema } from '../validators';
import { DefectStyles, DefectModalStyles } from './style';
import { DateFormat } from '../../../constants/format-constants';
import {
  DefectModel,
  StatementModel,
  UserProfileModel,
} from '../../../server/models/models';
import {
  requestGetReportsById,
  requestSaveReports,
  requestSendReports,
} from '../../../server/requests';
import { ActionsService } from '../../../redux/actions';
import { PopUpTypeConstants } from '../../../constants/type-constants';
import { getErrorObject } from '../../../utils/utils';
import { DefectTabForm } from './defect-tab-form';
import { colors } from '../../../main-styles';
import { DatePicker } from '../../../components/date-picker';
import { KeyBoardScrollView } from '../../../components/KeyBoardScrollView';
import { DefectModal } from './defect-modal';
import { BottomSheet } from '../../../components/bottom-sheet';

export const DefectStatementScreen = () => {
  const [formVariant, setFormVariant] = useState(0);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const id = route?.params?.id;
  const dispatch = useDispatch();
  const imagePickerRef = useRef<any>();
  const sheetRef = useRef<any>();
  const [statement, setStatement] = useState<StatementModel>();
  const [isLoading, setIsLoading] = useState(true);
  const userProfile: UserProfileModel | unknown = useSelector<any>(
    (state) => state.userStore.userProfile
  );
  const emailRef = useRef<any>();
  const layout = useWindowDimensions();

  const handleChangeFormVariant = (variant: string | null) => {
    if (variant !== null) {
      // @ts-ignore
      setFormVariant(variant);
    }
  };

  const getStatement = (reportId: number) => {
    setIsLoading(true);
    requestGetReportsById(reportId).then((response) => {
      if (response.status === 200) {
        setStatement(response.data);
        setIsLoading(false);
      } else {
        dispatch(getErrorObject());
      }
    });
  };

  const update = () => {
    if (id) {
      formik.handleSubmit();
    }
  };

  const sendStatement = () => {
    const emails = [];
    formik.values.email1 && emails.push(formik.values.email1);
    formik.values.email2 && emails.push(formik.values.email2);
    formik.values.email3 && emails.push(formik.values.email3);

    if (statement?.id) {
      setIsLoading(true);
      requestSendReports(emails, statement?.id)
        .finally(() => setIsLoading(false))
        .then((response) => {
          if (response.status === 200) {
            emailRef.current.close();
            dispatch({
              type: ActionsService.SHOW_POPUP,
              payload: {
                message: 'Ведомость отправлена',
                type: PopUpTypeConstants.SUCCESS,
              },
            });
          } else {
            dispatch(getErrorObject());
          }
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      createdAt: moment().toDate(),
      controlObjectDescription: '',
      controlMethodDescription: '',
      nameInspector: '',
      defects: [
        {
          controlObjectDescription: '',
          address: '',
          description: '',
          recommendations: '',
        },
      ],
      email1: '',
      email2: '',
      email3: '',
    },
    validationSchema: validationStatementSchema,
    onSubmit: (data) => {
      if (formik.isValid) {
        let result: StatementModel = {
          name: data.name,
          createdAt: moment(data.createdAt).format(DateFormat.ISO_FORMAT),
          controlObjectDescription: data.controlObjectDescription,
          controlMethodDescription: data.controlMethodDescription,
          defects: data.defects,
        };
        if (statement) {
          result.id = statement.id;
        }

        result.userId = (userProfile as UserProfileModel).id;

        setStatement(result);
        setIsLoading(true);
        requestSaveReports(result)
          .then((response) => {
            if (response.status == 200) {
              dispatch({
                type: ActionsService.SHOW_POPUP,
                payload: {
                  message: 'Данные обновлены',
                  type: PopUpTypeConstants.SUCCESS,
                },
              });
              if (
                formik.values.defects.find((item: DefectModel) => !item.id) &&
                id
              ) {
                getStatement(id);
              } else if (!id) {
                navigation.goBack();
              }
            } else {
              dispatch(getErrorObject());
            }
          })
          .finally(() => setIsLoading(false));
      }
    },
  });

  const addDefect = () => {
    const list = formik.values.defects;
    list.push({
      controlObjectDescription: '',
      address: '',
      description: '',
      recommendations: '',
    });

    formik.setFieldValue('defects', list);
    update();
    setFormVariant(list.length - 1);
  };

  useEffect(() => {
    if (id) {
      getStatement(id);
      navigation.setOptions({
        title: 'Редактирование ведомости',
      });
    } else {
      setIsLoading(false);
      navigation.setOptions({
        title: 'Создание ведомости',
      });
    }
  }, []);

  useEffect(() => {
    const nameInspector = `${(userProfile as UserProfileModel)?.surname} ${
      (userProfile as UserProfileModel)?.name
    } ${(userProfile as UserProfileModel)?.patronymic}`;

    if (statement) {
      formik.setValues({
        name: statement.name as string,
        createdAt: moment(statement.createdAt).toDate(),
        controlObjectDescription: statement.controlObjectDescription as string,
        controlMethodDescription: statement.controlMethodDescription as string,
        nameInspector: nameInspector,
        defects: statement.defects as any,
        email1: (userProfile as UserProfileModel).email as string,
        email2: '',
        email3: '',
      });
    } else {
      formik.setFieldValue('nameInspector', nameInspector);
    }
  }, [statement]);

  const getUserName = (): string => {
    return `${(userProfile as UserProfileModel)?.surname} ${
      (userProfile as UserProfileModel)?.name
    } ${(userProfile as UserProfileModel)?.patronymic}`;
  };

  const paddingHorizontal =
    Platform.OS === 'ios' && layout?.width > layout?.height ? 100 : 0;

  return (
    <KeyBoardScrollView
      offset={200}
      showsVerticalScrollIndicator={false}
      disableTranslation={true}
    >
      <View style={DefectStyles.container}>
        <View style={DefectStyles.titleContainer}>
          <Text style={DefectStyles.titleText}>Основные данные</Text>
        </View>

        <>
          <View style={{ width: '100%' }}>
            <View style={DefectStyles.inputContainer}>
              <FieldSet
                placeholder="Название ведомости"
                textBoxFieldSetContainerStyle={{ width: '100%' }}
              >
                <TextBox
                  disabled={isLoading}
                  placeholder="Название ведомости"
                  errorMessage={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ''
                  }
                  containerStyle={{ width: '100%' }}
                  inputStyle={{ borderWidth: 0 }}
                  onChangeText={formik.handleChange('name')}
                  value={formik.values.name}
                  secureTextEntry={false}
                  onEndEditing={update}
                />
              </FieldSet>

              <DatePicker
                name="createdAt"
                label={'Дата создания'}
                width={'100%'}
                height={45}
                currentValue={formik.values.createdAt}
                onChange={(value) => {
                  formik.setFieldValue('birthDate', value);
                }}
                viewStyle={{ marginTop: 25, marginBottom: 13 }}
              />

              <FieldSet
                placeholder="Объект/адрес объекта/характеристика объекта"
                textBoxFieldSetContainerStyle={{
                  height: 100,
                  width: '100%',
                }}
              >
                <TextBox
                  disabled={isLoading}
                  placeholder="Объект/адрес объекта/характеристика объекта"
                  errorMessage={
                    formik.touched.controlObjectDescription &&
                    formik.errors.controlObjectDescription
                      ? formik.errors.controlObjectDescription
                      : ''
                  }
                  containerStyle={{ width: '100%' }}
                  inputStyle={DefectStyles.textBoxInputStyle}
                  multiline={true}
                  onChangeText={formik.handleChange('controlObjectDescription')}
                  value={formik.values.controlObjectDescription}
                  secureTextEntry={false}
                  onEndEditing={update}
                />
              </FieldSet>

              <FieldSet
                placeholder="Метод контроля/технические средства/нормы оценки"
                textBoxFieldSetContainerStyle={{ height: 100 }}
              >
                <TextBox
                  disabled={isLoading}
                  placeholder={
                    'Метод контроля/технические средства/нормы оценки'
                  }
                  inputStyle={DefectStyles.textBoxInputStyle}
                  value={formik.values.controlMethodDescription}
                  multiline={true}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  onChangeText={formik.handleChange('controlMethodDescription')}
                  errorMessage={
                    formik.touched.controlMethodDescription &&
                    formik.errors.controlMethodDescription
                      ? formik.errors.controlMethodDescription
                      : ''
                  }
                  onEndEditing={update}
                />
              </FieldSet>

              <FieldSet
                placeholder="ФИО дефектоскописта"
                textBoxFieldSetContainerStyle={{
                  width: '100%',
                  marginBottom: 20,
                }}
              >
                <TextBox
                  disabled={true}
                  placeholder="ФИО дефектоскописта"
                  inputStyle={{ borderWidth: 0 }}
                  value={getUserName()}
                  secureTextEntry={false}
                  disabledInputStyle={{ backgroundColor: colors.veryLightGray }}
                />
              </FieldSet>
            </View>

            <DefectHeaderTabs
              defects={formik.values.defects}
              value={formVariant}
              onChange={handleChangeFormVariant}
              onPress={addDefect}
              closeHandler={(index) => {
                formik.values.defects.splice(index, 1);
                formik.setValues({
                  ...formik.values,
                  defects: formik.values.defects,
                });
                update();
                setFormVariant(formik.values.defects.length - 1);
              }}
            />

            {/*@ts-ignore*/}
            <TabView
              value={formVariant}
              onChange={handleChangeFormVariant}
              key={layout.width}
            >
              {formik.values.defects.map(
                (defect, index) =>
                  index === formVariant && (
                    <TabView.Item
                      key={index}
                      onMoveShouldSetResponder={(e) => e.stopPropagation()}
                      style={{
                        ...DefectStyles.tabViewItem,
                        width: layout.width - paddingHorizontal,
                      }}
                    >
                      <DefectTabForm
                        defect={defect}
                        update={update}
                        isCreated={!id}
                        imagePickerRef={imagePickerRef}
                        sheetRef={sheetRef}
                      />
                    </TabView.Item>
                  )
              )}
            </TabView>
          </View>
          <Button
            buttonStyle={DefectStyles.sendBtn}
            onPress={() => {
              if (statement) {
                emailRef.current.open();
              } else {
                formik.handleSubmit();
              }
            }}
            title={statement ? 'Отправить' : 'Создать'}
            loading={isLoading}
            disabled={isLoading}
          />
        </>

        <BottomSheet ref={emailRef} title={'Отправка ведомости'} height={500}>
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
            }}
          >
            <FieldSet
              placeholder="E-mail 1"
              textBoxFieldSetContainerStyle={{
                width: '100%',
              }}
            >
              <TextBox
                disabled={true}
                placeholder="E-mail из профиля"
                placeholderTextColor={colors.darkGray}
                containerStyle={{
                  width: '100%',
                }}
                inputStyle={DefectModalStyles.userEmail}
                value={formik.values.email1}
              />
            </FieldSet>
            <FieldSet
              placeholder="E-mail 2"
              textBoxFieldSetContainerStyle={{
                width: '100%',
              }}
            >
              <TextBox
                disabled={false}
                placeholder="E-mail 2"
                containerStyle={{
                  width: '100%',
                }}
                inputStyle={{
                  borderWidth: 0,
                }}
                onChangeText={formik.handleChange('email2')}
                onBlur={formik.handleBlur('email2')}
                value={formik.values.email2}
              />
            </FieldSet>
            <FieldSet
              placeholder="E-mail 3"
              textBoxFieldSetContainerStyle={{
                width: '100%',
              }}
            >
              <TextBox
                disabled={false}
                placeholder="E-mail 3"
                containerStyle={{
                  width: '100%',
                }}
                inputStyle={{
                  borderWidth: 0,
                }}
                onChangeText={formik.handleChange('email3')}
                onBlur={formik.handleBlur('email3')}
                value={formik.values.email3}
              />
            </FieldSet>
            <View
              style={{
                alignSelf: 'center',
              }}
            >
              <Button
                buttonStyle={DefectModalStyles.sendBtn}
                onPress={() => sendStatement()}
                title="Отправить"
                loading={isLoading}
                disabled={isLoading}
              />
              <Button
                buttonStyle={DefectModalStyles.cancelBtn}
                titleStyle={{
                  color: colors.black,
                }}
                onPress={() => emailRef.current.close()}
                title="Отмена"
              />
            </View>
          </View>
        </BottomSheet>

        <DefectModal imagePickerRef={imagePickerRef} ref={sheetRef} />
      </View>
    </KeyBoardScrollView>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { ProfileCvSection } from '../../../components/profile-cv-section';
import {
  QualificationCertificateModel,
  UserResumeModel,
} from '../../../server/models/models';
import { ProfileStyles } from '../styles';
import { MethodControl } from '../methodControl';
import { ObjectControl } from '../objectControl';
import { Input } from 'react-native-elements';
import { DatePicker } from '../../../components/date-picker';
import moment from 'moment';
import { BottomSheet } from '../../../components/bottom-sheet';
import { AddQualificationSheet } from '../../../components/sheets/add-qualification-sheet';
import { AddControlMethodSheet } from '../../../components/sheets/add-control-method-sheet';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { SvgIcon } from '../../../components/svg-icon';
import { colors } from '../../../main-styles';
import {
  requestDeleteQualificationCertificate,
  requestUpdateResume,
} from '../../../server/requests';
import { getErrorObject } from '../../../utils/utils';
import { Dictionary } from '../../../redux/reducers';
import { ActionsService, ActionsUser } from '../../../redux/actions';
import { PopUpTypeConstants } from '../../../constants/type-constants';
import { KeyBoardScrollView } from '../../../components/KeyBoardScrollView';

export const ResumeView: React.FC<ResumeViewProps> = (props) => {
  const resume = useSelector<any>((state) => state.userStore.userResume);
  const controlObjectsDictionary = useSelector<any>(
    (state) => state.serviceStore.controlObjects
  );
  const qualificationRef = useRef();
  const methodRef = useRef();
  const dispatch = useDispatch();
  const [callback, setCallback] = useState<Array<Function> | undefined>(
    undefined
  );
  const formikProps = useFormik<any>({
    initialValues: {
      additionally: '',
      birthDate: null,
      controlObjects: [],
      description: '',
      experience: null,
      qualificationCertificates: [],
      qualificationMethods: [],
    },
    onSubmit: (data) => {
      let value = getResumeObject(data);
      value.id = (resume as UserResumeModel).id;

      if (formikProps.isValid && formikProps.dirty) {
        requestUpdateResume(value).then((response) => {
          if (response.status == 204) {
            if (callback) {
              callback[0]();
              setCallback(undefined);
            }
            dispatch({
              type: ActionsUser.USER_RESUME,
              payload: {
                ...(resume as UserResumeModel),
                experience: value.experience,
                additionally: value.additionally,
                description: value.description,
                birthDate: value.birthDate,
              },
            });
            dispatch({
              type: ActionsService.SHOW_POPUP,
              payload: {
                message: 'Данные обновлены',
                type: PopUpTypeConstants.SUCCESS,
              },
            });
          } else {
            dispatch(getErrorObject());
          }
        });
      }
    },
  });

  const update = () => {
    formikProps.handleSubmit();
  };

  useEffect(() => {
    let result: any = getResumeObject(resume as UserResumeModel);
    result.birthDate = moment(result.birthDate).toDate();
    formikProps.setValues(result);
  }, [resume]);

  const deleteCertificate = (id: number, index: number) => {
    (
      (resume as UserResumeModel)
        ?.qualificationCertificates as Array<QualificationCertificateModel>
    )?.splice(index, 1);

    const func = () => {
      requestDeleteQualificationCertificate(id).then((response) => {
        if (response.status !== 204) {
          dispatch(getErrorObject());
        }
      });
    };

    props.addCallback([func]);
    update();
  };

  const addObject = () => {
    (resume as UserResumeModel)?.controlObjects?.unshift({
      code: '-1',
      id: -1,
      name: 'Выберите объект контроля',
    });
    update();
  };
  return (
    <View>
      <KeyBoardScrollView offset={200}>
        <ProfileCvSection
          title={'Квалификационное удостоверение'}
          style={{ marginTop: 23 }}
          /*@ts-ignore*/
          addHandler={() => qualificationRef.current?.open()}
        >
          {(
            (resume as UserResumeModel)
              ?.qualificationCertificates as Array<QualificationCertificateModel>
          )?.map((item: QualificationCertificateModel, index) => (
            <View style={ProfileStyles.section}>
              <View>
                <Text style={ProfileStyles.idTitle}>№ {item.number}</Text>
                <Text style={ProfileStyles.idDate}>{item.dateIssue}</Text>
              </View>
              <View style={{ right: 8, marginTop: 16 }}>
                <SvgIcon
                  icon={'close'}
                  color={colors.middleGray}
                  onPress={() => item.id && deleteCertificate(item.id, index)}
                  height={16}
                  width={16}
                />
              </View>
            </View>
          ))}
        </ProfileCvSection>

        <ProfileCvSection
          title={'Метод (вид) контроля'}
          style={{ marginTop: 15 }}
          /*@ts-ignore*/
          addHandler={() => methodRef.current?.open()}
        >
          <MethodControl
            methods={(resume as UserResumeModel)?.qualificationMethods}
            update={() => {
              update();
            }}
          />
        </ProfileCvSection>

        <ProfileCvSection
          title={'Объект контроля'}
          style={{ marginTop: 15 }}
          showCloseIcon={false}
          /*@ts-ignore*/
          addHandler={() => addObject()}
        >
          <ObjectControl
            objects={(resume as UserResumeModel)?.controlObjects}
            update={update}
          />
        </ProfileCvSection>

        <ProfileCvSection
          title={'О себе'}
          style={{ marginTop: 15, marginBottom: 75 }}
          showCloseIcon={false}
          showAddIcon={false}
        >
          <View style={ProfileStyles.datesContainer}>
            <Input
              onChangeText={formikProps.handleChange('experience')}
              value={formikProps.values.experience?.toString()}
              label={'Опыт работы в годах'}
              labelStyle={ProfileStyles.qualityLabel}
              inputStyle={ProfileStyles.inputStyle}
              inputContainerStyle={ProfileStyles.inputContainerStyle}
              containerStyle={ProfileStyles.qualityContainer}
              onBlur={() => update()}
              keyboardType={'numeric'}
            />
            <DatePicker
              label={'Дата рождения'}
              currentValue={formikProps.values.birthDate}
              onChange={(value) => {
                formikProps.setFieldValue('birthDate', value);
                update();
              }}
              width={'47%'}
            />
          </View>
          <Input
            value={formikProps.values.description}
            onChangeText={formikProps.handleChange('description')}
            onChange={(event) => formikProps.handleChange(event)}
            onBlur={() => update()}
            label={'О себе'}
            labelStyle={ProfileStyles.aboutLabel}
            inputStyle={ProfileStyles.inputStyle}
            inputContainerStyle={ProfileStyles.inputContainerStyle}
            containerStyle={ProfileStyles.aboutContainer}
            multiline={true}
            numberOfLines={6}
            style={{ minHeight: Platform.OS === 'ios' ? 20 * 6 : undefined }}
          />
          <Input
            value={formikProps.values.additionally}
            onChangeText={formikProps.handleChange('additionally')}
            onChange={(event) => formikProps.handleChange(event)}
            onBlur={() => update()}
            label={'Дополнительные аттестации'}
            labelStyle={ProfileStyles.additionalLabel}
            inputStyle={ProfileStyles.inputStyle}
            inputContainerStyle={ProfileStyles.inputContainerStyle}
            containerStyle={ProfileStyles.additionalContainer}
            multiline={true}
            style={{ minHeight: Platform.OS === 'ios' ? 20 * 4 : undefined }}
            numberOfLines={4}
          />
        </ProfileCvSection>
      </KeyBoardScrollView>

      <BottomSheet
        ref={qualificationRef}
        title={'Квалификационное удостоверение'}
        height={400}
      >
        <AddQualificationSheet
          ref={qualificationRef}
          certificates={
            (resume as UserResumeModel)
              ?.qualificationCertificates as Array<QualificationCertificateModel>
          }
          update={() => {
            update();
          }}
        />
      </BottomSheet>

      <BottomSheet ref={methodRef} title={'Метод (вид) контроля'} height={400}>
        <AddControlMethodSheet
          ref={methodRef}
          methods={(resume as UserResumeModel)?.qualificationMethods}
          update={() => {
            update();
          }}
        />
      </BottomSheet>
    </View>
  );
};

interface ResumeViewProps {
  addCallback: Function;
}

export const getResumeObject = (data: any): UserResumeModel => {
  return {
    additionally: data?.additionally,
    birthDate: data?.birthDate,
    controlObjects: data?.controlObjects,
    description: data?.description,
    experience: data?.experience,
    qualificationCertificates: data?.qualificationCertificates,
    qualificationMethods: data?.qualificationMethods,
  };
};

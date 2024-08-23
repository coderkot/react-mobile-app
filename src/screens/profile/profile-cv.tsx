import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import { validationResumeSchema } from './validation';
import { getResumeObject, ResumeView } from './resumeView';
import { useDispatch, useSelector } from 'react-redux';
import { UserResumeModel } from '../../server/models/models';
import { requestUpdateResume } from '../../server/requests';
import { PopUpTypeConstants } from '../../constants/type-constants';
import { ActionsService } from '../../redux/actions';
import { getErrorObject } from '../../utils/utils';
import moment from 'moment';
import { DateFormat } from '../../constants/format-constants';
import { getUserProfile } from '../../redux/thunks';

export const ProfileCv = () => {
  const dispatch = useDispatch();
  const resume = useSelector<any>((state) => state.userStore.userResume);
  const [callback, setCallback] = useState<Array<Function> | undefined>(
    undefined
  );

  return (
    <ScrollView>
      <Formik
        validationSchema={validationResumeSchema}
        initialValues={{
          additionally: '',
          birthDate: null,
          controlObjects: [],
          description: '',
          experience: 0,
          qualificationCertificates: [],
          qualificationMethods: [],
        }}
        onSubmit={(values) => {
          let value = getResumeObject(values);
          value.id = (resume as UserResumeModel).id;
          value.birthDate = moment(value.birthDate).format(
            DateFormat.ISO_FORMAT
          );

          requestUpdateResume(value).then((response) => {
            if (response.status == 204) {
              if (callback) {
                callback[0]();
                setCallback(undefined);
              }
              dispatch({
                type: ActionsService.SHOW_POPUP,
                payload: {
                  message: 'Данные обновлены',
                  type: PopUpTypeConstants.SUCCESS,
                },
              });
              dispatch(getUserProfile());
            } else {
              dispatch(getErrorObject());
            }
          });
        }}
      >
        <ResumeView addCallback={setCallback} />
      </Formik>
    </ScrollView>
  );
};

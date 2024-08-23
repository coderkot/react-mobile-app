import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { BusyIndicator } from '../../../components/common/busy-indicator/busy-indicator';
import { JobRequestsItem } from '../../../components/job-request-item/job-request-item';
import { RequestDetailsStyles } from './styles';
import { colors } from '../../../main-styles';
import {
  applyJobApplication,
  requestJobRequestsById,
} from '../../../server/requests';
import { defaultRequestParams, getErrorObject } from '../../../utils/utils';
import { JobRequestsModel } from '../../../server/models/models';
import { Popup } from '../../../components/popup';
import { PopUpTypeConstants } from '../../../constants/type-constants';
import { useRoute } from '@react-navigation/native';
import { updateJobLists } from '../../../redux/thunks';

// @ts-ignore
export const RequestDetails: React.FC<RequestDetailsProps> = (props) => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const jobId = props.id ? props.id : route?.params?.id;
  const [job, setJob] = useState<JobRequestsModel>();
  const popupRef = useRef<any>();

  const onPress = async () => {
    requestApplyJobApplication(jobId);
  };

  const requestApplyJobApplication = (id: number) => {
    if (id) {
      applyJobApplication(id).then((response) => {
        if (response.status == 200) {
          // @ts-ignore
          setJob((prev) => ({ ...prev, isResponded: true }));
          dispatch(updateJobLists(defaultRequestParams('DESC', 'createdAt')));
        } else {
          if (response.status == 400) {
            popupRef.current?.show();
          } else {
            dispatch(getErrorObject());
          }
        }
      });
    }
  };

  const getRequestById = (id: string) => {
    if (id) {
      requestJobRequestsById(id).then((response) => {
        if (response.status == 200) {
          setJob(response.data);
        } else {
          dispatch(getErrorObject());
        }
      });
    }
  };

  useEffect(() => {
    getRequestById(jobId);
  }, []);

  return (
    <BusyIndicator
      visible={false}
      style={{
        height: '100%',
      }}
    >
      <ScrollView contentContainerStyle={RequestDetailsStyles.scroll}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 80,
          }}
        >
          {job && <JobRequestsItem job={job} showDescription={true} />}
        </View>
      </ScrollView>
      {!props.id && !job?.isResponded && (
        <Button
          containerStyle={RequestDetailsStyles.respondBtn}
          buttonStyle={{ backgroundColor: colors.blue }}
          disabled={false}
          title="Откликнуться"
          onPress={onPress}
        />
      )}

      <Popup
        ref={popupRef}
        message={'Ваши навыки не соответствуют требованиям, отклик невозможен'}
        type={PopUpTypeConstants.ERROR}
      />
    </BusyIndicator>
  );
};

interface RequestDetailsProps {
  id?: string;
}

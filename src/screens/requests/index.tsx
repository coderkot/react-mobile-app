import * as React from 'react';
import { FlatList, View } from 'react-native';
import { BusyIndicator } from '../../components/common/busy-indicator/busy-indicator';
import { JobRequestsItem } from '../../components/job-request-item/job-request-item';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ListParams } from '../../server/request-types';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_REQUEST_SIZE,
} from '../../constants/setting-constants';
import { defaultRequestParams } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobLists } from '../../redux/thunks';
import { JobRequestsModel, PagedEntities } from '../../server/models/models';
import { NoData } from '../../components/no-data';

export const RequestsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const jobs = useSelector<any>((state) => state.userStore.jobRequests);
  const queryJobsState = useSelector<any>(
    (state) => state.queryStore.queryJobRequests
  );
  const [requestParams, setRequestParams] = useState<ListParams>(
    defaultRequestParams('DESC', 'createdAt')
  );

  const getJobRequestsList = () => {
    dispatch(updateJobLists(requestParams));
  };

  const getMoreHandler = () => {
    setRequestParams((prev) => ({
      ...prev,
      size: (prev.size ?? 0) + DEFAULT_PAGE_SIZE,
    }));
  };

  useEffect(() => {
    if (requestParams.size > DEFAULT_REQUEST_SIZE) {
      getJobRequestsList();
    }
  }, [requestParams]);

  useFocusEffect(
    useCallback(() => {
      getJobRequestsList();
    }, [])
  );

  return (
    <BusyIndicator visible={false}>
      <View
        style={{
          marginTop: 10,
        }}
      >
        {jobs?.items.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(job) => job.id}
            onEndReachedThreshold={0.1}
            onEndReached={getMoreHandler}
            data={(jobs as PagedEntities<JobRequestsModel>).items}
            renderItem={({ item: job, index }) => {
              return (
                <JobRequestsItem
                  job={job}
                  showDescription={false}
                  onPress={() =>
                    navigation.navigate('RequestDetail', {
                      id: job.id,
                    })
                  }
                  style={
                    index ===
                    (jobs as PagedEntities<JobRequestsModel>).items.length - 1
                      ? { marginBottom: 75 }
                      : {}
                  }
                />
              );
            }}
          />
        )}

        <NoData
          loading={queryJobsState?.loading}
          data={jobs?.items}
          errorMessage={queryJobsState?.error}
        />
      </View>
    </BusyIndicator>
  );
};

import * as React from 'react';
import { Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { Hr } from '../common/hr';
import { JobRequestRespondIcon } from '../job-request-respond-icon/job-request-respond-icon';
import { JobRequestsItemProps } from './job-request-item-props';
import { RequestItemStyles } from './styles';
import moment from 'moment';
import { DateFormat } from '../../constants/format-constants';
import { JobRequestsModel } from '../../server/models/models';

interface KeyValueProps {
  header: { title: string; subTitle: string };
  subTitleStyle?: any;
}

const Item: React.FC<KeyValueProps> = ({
  header: { title, subTitle },
  subTitleStyle,
}) => {
  return (
    <View style={RequestItemStyles.itemContainer}>
      <Text style={RequestItemStyles.itemTitle}>{title}</Text>
      <View
        style={{
          width: '70%',
        }}
      >
        <Text
          style={{
            ...RequestItemStyles.itemSubTitle,
            ...subTitleStyle,
          }}
        >
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

export const JobRequestsItem: React.FC<JobRequestsItemProps> = ({
  job,
  onPress,
  showDescription,
  style,
}) => {
  return (
    <View
      style={{
        marginBottom: 20,
        ...style,
      }}
    >
      <ListItem
        key={job?.id}
        style={RequestItemStyles.jobItem}
        containerStyle={{
          borderRadius: 10,
        }}
      >
        <ListItem.Content>
          <View style={RequestItemStyles.wrapOpenDateText}>
            {job?.isResponded ? (
              <View style={RequestItemStyles.respond}>
                <JobRequestRespondIcon />
                <Text style={RequestItemStyles.respondText}>
                  Вы уже откликались на этот запрос
                </Text>
              </View>
            ) : null}
            <Text style={RequestItemStyles.openDateText}>
              {moment(job?.createdAt).format(DateFormat.DEFAULT_FORMAT)}
            </Text>
          </View>

          <View style={RequestItemStyles.wrapPlaceOfWork}>
            <ListItem.Title style={RequestItemStyles.placeOfWorkTitle}>
              Место проведения работ
            </ListItem.Title>
          </View>

          <View style={RequestItemStyles.wrapJobProps}>
            <Text style={RequestItemStyles.headerText}>{job?.workPlace}</Text>
            <Hr style={RequestItemStyles.hrStyle} />
            <Item
              header={{
                title: 'Применяемый метод:',
                subTitle: job?.controlMethod?.name as string,
              }}
            />
            <Item
              header={{
                title: 'Объект:',
                subTitle: job?.controlObject?.name as string,
              }}
            />
            <Item
              header={{
                title: 'Необходимый уровень дефектоскописта:',
                subTitle: job?.qualifications as string,
              }}
            />
            <Item
              header={{
                title: 'Период работ:',
                subTitle: getDateJob(job),
              }}
            />
            <View style={RequestItemStyles.wrapCostAndMoreDetailsBtn}>
              <Item
                header={{
                  title: 'Предполагаемая стоимость:',
                  subTitle: `${job.workPrice} р.`,
                }}
                subTitleStyle={RequestItemStyles.costText}
              />

              {!showDescription ? (
                <Button
                  onPress={onPress}
                  buttonStyle={RequestItemStyles.moreDetailsBtn}
                  title="Подробнее"
                />
              ) : null}
            </View>
            {showDescription ? (
              <View>
                <Hr />
                <Text style={RequestItemStyles.titleDescriptionText}>
                  Описание работ и объекта контроля
                </Text>
                <Text style={RequestItemStyles.descriptionText}>
                  {job?.workDescription}
                </Text>
              </View>
            ) : null}
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const getDateJob = (job: JobRequestsModel): string => {
  return job.isFullTime
    ? 'На постоянной основе'
    : `${moment(job?.workStart).format(DateFormat.DEFAULT_FORMAT)} - ${moment(
        job?.workEnd
      ).format(DateFormat.DEFAULT_FORMAT)}`;
};

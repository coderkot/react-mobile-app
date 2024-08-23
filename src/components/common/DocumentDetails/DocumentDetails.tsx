import React from 'react';
import { Text, View } from 'react-native';
import { DocumentDetailsStyles } from './styles';
import moment from 'moment';
import { DateFormat } from '../../../constants/format-constants';
import { NotificationModel } from '../../../server/models/models';

export const DocumentDetails: React.FC<DocumentDetailsProps> = (props) => {
  return (
    <View style={DocumentDetailsStyles.container}>
      <View style={DocumentDetailsStyles.dateContainer}>
        <View />
        <View>
          <Text style={DocumentDetailsStyles.itemTitle}>
            {moment(new Date().toString()).format(DateFormat.DEFAULT_FORMAT)}
          </Text>
        </View>
      </View>

      <Text style={DocumentDetailsStyles.itemTitle}>Обновление в разделе:</Text>
      <Text style={DocumentDetailsStyles.itemSubTitle}>
        {props.doc?.data?.title}
      </Text>
      <Text style={DocumentDetailsStyles.itemTitle}>Добавлен документ:</Text>
      <Text style={DocumentDetailsStyles.itemSubTitle}>
        {props.doc?.data?.docName}
      </Text>
      <Text style={DocumentDetailsStyles.itemTitle}>В папке:</Text>
      <Text style={DocumentDetailsStyles.itemSubTitle}>
        {props.doc?.data?.path}
      </Text>
    </View>
  );
};

interface DocumentDetailsProps {
  doc?: NotificationModel;
}

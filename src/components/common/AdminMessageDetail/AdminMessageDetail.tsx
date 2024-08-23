import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import moment from 'moment';
import { DateFormat } from '../../../constants/format-constants';
import { AdminMessageStyle } from './styles';

export const AdminMessageDetail = (props: AdminMessageDetailProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
      <View style={AdminMessageStyle.container}>
        <Text style={AdminMessageStyle.date}>
          {moment(props.data?.createdAt).format(DateFormat.DEFAULT_FORMAT)}
        </Text>
        <Text style={AdminMessageStyle.title}>{props.data?.title}</Text>
        <Text style={AdminMessageStyle.message}>{props.data?.message}</Text>
      </View>
    </ScrollView>
  );
};

interface AdminMessageDetailProps {
  data: Object;
}

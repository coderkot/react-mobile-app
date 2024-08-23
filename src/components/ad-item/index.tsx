import * as React from 'react';
import { GestureResponderEvent, ScrollView, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { AdItemStyles } from './styles';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import { DateFormat } from '../../constants/format-constants';

export const AdItem: React.FC<AdItemProps> = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginBottom: 20,
        ...props.style,
      }}
    >
      <ListItem
        key={props.data?.id}
        style={AdItemStyles.newsItem}
        containerStyle={{
          borderRadius: 10,
        }}
      >
        <ListItem.Content>
          <View style={AdItemStyles.wrapNewsProps}>
            <Text style={AdItemStyles.date}>
              {moment(props.data?.createdAt).format(DateFormat.DEFAULT_FORMAT)}
            </Text>
            <Text style={AdItemStyles.headerText}>{props.data?.title}</Text>
            <Text style={AdItemStyles.methodAndSubmethod}>
              {props.data?.controlMethod.name}
            </Text>
            <View style={AdItemStyles.subHeaderWrapper}>
              {props.showShortDescription ? (
                <HTMLView
                  value={props.data?.description}
                  RootComponent={(htmlProps) => (
                    <Text numberOfLines={3} ellipsizeMode={'tail'}>
                      {htmlProps.children}
                    </Text>
                  )}
                />
              ) : (
                <View style={{ marginBottom: 90 }}>{props.children}</View>
              )}
            </View>

            {props.showShortDescription ? (
              <View>
                <Button
                  onPress={props.onPress}
                  buttonStyle={AdItemStyles.moreDetailsBtn}
                  title="Подробнее"
                />
              </View>
            ) : null}
          </View>
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );
};

export interface AdItemProps {
  data: {
    closeDate: string;
    controlMethod: any;
    createdAt: string;
    description: string;
    id: number;
    isPublished: boolean;
    link: string;
    title: string;
  };
  onPress?: (event: GestureResponderEvent) => void;
  style?: any;
  showShortDescription?: boolean;
}

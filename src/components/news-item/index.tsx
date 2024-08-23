import * as React from 'react';
import { GestureResponderEvent, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { styles } from './styles';
import { CommonNewsItem } from '../../screens/news/news-screen/news-screen';
import HTMLView from 'react-native-htmlview';

export const NewsItem: React.FC<NewsItemProps> = (props) => {
  return (
    <View
      style={{
        marginBottom: 20,
        ...props.style,
      }}
    >
      <ListItem
        key={props.news.id}
        style={styles.newsItem}
        containerStyle={{
          borderRadius: 10,
        }}
      >
        <ListItem.Content>
          <View style={styles.wrapNewsDate}>
            <Text style={styles.newsDateText}>{props.news.publishDate}</Text>
          </View>
          <View style={styles.wrapNewsProps}>
            <Text style={styles.headerText}>{props.news.title}</Text>
            <View style={styles.subHeaderWrapper}>
              {props.showShortDescription ? (
                <HTMLView
                  value={props.news.shortDescription}
                  RootComponent={(htmlProps) => (
                    <Text numberOfLines={3} ellipsizeMode={'tail'}>
                      {htmlProps.children}
                    </Text>
                  )}
                />
              ) : (
                props.children
              )}
            </View>

            {props.showShortDescription ? (
              <View>
                <Button
                  onPress={props.onPress}
                  buttonStyle={styles.moreDetailsBtn}
                  title="Подробнее"
                />
              </View>
            ) : null}
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

interface NewsItemProps {
  news: CommonNewsItem;
  onPress?: (event: GestureResponderEvent) => void;
  style?: any;
  showShortDescription?: boolean;
}

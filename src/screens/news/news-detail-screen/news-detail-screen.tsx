import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NewsItem } from '../../../components/news-item';
import { NewsViewStyles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getNews } from '../../../server/requests';
import HTMLView from 'react-native-htmlview';
import { colors } from '../../../main-styles';

export const NewsDetailScreen: React.FC<NewsDetailScreenProps> = (props) => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [news, setNews] = useState<any>({ description: '' });
  const id = props.id ? props.id : route?.params?.id;

  useEffect(() => {
    getNews(id).then((response) => {
      if (response?.status === 200) {
        setNews({
          ...response?.data,
          publishDate: response?.data.publicationDate,
        });
      }
    });
  }, [id]);

  const goNext = () => {
    navigation.navigate('NewsDetail', {
      id: news.next.id,
    });
  };

  const goBack = () => {
    navigation.navigate('NewsDetail', {
      id: news.prev.id,
    });
  };

  return (
    <View>
      <ScrollView style={{ backgroundColor: colors.white, minHeight: '100%' }}>
        <View style={NewsViewStyles.textWrapper}>
          <NewsItem news={news} showShortDescription={false}>
            <HTMLView
              value={news.description}
              renderNode={(node, index) => {
                if (node.name === 'img') {
                  return (
                    <View style={{ width: 300, height: 300 }}>
                      <Image
                        source={{ uri: node.attribs.src }}
                        key={index}
                        style={{ width: 300, height: 300 }}
                      />
                    </View>
                  );
                }
              }}
            />
          </NewsItem>
        </View>
      </ScrollView>
      {!props.id && (
        <View style={NewsViewStyles.btnWrapper}>
          <Button
            title="Предыдущая"
            onPress={goBack}
            disabled={news.prev ? false : true}
            icon={<Icon name="chevron-left" size={15} color={colors.white} />}
            titleStyle={{
              marginLeft: 16,
            }}
            buttonStyle={NewsViewStyles.button}
          />
          <Button
            title="Следующая"
            onPress={goNext}
            disabled={news.next ? false : true}
            iconPosition="right"
            icon={<Icon name="chevron-right" size={15} color={colors.white} />}
            titleStyle={{
              marginRight: 16,
            }}
            buttonStyle={NewsViewStyles.button}
          />
        </View>
      )}
    </View>
  );
};

interface NewsDetailScreenProps {
  id?: string;
}

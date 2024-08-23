import React, { useEffect, useState } from 'react';
import { Image, Linking, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AdItem } from '../../../components/ad-item';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';
import { requestGetAdvertisingItem } from '../../../server/requests';
import HTMLView from 'react-native-htmlview';
import { colors } from '../../../main-styles';

export const ManufacturersProposalsDetailsScreen = () => {
  const route = useRoute<any>();
  const id = route.params.adId;
  const [item, setItem] = useState<any>();

  useEffect(() => {
    requestGetAdvertisingItem(id).then((response) => {
      if (response.status === 200) {
        setItem(response.data);
      }
    });
  }, [id]);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.white, minHeight: '100%' }}
      >
        <View style={styles.textWrapper}>
          <AdItem data={item} showShortDescription={false}>
            <HTMLView
              value={item?.description}
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
          </AdItem>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          buttonStyle={styles.btnStyle}
          title="Перейти на сайт"
          onPress={async () => {
            await Linking.openURL(item?.link);
          }}
        />
      </View>
    </View>
  );
};

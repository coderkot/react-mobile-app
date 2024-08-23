import * as React from 'react';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export const NoData: React.FC<NowDataProps> = (props) => {
  const { data, errorMessage, loading } = props;
  const [error, setError] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(true);

  useEffect(() => {
    setError((errorMessage ?? '') !== '');
  }, [errorMessage]);

  useEffect(() => {
    setNoData((data?.length ?? 0) <= 0);
  }, [data]);

  return !loading ? (
    <View style={{ alignItems: 'center', marginTop: 16 }}>
      {error && <Text>{errorMessage}</Text>}
      {!error && noData && <Text>{'Нет данных для отображения'}</Text>}
    </View>
  ) : null;
};

interface NowDataProps {
  data?: Array<any>;
  errorMessage?: string;
  loading?: boolean;
}

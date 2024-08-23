import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const KeyBoardScrollView: React.FC<KeyBoardScrollView> = (props) => {
  const [showOffset, setShowOffset] = useState<boolean>(false);
  const viewRef = useRef<any>();

  const onLayout = () => {
    !props.disableTranslation &&
      viewRef.current?.scrollTo({
        x: 0,
        y: props.offset,
        animated: true,
      });
  };

  useEffect(() => {
    const unsubscribe = Keyboard.addListener('keyboardWillShow', () => {
      setShowOffset(true);
    });
    return () => unsubscribe.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = Keyboard.addListener('keyboardWillHide', () =>
      setShowOffset(false)
    );
    return () => unsubscribe.remove();
  }, []);
  return (
    <ScrollView
      ref={viewRef}
      scrollToOverflowEnabled={true}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
      onScroll={props.onScroll}
    >
      {props.children}
      {showOffset && (
        <View onLayout={onLayout} style={{ height: props.offset / 2 }} />
      )}
    </ScrollView>
  );
};

interface KeyBoardScrollView {
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
  offset: number;
  showsVerticalScrollIndicator?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  disableTranslation?: boolean;
}

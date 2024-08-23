import React from 'react';
import { StyleSheet, View } from 'react-native';
import PDFView from 'react-native-view-pdf';

export const PdfViewer: React.FC<PdfViewerProps> = (props) => {

  return (
    <View style={styles.pdf}>
      <PDFView
        style={styles.pdf}
        resource={props.src}
        resourceType={props.type}
        onError={(error) => console.log('Cannot render PDF', error)}
        fadeInDuration={1000}
      />
    </View>
  );
};

interface PdfViewerProps {
  src: string;
  type?: 'url' | 'base64' | 'file';
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
});

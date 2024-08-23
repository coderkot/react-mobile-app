import React from 'react';
import WebView from 'react-native-webview';

export const VideoPlayer = (props: VideoPlayerProps) => {
  return (
    <WebView
      source={{ uri: props.source }}
      allowsFullscreenVideo={true}
      allowFileAccess={true}
      originWhitelist={['*']}
      injectedJavaScript={
        'document.getElementsByTagName("video")[0].controlsList="nodownload";'
      }
    />
  );
};

interface VideoPlayerProps {
  source: string;
}

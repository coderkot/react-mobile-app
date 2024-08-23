import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '../../../main-styles';
import { Badge } from '../../../components/badge';
import { styles } from './styles';
import { HelpType } from '../../../constants/text-constants';
import { Button } from 'react-native-elements';
import DoneIcon from '../../../assets/icons/svg/done-icon.svg';
import AttachIcon from '../../../assets/icons/svg/attach.svg';

import {
  ProjectTypes,
  StatusTasksTypes,
} from '../../../constants/type-constants';
import {
  getSupportTaskById,
  requestSendMessage,
} from '../../../server/requests';
import { useDispatch } from 'react-redux';
import {
  badgeColors,
  defaultRequestParams,
  getErrorObject,
} from '../../../utils/utils';
import { CommentsModel, SupportTaskModel } from '../../../server/models/models';
import { getHelpTasks } from '../../../redux/thunks';
import moment from 'moment';
import { DateFormat } from '../../../constants/format-constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { parseWorkValue } from './help-menu';

export const HelpView: React.FC<HelpViewProps> = (props) => {
  const inputRef = useRef<any>();
  const scrollViewRef = useRef<any>();
  const [message, setMessage] = useState('');
  const id = props.id ? props.id : props.route?.params?.id;
  const [task, setTask] = useState<SupportTaskModel>();
  const [block, setBlock] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const [keyboardIsVisible, setKeyboardVisible] = useState<boolean>(false);
  const endMessage =
    'Оператор техподдержки завершил чат. Если у вас остались вопросы - создайте новое сообщение';

  const dispatch = useDispatch();

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );

    const hideKeyboardVisible = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      showKeyboardListener.remove();
      hideKeyboardVisible.remove();
    };
  }, []);

  const update = () => {
    getSupportTaskById(id).then((response) => {
      if (response.status == 200) {
        setTask(response.data);
        setClose(
          response.data?.taskStatus == StatusTasksTypes.RESOLVE ||
            response.data?.status == StatusTasksTypes.CLOSE ||
            response.data?.status == StatusTasksTypes.CANCELED
        );
        dispatch(getHelpTasks(defaultRequestParams('DESC', 'id')));
      } else {
        dispatch(getErrorObject());
      }
    });
  };

  const sendHandler = (attachments?: Array<any>) => {
    setBlock(true);
    let result =
      attachments && attachments.length > 0
        ? attachments?.map((item) => {
            return {
              name: item.fileName,
              uri: item.uri,
              type: item.type,
              size: item.fileSize,
            };
          })
        : [];

    // @ts-ignore
    requestSendMessage(task?.id, message, result).then((response) => {
      if (response.status == 201) {
        update();
        setBlock(false);
        setMessage('');
      } else {
        dispatch(getErrorObject());
      }
    });
  };

  const sendPhotos = (value: any) => {
    if (!value.didCancel) {
      sendHandler(value.assets);
    }
  };

  const parseComment = (comment: string) => {
    let value = comment;
    if (value) {
      value = value.replace('\\\\ !', '');
      value = value.replace('|thumbnail!', '');
    }
    return value;
  };

  const containerStyle = !props.id
    ? styles.viewChatContainer
    : styles.viewContainer;
  const scrollViewStyle = props.id ? { marginBottom: 140 } : {};

  return (
    <View
      style={{ ...containerStyle, marginBottom: keyboardIsVisible ? 20 : 80 }}
    >
      {task && (
        <>
          <View
            style={{
              ...styles.itemContainer,
              borderBottomWidth: 1,
              borderBottomColor: colors.cream,
            }}
          >
            <View style={styles.itemHeaderContainer}>
              <Text style={styles.helpType}>
                {HelpType[(task as SupportTaskModel).projectType]}
              </Text>
              <Text style={styles.helpDate}>
                {moment((task as SupportTaskModel).createdAt).format(
                  DateFormat.DEFAULT_FORMAT
                )}
              </Text>
              <Badge
                title={parseWorkValue((task as SupportTaskModel).status)}
                color={badgeColors.get((task as SupportTaskModel).status)}
              />
            </View>

            <View style={styles.itemContentContainer}>
              <Text style={styles.title}>
                {(task as SupportTaskModel).title}
              </Text>
            </View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            style={scrollViewStyle}
          >
            {(task as SupportTaskModel)?.comments.map(
              (msgItem: CommentsModel, index) => (
                <View key={`View${index}`}>
                  {msgItem.response && (
                    <Text style={styles.respondent} key={`Respondent${index}`}>
                      {(task as SupportTaskModel).projectType ===
                      ProjectTypes.SPECIALIST
                        ? 'Специалист'
                        : 'Оператор'}
                    </Text>
                  )}
                  <Text
                    key={index}
                    style={styles[!msgItem.response ? 'out' : 'in']}
                    onLongPress={(evt) =>
                      console.log(evt.nativeEvent.locationY)
                    }
                  >
                    {parseComment(msgItem.comment)}
                  </Text>
                </View>
              )
            )}
            {close && (
              <Text style={{ color: colors.lightGray, marginLeft: 16 }}>
                {endMessage}
              </Text>
            )}
          </ScrollView>
          {!props.id && (
            <View style={styles.chatControlContainer}>
              <TextInput
                multiline={true}
                style={styles.chatInput}
                placeholder={'Ваш ответ'}
                value={message}
                onChangeText={(text) => setMessage(text)}
                ref={inputRef}
              />
              <View style={styles.chatButtonGroup}>
                <Button
                  icon={<AttachIcon />}
                  buttonStyle={styles.attachButton}
                  disabled={block || close}
                  onPress={() =>
                    launchImageLibrary({ mediaType: 'photo' }, sendPhotos)
                  }
                />
                <Button
                  icon={<DoneIcon />}
                  buttonStyle={styles.sendButton}
                  disabled={block || close}
                  onPress={sendHandler}
                />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

interface HelpViewProps {
  id?: string;
  route?: {
    params: {
      id?: string;
    };
  };
}

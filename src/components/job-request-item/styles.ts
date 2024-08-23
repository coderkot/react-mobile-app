import { StyleSheet } from 'react-native';
import { colors, MainStyles } from '../../main-styles';

export const RequestItemStyles = StyleSheet.create({
  wrapJobProps: {
    paddingTop: 10,
    width: '100%',
  },
  itemContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  itemTitle: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
  },
  itemSubTitle: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
  },
  jobItem: {
    margin: 5,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 20,
  },
  wrapPlaceOfWork: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  placeOfWorkTitle: {
    ...MainStyles.defaultTextStyle,
    lineHeight: 26,
    color: colors.gray,
  },
  wrapOpenDateText: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  openDateText: {
    lineHeight: 26,
    fontSize: 14,
    color: colors.gray,
  },
  headerText: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 24,
    color: colors.darkGray,
  },
  moreDetailsBtn: {
    marginBottom: 10,
    backgroundColor: colors.blue,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  titleDescriptionText: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
  },
  descriptionText: {
    ...MainStyles.defaultTextStyle,
    fontSize: 14,
    lineHeight: 26,
    color: colors.darkGray,
  },
  wrapCostAndMoreDetailsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  costText: {
    fontWeight: 'bold',
    color: colors.blue,
  },
  hrStyle: {
    marginTop: 15,
    marginBottom: 15,
  },
  respond: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  respondText: {
    ...MainStyles.defaultTextStyle,
    color: colors.blue,
    fontSize: 14,
    marginLeft: 10,
  },
});

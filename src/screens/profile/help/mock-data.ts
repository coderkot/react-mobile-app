import { HelpStatus, HelpType } from '../../../constants/text-constants';

export const MessageList: Array<MessageListProps> = [
  {
    id: '1',
    dateCreate: '21.05.2021',
    helpType: HelpType.SUPPORT,
    status: HelpStatus.RESOLVE,
    title:
      'Тема вопроса тема вопроса тема вопроса тема вопроса тема вопроса тема вопроса тема вопроса тема',
  },
  {
    id: '2',
    dateCreate: '14.04.2021',
    helpType: HelpType.SPECIALIST,
    status: HelpStatus.IN_WORK,
    title: 'Как выучить Javascript за 21 день',
  },
  {
    id: '3',
    dateCreate: '21.03.2021',
    helpType: HelpType.SUPPORT,
    status: HelpStatus.OPEN,
    title: 'Как сделать чтобы отпустило, пожалуйста',
  },
  {
    id: '4',
    dateCreate: '24.06.2021',
    helpType: HelpType.SPECIALIST,
    status: HelpStatus.CLOSE,
    title: 'Почему Далай Лама не лама',
  },
  {
    id: '5',
    dateCreate: '24.06.2021',
    helpType: HelpType.SPECIALIST,
    status: HelpStatus.RESOLVE,
    title:
      'Как профессионально произвести проверку на дефекты методом супер длинного заголовочного воздействия на объекте равноудаленного от остальных дефектоскопических объектов у подметодов дефектоскописта?',
  },
  {
    id: '6',
    dateCreate: '24.06.2021',
    helpType: HelpType.SPECIALIST,
    status: HelpStatus.IN_WORK,
    title:
      'Что такое React Native и как он влияет на мозг программиста при длительном воздействии',
  },
  {
    id: '7',
    dateCreate: '24.06.2021',
    helpType: HelpType.SUPPORT,
    status: HelpStatus.OPEN,
    title: 'Как пользоваться этой программой. Куда смотреть и что делать?',
  },
];

export const Messages: Array<MessagesProps> = [
  {
    chatID: '1',
    messages: [
      { id: '11', messageType: 'out', message: 'Добрый вечер' },
      { id: '12', messageType: 'in', message: 'Я диспетчер' },
    ],
  },
  {
    chatID: '2',
    messages: [
      {
        id: '22',
        message: 'Собственно вопрос в заголовке!',
        messageType: 'out',
      },
      {
        id: '23',
        message: 'А я то тут при чем? Я дефектоскопист!',
        messageType: 'in',
      },
      {
        id: '24',
        message: 'Да помоги, чо ты?',
        messageType: 'out',
      },
      {
        id: '25',
        message: 'Хорошо... Интернет есть?',
        messageType: 'in',
      },
      {
        id: '26',
        message: 'Да',
        messageType: 'out',
      },
      {
        id: '27',
        message:
          'Иди на https://learn.javascript.ru \nТолько ты потратишь больше чем 21 день. Инфа сотка!',
        messageType: 'in',
      },
      {
        id: '28',
        message: 'Спасибо!',
        messageType: 'out',
      },
      {
        id: '29',
        message: 'Ушел учить...',
        messageType: 'out',
      },
    ],
  },
  {
    chatID: '3',
    messages: [
      { id: '31', messageType: 'out', message: 'Здрасте' },
      { id: '32', messageType: 'in', message: 'Забор покрасьте' },
    ],
  },
  {
    chatID: '4',
    messages: [
      { id: '41', messageType: 'out', message: 'Почему?' },
      {
        id: '42',
        messageType: 'in',
        message: 'Что с предыдущего вопроса еще не отпустило?',
      },
      {
        id: '43',
        messageType: 'out',
        message: 'Нет:(',
      },
    ],
  },
  {
    chatID: '5',
    messages: [
      { id: '51', messageType: 'in', message: 'Ну ты загнул' },
      {
        id: '52',
        messageType: 'in',
        message: 'Иди приложение что ли допиши...',
      },
    ],
  },
  {
    chatID: '6',
    messages: [
      {
        id: '61',
        messageType: 'in',
        message:
          'Длительное воздействие React Native на мозг оказывает пагубное влияние...',
      },
      { id: '62', messageType: 'in', message: 'Будьте осторожны!' },
      { id: '63', messageType: 'out', message: 'А что у вас сейчас в руке?' },
      { id: '64', messageType: 'in', message: 'Телефон' },
      { id: '65', messageType: 'out', message: 'Аа, я думал сова' },
      {
        id: '66',
        messageType: 'in',
        message: 'Ну вот, пожалуйста, началось... Я звоню в 03',
      },
    ],
  },
  {
    chatID: '7',
    messages: [
      {
        id: '72',
        message: 'Как пользоваться этой программой?',
        messageType: 'out',
      },
      {
        id: '73',
        message: 'Берешь и пользуешься',
        messageType: 'in',
      },
      {
        id: '74',
        message: 'Но я не умею',
        messageType: 'out',
      },
      {
        id: '75',
        message: 'А чего там уметь? Все просто, доступно и понятно!',
        messageType: 'in',
      },
      {
        id: '76',
        message: 'А с чего начать?',
        messageType: 'out',
      },
      {
        id: '77',
        message: 'Начни с раздела "Заявки на работу"',
        messageType: 'in',
      },
      {
        id: '78',
        message: 'Спасибо!',
        messageType: 'out',
      },
      {
        id: '79',
        message: 'Не за что!',
        messageType: 'in',
      },
    ],
  },
];

export interface MessageListProps {
  id: string;
  title: string;
  dateCreate: string;
  status: HelpStatus;
  helpType: HelpType;
}

export interface MessagesProps {
  chatID: string;
  messages: Array<{ id: string; message: string; messageType: 'out' | 'in' }>;
}

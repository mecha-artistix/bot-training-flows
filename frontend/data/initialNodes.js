export const nodes = [
  {
    position: {
      x: 200,
      y: 250,
    },
    type: 'actionnode',
    data: {
      text: 'Start',
    },
    width: 116,
    height: 32,
    id: 'start_node',
    _id: '668669e3eb7b7dfc310d3f85',
  },
  {
    position: {
      x: 412.34375,
      y: 126,
    },
    type: 'responsenode',
    data: {
      id: 'node-1',
      label: 'node-1',
      texts: ['sa'],
    },
    width: 155,
    height: 88,
    id: 'node-1',
    _id: '66866aad0979015dbcaa7a19',
  },
  {
    position: {
      x: 517.34375,
      y: 404,
    },
    type: 'responsenode',
    data: {
      id: 'node-2',
      label: 'node-2',
      texts: ['sad'],
    },
    width: 155,
    height: 88,
    id: 'node-2',
    _id: '66866aad0979015dbcaa7a1a',
  },
  {
    position: {
      x: 803.34375,
      y: 211,
    },
    type: 'responsenode',
    data: {
      id: 'node-3',
      label: 'node-3',
      texts: ['sad'],
    },
    width: 155,
    height: 88,
    id: 'node-3',
    _id: '66866aad0979015dbcaa7a1b',
  },
  {
    position: {
      x: 1155.34375,
      y: -14,
    },
    type: 'responsenode',
    data: {
      id: 'node-4',
      label: 'node-4',
      texts: ['sad'],
    },
    width: 155,
    height: 88,
    id: 'node-4',
    _id: '66866afe0979015dbcaa7b2e',
  },
  {
    position: {
      x: 1140.0901830594385,
      y: 256.2945960926055,
    },
    type: 'responsenode',
    data: {
      id: 'node-5',
      label: 'node-5',
      texts: ['sada'],
    },
    width: 155,
    height: 88,
    id: 'node-5',
    _id: '66866afe0979015dbcaa7b2f',
  },
  {
    position: {
      x: 831.2280076625766,
      y: 556.1647695273805,
    },
    type: 'responsenode',
    data: {
      id: 'node-6',
      label: 'node-6',
      texts: ['sd'],
    },
    width: 155,
    height: 88,
    id: 'node-6',
    _id: '66866afe0979015dbcaa7b30',
  },
  {
    position: {
      x: 656.5782382434348,
      y: -4.151391710787146,
    },
    type: 'responsenode',
    data: {
      id: 'node-7',
      label: 'node-7',
      texts: ['fdsdgd'],
    },
    width: 155,
    height: 88,
    id: 'node-7',
    _id: '66867c085e34b2ce51bd5f3a',
  },
  {
    position: {
      x: 1480.0468772082065,
      y: 154.3176889751037,
    },
    type: 'responsenode',
    data: {
      id: 'node-8',
      label: 'node-8',
      texts: ['this is posity'],
    },
    width: 147,
    height: 87,
    id: 'node-8',
    _id: '6686cc83e52d9e335b3b6922',
  },
];

export const initNodes = [
  {
    id: 'start_node',
    type: 'actionnode',
    position: {
      x: -272.9035687512438,
      y: 492.3184419859259,
    },
    data: {
      text: 'Start',
    },
    width: 116,
    height: 32,
    selected: false,
    positionAbsolute: {
      x: -272.9035687512438,
      y: 492.3184419859259,
    },
    dragging: false,
  },
  {
    id: 'node-12',
    type: 'responsenode',
    position: {
      x: -100.86549626210247,
      y: 506.5996028916536,
    },
    data: {
      texts: [
        'Hi this is Alex, I am calling to share some exciting car insurance opportunities, do you wanna check further.',
      ],
    },
    width: 147,
    height: 136,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: -100.86549626210247,
      y: 506.5996028916536,
    },
    intention: 'positive',
  },
  {
    id: 'node-3',
    type: 'responsenode',
    position: {
      x: 383.72093031977954,
      y: 394.20369580239196,
    },
    data: {
      texts: ['Can you please specify the vehicle type, name and model so that I can assist you better.'],
    },
    width: 147,
    height: 120,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 383.72093031977954,
      y: 394.20369580239196,
    },
    response: {
      label: 'Positive',
      inputs: [''],
    },
    intention: 'positive',
  },
  {
    id: 'node-4',
    type: 'responsenode',
    position: {
      x: 164.11497498237023,
      y: 772.7572543257503,
    },
    data: {
      texts: ['Alright, thanks for your time, bye bye.'],
    },
    width: 147,
    height: 88,
    selected: false,
    positionAbsolute: {
      x: 164.11497498237023,
      y: 772.7572543257503,
    },
    dragging: false,
    response: {
      label: 'No',
      inputs: ["I don't want", 'I already have', 'Not really'],
    },
    intention: 'negative',
  },
  {
    id: 'node-5',
    type: 'responsenode',
    position: {
      x: 766.9658223369081,
      y: 377.62065469074423,
    },
    data: {
      texts: ['okay, May I know is it registered on your name?'],
    },
    width: 147,
    height: 104,
    selected: false,
    positionAbsolute: {
      x: 766.9658223369081,
      y: 377.62065469074423,
    },
    dragging: false,
    response: {
      label: 'yes',
      inputs: ['car, vitz, 2018'],
    },
    intention: 'positive',
  },
  {
    id: 'node-6',
    type: 'responsenode',
    position: {
      x: 59.860424895469635,
      y: 210.68603314703768,
    },
    data: {
      texts: ['You must be happy to listen this.'],
    },
    width: 147,
    height: 88,
    selected: false,
    positionAbsolute: {
      x: 59.860424895469635,
      y: 210.68603314703768,
    },
    dragging: false,
    response: {
      label: 'Neutral',
      inputs: [''],
    },
    intention: 'neutral',
  },
  {
    id: 'node-7',
    type: 'responsenode',
    position: {
      x: 422.5933323461285,
      y: 1461.747599188242,
    },
    data: {
      texts: ['i wont take much tim'],
    },
    width: 147,
    height: 88,
    selected: true,
    positionAbsolute: {
      x: 422.5933323461285,
      y: 1461.747599188242,
    },
    dragging: false,
    response: {
      label: 'if busy',
      inputs: [''],
    },
    intention: 'negative',
  },
  {
    id: 'node-9',
    type: 'responsenode',
    position: {
      x: 742.5397587614317,
      y: 710.8423597064656,
    },
    data: {
      texts: ["I understand your concern, i'll not force you, take care, bye."],
    },
    width: 147,
    height: 104,
    selected: false,
    positionAbsolute: {
      x: 742.5397587614317,
      y: 710.8423597064656,
    },
    dragging: false,
    response: {
      label: "I don't wanna share",
      inputs: ['No', ''],
    },
    intention: 'negative',
  },
  {
    id: 'node-10',
    type: 'responsenode',
    position: {
      x: 1168.3624392294962,
      y: 235.5276736026741,
    },
    data: {
      texts: ['I am transferring your call to senior supervisor for better assistance, please hold on.'],
    },
    width: 147,
    height: 120,
    selected: false,
    positionAbsolute: {
      x: 1168.3624392294962,
      y: 235.5276736026741,
    },
    dragging: false,
    response: {
      label: 'yes yes',
      inputs: ['ofcourse', 'yeah'],
    },
    intention: 'positive',
  },
  {
    id: 'node-11',
    type: 'responsenode',
    position: {
      x: 1168.9733855832806,
      y: 516.091532470308,
    },
    data: {
      texts: ['Alright, thanks for your time, bye bye.'],
    },
    width: 147,
    height: 88,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 1168.9733855832806,
      y: 516.091532470308,
    },
    response: {
      label: 'No',
      inputs: [''],
    },
    intention: 'negative',
  },
];

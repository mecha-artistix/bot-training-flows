export const initNodes = [
  {
    id: "start_node",
    type: "actionnode",
    position: {
      x: -272.9035687512438,
      y: 492.3184419859259,
    },
    data: {
      text: "Start",
    },
    width: 116,
    height: 32,
    selected: true,
    positionAbsolute: {
      x: -272.9035687512438,
      y: 492.3184419859259,
    },
    dragging: false,
  },
  {
    id: "node-12",
    type: "responsenode",
    position: {
      x: -100.86549626210247,
      y: 506.5996028916536,
    },
    data: {
      label: "",
      texts: [
        "Hi this is Alex, I am calling to share some exciting car insurance opportunities, do you wanna check further.",
      ],
    },
    width: 147,
    height: 135,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: -100.86549626210247,
      y: 506.5996028916536,
    },
    intention: "positive",
  },
  {
    id: "node-3",
    type: "responsenode",
    position: {
      x: 383.72093031977954,
      y: 394.20369580239196,
    },
    data: {
      label: "",
      texts: [
        "Can you please specify the vehicle type, name and model so that I can assist you better.",
      ],
    },
    width: 147,
    height: 119,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 383.72093031977954,
      y: 394.20369580239196,
    },
    response: {
      label: "Positive",
      inputs: [""],
    },
    intention: "positive",
  },
  {
    id: "node-4",
    type: "responsenode",
    position: {
      x: 164.11497498237023,
      y: 772.7572543257503,
    },
    data: {
      label: "",
      texts: ["Alright, thanks for your time, bye bye."],
    },
    width: 147,
    height: 87,
    selected: false,
    positionAbsolute: {
      x: 164.11497498237023,
      y: 772.7572543257503,
    },
    dragging: false,
    response: {
      label: "No",
      inputs: ["I don't want", "I already have", "Not really"],
    },
    intention: "negative",
  },
  {
    id: "node-5",
    type: "responsenode",
    position: {
      x: 766.9658223369081,
      y: 377.62065469074423,
    },
    data: {
      label: "",
      texts: ["okay, May I know is it registered on your name?"],
    },
    width: 147,
    height: 103,
    selected: false,
    positionAbsolute: {
      x: 766.9658223369081,
      y: 377.62065469074423,
    },
    dragging: false,
    response: {
      label: "yes",
      inputs: ["car, vitz, 2018"],
    },
    intention: "positive",
  },
  {
    id: "node-6",
    type: "responsenode",
    position: {
      x: 59.860424895469635,
      y: 210.68603314703768,
    },
    data: {
      label: "",
      texts: ["You must be happy to listen this."],
    },
    width: 147,
    height: 87,
    selected: false,
    positionAbsolute: {
      x: 59.860424895469635,
      y: 210.68603314703768,
    },
    dragging: false,
    response: {
      label: "Neutral",
      inputs: [""],
    },
    intention: "neutral",
  },
  {
    id: "node-7",
    type: "responsenode",
    position: {
      x: -419.4066676538715,
      y: 879.747599188242,
    },
    data: {
      label: "",
      texts: ["i wont take much tim"],
    },
    width: 147,
    height: 87,
    selected: false,
    positionAbsolute: {
      x: -419.4066676538715,
      y: 879.747599188242,
    },
    dragging: false,
    response: {
      label: "if busy",
      inputs: [""],
    },
    intention: "negative",
  },
  {
    id: "node-8",
    type: "responsenode",
    position: {
      x: 114.92553201558985,
      y: 991.1387274975933,
    },
    data: {
      label: "",
      texts: [
        "Can you please specify the vehicle type, name and model so thatI can assist you better.",
      ],
    },
    width: 147,
    height: 119,
    response: {
      label: "Positive",
      inputs: [""],
    },
    intention: "positive",
  },
  {
    id: "node-9",
    type: "responsenode",
    position: {
      x: 742.5397587614317,
      y: 710.8423597064656,
    },
    data: {
      label: "",
      texts: ["I understand your concern, i'll not force you, take care, bye."],
    },
    width: 147,
    height: 103,
    selected: false,
    positionAbsolute: {
      x: 742.5397587614317,
      y: 710.8423597064656,
    },
    dragging: false,
    response: {
      label: "I don't wanna share",
      inputs: ["No", ""],
    },
    intention: "negative",
  },
  {
    id: "node-10",
    type: "responsenode",
    position: {
      x: 1168.3624392294962,
      y: 235.5276736026741,
    },
    data: {
      label: "",
      texts: [
        "I am transferring your call to senior supervisor for better assistance, please hold on.",
      ],
    },
    width: 147,
    height: 119,
    selected: false,
    positionAbsolute: {
      x: 1168.3624392294962,
      y: 235.5276736026741,
    },
    dragging: false,
    response: {
      label: "yes yes",
      inputs: ["ofcourse", "yeah"],
    },
    intention: "positive",
  },
  {
    id: "node-11",
    type: "responsenode",
    position: {
      x: 1168.9733855832806,
      y: 516.091532470308,
    },
    data: {
      label: "",
      texts: ["Alright, thanks for your time, bye bye."],
    },
    width: 147,
    height: 87,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 1168.9733855832806,
      y: 516.091532470308,
    },
    response: {
      label: "No",
      inputs: [""],
    },
    intention: "negative",
  },
];

import { useState, useEffect, useRef, createContext, useReducer, useContext } from 'react';
import SendIcon from '../assets/icons/SendIcon';
import CloseIcon from '../assets/icons/CloseIcon';
import { useAuth } from '../context/AuthContext';
import { getBot } from '../utils/fetchBot';

const ModalContext = createContext();

const initState = {
  name: '',
  botId: null,
  userId: '',
  step: 1,
  model: '',
  api: '',
  modals: { selected: '', modals: ['llama3', 'Bert', 'Distillbert'] },
  modalApi: 'http://5.9.96.58:4000/<NAME>/<USERID>',
  botApi: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.payload };
    case 'setBotId':
      console.log(action.payload);
      return { ...state, botId: action.payload };
    case 'setUserId':
      return { ...state, userId: action.payload };
    case 'nextStep':
      return { ...state, step: state.step + 1 };
    case 'prevStep':
      return { ...state, step: state.step - 1 || 1 };
    case 'setModal':
      return { ...state, modals: { ...state.modals, selected: action.payload } };
    default:
      return state;
  }
}

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { user } = useAuth();

  useEffect(() => {
    dispatch({ type: 'setUserId', payload: user.userId });
  }, [user]);

  useEffect(() => {
    async function getModal() {
      console.log(state.botId);
      const model = await getBot(state.botId);
      console.log(model);
      const bot = model.data.data;
      dispatch({ type: 'setName', payload: bot.name });
    }
    if (state.botId != null) getModal();
    console.log(state);
  }, [state.botId]);

  const values = { state, dispatch };

  return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>;
};

export default function TestBot({ closeChat, botId }) {
  return (
    <ModalProvider>
      <TestBotScreen closeChat={closeChat} botId={botId} />
    </ModalProvider>
  );
}

function TestBotScreen({ closeChat, botId }) {
  const { state, dispatch } = useContext(ModalContext);
  // const { user } = useAuth();
  useEffect(() => {
    dispatch({ type: 'setBotId', payload: botId });
  }, [botId]);
  const handleCloseChat = () => {
    closeChat();
    console.log('close');
  };

  return (
    <div className="absolute bottom-32 right-32 z-50 h-[70vh] w-96 rounded-2xl border border-slate-700 bg-theme_grey p-2 shadow-lg">
      <div className="border- flex h-full flex-col rounded-xl border border-slate-600 bg-white p-2">
        <div className="flex items-center justify-between">
          <span onClick={() => dispatch({ type: 'prevStep' })}>back</span>
          <span className="font-bold capitalize text-secondry">
            Test {state.name}: Modal: {state.modals.selected}
          </span>
          <span onClick={handleCloseChat}>
            <CloseIcon />
          </span>
        </div>
        <div className="scrollbar-none flex-1 overflow-auto">
          {state.step === 1 && <Step1 />}
          {state.step === 2 && <Step2 />}
          {state.step === 3 && <Step3 />}
        </div>
        {/* <div className="flex w-full items-center justify-center rounded-md border border-theme_grey p-1">INPUT</div> */}
      </div>
    </div>
  );
}

function Step1() {
  const { state, dispatch } = useContext(ModalContext);
  function handleModalSelect(name) {
    dispatch({ type: 'setModal', payload: name });
    // PATCH REQUET
    if (name !== 'llama3') {
      const updateModalRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}bots/${state.userId}/${state.botId}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ modal: name }),
        });
        if (!response.ok) throw new Error('response not ok');
        const responseObj = await response.json();
        dispatch({ type: 'nextStep' });
        console.log(responseObj);
      };
      updateModalRequest();
    } else dispatch({ type: 'nextStep' });
  }

  return (
    <div className="pt-5">
      <p className="text-center">Hi! Please choose a model to proceed further.</p>
      <div className="items center mt-5 flex flex-wrap justify-around">
        {state.modals.modals.map((modal, i) => (
          <button
            key={i}
            className="rounded-full bg-primary px-5 py-1 text-white transition-all hover:bg-secondry_act"
            onClick={() => handleModalSelect(modal)}
          >
            {modal}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2() {
  const { state, dispatch } = useContext(ModalContext);
  const [copySuccess, setCopySuccess] = useState('');
  const [apiBtnText, setApiBtnText] = useState('Get Api');

  const copyApiToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        state.modalApi.replace('<NAME>', state.name).replace('<USERID>', state.userId),
      ); //'http://5.9.96.58:4000/<NAME>/<USERID>'
      setApiBtnText('Copied!');
      setCopySuccess('API copied to clipboard!');

      setTimeout(() => {
        setApiBtnText('Get Api');
        setCopySuccess('');
      }, 3000);
    } catch (err) {
      setCopySuccess('Failed to copy text.');
    }
  };
  function startChat() {
    dispatch({ type: 'nextStep' });
  }

  return (
    <div className="pt-5">
      <p className="text-center">Modal has been trained</p>
      <div className="items center mt-5 flex flex-wrap justify-around">
        <button className="rounded-full bg-primary px-5 py-1 text-white transition-all hover:bg-secondry_act">
          {state.modals.selected}
        </button>
        <button
          onClick={startChat}
          className="rounded-full bg-primary px-5 py-1 text-white transition-all hover:bg-secondry_act"
        >
          Test Bot
        </button>
        <button
          onClick={copyApiToClipboard}
          className="rounded-full bg-primary px-5 py-1 text-white transition-all hover:bg-secondry_act"
        >
          {apiBtnText}
        </button>
      </div>
      {copySuccess.length > 1 && <p className="text-center">{copySuccess}</p>}
    </div>
  );
}

function Step3() {
  const { state } = useContext(ModalContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const eventSourceRef = useRef(null);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = { sender: 'user', text: message };
    setMessages((messages) => [...messages, newMessage]);
    setMessage('');

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    try {
      const response = await fetch(`http://5.9.96.58:4000/${state.name}/${state.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_text: message,
          session_id: Math.floor(Math.random() * 10000000) + 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported!');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let completeResponse = '';
      setMessages((messages) => [...messages, { sender: 'bot', text: '' }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        completeResponse += chunk;

        // Update the last message (bot's response) with the new chunk
        setMessages((messages) => {
          const updatedMessages = [...messages];
          console.log(updatedMessages);
          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            text: completeResponse,
          };
          return updatedMessages;
        });

        console.log('Received Chunk:', chunk);
      }
    } catch (error) {
      console.error('Error making API call', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [messages]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="mt-4 flex-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 max-w-xs rounded-lg p-2 ${
              msg.sender === 'user' ? 'self-end bg-gray-500 text-white' : 'self-start bg-secondry text-white'
            }`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex w-full items-center justify-center rounded-md border border-theme_grey p-1">
        <textarea
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here"
          className="scrollbar-none flex-1 resize-none bg-transparent outline-none"
        />
        <button onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

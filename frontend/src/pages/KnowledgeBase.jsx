import { createContext, useContext, useEffect, useReducer, useState } from 'react';
// import Cookies from 'js-cookie';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import ShareIcon from '../assets/icons/ShareIcon';
import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';
import TestBot from '../components/TestBot';
import { useAuth } from '../context/AuthContext';
import { deleteBot, getAllBots } from '../utils/fetchBot';
// create context

const BotContext = createContext();

const initState = {
  columns: ['File Name', 'File Source', 'Created Date'],
  testBot: { isActive: false, name: '', id: null },
  setPhone: false,
  userId: null,
  bots: [],
  selectedBot: null,
  // token: Cookies.get('bearer_token'),
};

function reducer(state, action) {
  switch (action.type) {
    case 'setPhone':
      return { ...state, setPhone: action.payload };
    case 'setSelectedBot':
      return { ...state, selectedBot: action.payload };
    // case 'setToken':
    //   return { ...state, token: action.payload };
    case 'setUser':
      return { ...state, userId: action.payload };
    case 'testBot':
      // console.log('test action payload:', action.payload);
      return {
        ...state,
        testBot: { isActive: true, name: action.payload.name, id: action.payload.id },
      };
    case 'closeChat':
      return { ...state, testBot: { isActive: false, name: '' } };
    case 'setBots':
      return { ...state, bots: action.payload };
    case 'deleteBot':
      return { ...state, bots: state.bots.filter((bot) => bot._id !== action.payload) };
    default:
      return state;
  }
}

// create Provider
const BotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    async function getBots() {
      const botsData = await getAllBots();
      console.log(botsData);
      dispatch({ type: 'setBots', payload: botsData.data.data });
    }
    getBots();
  }, []);

  const value = { state, dispatch };
  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

export default function KnowledgeBase() {
  return (
    <BotProvider>
      <KnowledgeBaseTable />
    </BotProvider>
  );
}

function KnowledgeBaseTable() {
  const { state, dispatch } = useContext(BotContext);

  // function handelTestBots(params) {
  //   dispatch({ type: 'testBot' });
  // }

  function handleCloseChat() {
    dispatch({ type: 'closeChat' });
    // dispatch({ type: 'setPhone', payload: false });
  }

  if (!state.bots) return <p>No Bots Found</p>;
  console.log(state.testBot.id);
  return (
    <section className="mx-auto mt-48 flex h-full w-5/6 flex-col">
      <div className="relative w-full overflow-x-auto">
        {/* {console.log(state.bots)} */}
        <table>
          <Header />
          <Body />
        </table>
        {/* <button onClick={handelTestBots}>Tester Bot</button> */}
      </div>
      {state.testBot.isActive && <TestBot closeChat={handleCloseChat} botId={state.testBot.id} />}
    </section>
  );
}

const Header = () => {
  const { state } = useContext(BotContext);

  return (
    <thead className="bg-gray-50 text-xs capitalize text-gray-700 dark:bg-gray-100">
      <tr className="border border-black">
        {state.columns.map((column, i) => (
          <th key={i}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

const Body = () => {
  const { state } = useContext(BotContext);
  return <tbody>{state.bots && state.bots.map((bot, i) => <BodyRow bot={bot} key={i} />)}</tbody>;
};

const BodyRow = ({ bot }) => {
  const { state, dispatch } = useContext(BotContext);
  const { name, createdAt, prompt, _id } = bot;
  const source = prompt.source === null ? 'Imported' : 'Generated';

  function handleBotClick(name, id) {
    dispatch({ type: 'testBot', payload: { name: name, id: id } });
    console.log(name, id);
  }

  async function handleDelete(id) {
    const data = await deleteBot(id);
    dispatch({ type: 'deleteBot', payload: id });
  }

  return (
    <tr>
      <td>
        <div className="flex items-center justify-between">
          <p onClick={() => handleBotClick(name, _id)}>{name}</p>
          <span className="flex space-x-2">
            <ShareIcon />
            <DeleteIcon onClick={() => handleDelete(_id)} />
          </span>
        </div>
      </td>
      <td>
        <Link to={`/create-flowchart?flow=${prompt.source}`}> {source}</Link>
      </td>
      <td>{formatDate(createdAt)}</td>
    </tr>
  );
};

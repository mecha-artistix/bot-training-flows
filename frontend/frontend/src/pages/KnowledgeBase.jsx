import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import ShareIcon from '../assets/icons/ShareIcon';
import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';

const columns = ['File Name', 'File Source', 'Created Date'];

const userID = localStorage.getItem('userID');

export default function KnowledgeBase() {
  // const [promptFiles, setPromptFiles] = useState([]);
  const [promptFiles, setPromptFiles] = useState([]);
  const [flowcharts, setFlowcharts] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // GET FLOW CHARTS
    async function getFlowCharts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${userID}`);
        const responseObj = await response.json();
        const data = await responseObj.data;
        // console.log(data);

        setFlowcharts(() => {
          const flows = data.flowcharts.map((flow) => ({ ...flow, source: 'Generated' }));
          return flows;
        });
      } catch (error) {
        console.log(error);
      }
    }
    getFlowCharts();
  }, []);

  useEffect(() => {
    async function getPromptFiles() {
      try {
        const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}promptfiles/${userID}`);
        const resObj = await response.json();
        const data = await resObj.data;
        console.log(data);
        setPromptFiles(() => {
          const prompts = data.promptFiles.map((prompt) => ({ ...prompt, source: 'Imported' }));
          return prompts;
        });
      } catch (error) {
        console.log(error);
      }
    }
    getPromptFiles();
  }, []);

  useEffect(() => {
    setUserData((prev) => {
      const data = [...promptFiles, ...flowcharts];
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return data;
    });
  }, [promptFiles, flowcharts]);

  function deletePromptFile(id) {
    setUserData((prev) => userData.filter((file) => file._id !== id));
  }

  return (
    <section className="mx-auto mt-48 flex h-full w-5/6 flex-col">
      <div className="relative w-full overflow-x-auto">
        <table>
          <Header />
          {flowcharts.length > 0 ? <Body data={userData} handleDelete={deletePromptFile} /> : <></>}
        </table>
      </div>
    </section>
  );
}

const Header = () => {
  return (
    <thead className="bg-gray-50 text-xs capitalize text-gray-700 dark:bg-gray-100">
      <tr className="border border-black">
        {columns.map((column, i) => (
          <th key={i}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

const Body = ({ data, handleDelete }) => {
  return (
    <tbody>
      {data.map((obj, i) => (
        <BodyRow data={obj} key={i} handleDelete={handleDelete} />
      ))}
    </tbody>
  );
};

const BodyRow = ({ data, handleDelete }) => {
  const { name, createdAt, promptText, source, _id } = data;

  function handleGoToFlowchart() {
    async function navToFlowchart(params) {
      const response = await fetch();
    }
  }
  // DELETE FLOW CHART
  async function handleDeleteCall(id) {
    try {
      handleDelete(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <tr>
      <td>
        <div className="flex items-center justify-between">
          <Link to={`/create-flowchart?flow=${name}`}>{name}</Link>
          <span className="flex space-x-2">
            <ShareIcon />

            <DeleteIcon onClick={() => handleDeleteCall(_id)} />
          </span>
        </div>
      </td>
      <td>
        <Link to={`/create-flowchart?flow=${name}`}> {source}</Link>
      </td>
      <td>{formatDate(createdAt)}</td>
    </tr>
  );
};

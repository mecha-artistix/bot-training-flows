import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { Link, useNavigate } from 'react-router-dom';
import ShareIcon from '../assets/icons/ShareIcon';
import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';
import SecondryNavigation from '../components/SecondryNavigation';

const columns = ['Name', 'Created Date', 'Generated Test File'];

function FlowCharts() {
  const [flowcharts, setFlowcharts] = useState([]);
  const userID = localStorage.getItem('userID');
  useEffect(() => {
    // GET FLOW CHARTS
    async function getFlowCharts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${userID}`);
        const responseObj = await response.json();
        const data = await responseObj.data;
        console.log(data);
        setFlowcharts(data.flowcharts);
      } catch (error) {
        console.log(error);
      }
    }
    getFlowCharts();
  }, []);

  function deleteFlowchart(id) {
    setFlowcharts((prev) => flowcharts.filter((chart) => chart._id !== id));
  }

  return (
    <>
      <div className="h-48">
        <SecondryNavigation />
      </div>
      <section className="mx-auto flex h-full w-5/6 flex-col">
        <div className="relative w-full overflow-x-auto">
          <table>
            <Header />
            {flowcharts.length > 0 ? <Body flowcharts={flowcharts} handleDelete={deleteFlowchart} /> : <></>}
          </table>
        </div>
      </section>
    </>
  );
}

export default FlowCharts;

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

const Body = ({ flowcharts, handleDelete }) => {
  return (
    <tbody>
      {flowcharts.map((flowchart, i) => (
        <BodyRow flowchart={flowchart} key={i} handleDelete={handleDelete} />
      ))}
    </tbody>
  );
};

const BodyRow = ({ flowchart, handleDelete }) => {
  const { name, createdAt } = flowchart;
  const navigate = useNavigate();
  function handleGoToFlowchart() {
    async function navToFlowchart(params) {
      const response = await fetch();
    }
  }
  // DELETE FLOW CHART
  async function handleDeleteCall(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${userID}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.message}`);

      // const data = await response.json();
      handleDelete(id);
      // console.log(data);
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
            <EditIcon onClick={() => navigate(`/create-flowchart?flow=${name}`)} />
            <DeleteIcon onClick={() => handleDeleteCall(flowchart._id)} />
          </span>
        </div>
      </td>
      <td>{formatDate(createdAt)}</td>
      <td>
        <Link to={`/create-flowchart?flow=${name}`}> Generate File</Link>
      </td>
    </tr>
  );
};

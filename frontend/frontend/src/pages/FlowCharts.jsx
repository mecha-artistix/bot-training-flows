import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import ShareIcon from '../assets/ShareIcon';
import EditIcon from '../assets/EditIcon';
import DeleteIcon from '../assets/DeleteIcon';

const columns = ['Name', 'Created Date', 'Generated Test File'];

const userID = localStorage.getItem('userID');

function FlowCharts() {
  const [flowcharts, setFlowcharts] = useState([]);

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
    <section className="flex flex-col h-full w-5/6 mx-auto">
      <div className="w-full relative overflow-x-auto ">
        <table>
          <Header />
          {flowcharts.length > 0 ? <Body flowcharts={flowcharts} handleDelete={deleteFlowchart} /> : <></>}
        </table>
      </div>
    </section>
  );
}

export default FlowCharts;

const Header = () => {
  return (
    <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-100">
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
        <div className="flex justify-between items-center">
          <Link to={`/create-flowchart?flow=${name}`}>{name}</Link>
          <span className="flex space-x-2">
            <ShareIcon />
            <EditIcon />
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

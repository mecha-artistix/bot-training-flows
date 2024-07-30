import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { Link, useNavigate } from 'react-router-dom';
import ShareIcon from '../assets/icons/ShareIcon';
import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';
import SecondryNavigation from '../components/SecondryNavigation';
import { fetchDeleteFlowchart, fetchFlowcharts } from '../utils/fetchFlowchart';
import Cookies from 'js-cookie';

const columns = ['Name', 'Created Date', 'Generated Test File'];
// const token = Cookies.get('bearer_token');
function FlowCharts() {
  const [flowcharts, setFlowcharts] = useState([]);
  const token = Cookies.get('bearer_token');
  useEffect(() => {
    // GET FLOW CHARTS
    async function getFlowCharts() {
      try {
        const data = await fetchFlowcharts(token);
        console.log(data);
        setFlowcharts(data);
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
            {flowcharts && flowcharts.length > 0 ? (
              <Body flowcharts={flowcharts} handleDelete={deleteFlowchart} />
            ) : (
              <></>
            )}
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
  const token = Cookies.get('bearer_token');

  const navigate = useNavigate();
  function handleGoToFlowchart() {
    async function navToFlowchart(params) {
      const response = await fetch();
    }
  }
  // DELETE FLOW CHART
  async function handleDeleteCall(id) {
    // const isDeleted = await fetchDeleteFlowchart(token, id);
    console.log(token);
    const deleted = await fetchDeleteFlowchart(id);
    if (deleted.isDeleted) return handleDelete(id);
  }

  return (
    <tr>
      <td>
        <div className="flex items-center justify-between">
          <Link to={`/create-flowchart?flow=${flowchart._id}`}>{name}</Link>
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

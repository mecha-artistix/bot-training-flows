import CreateNewFlow from './CreateNewFlow';
import ImportTextFile from './ImportTextFile';
function SecondryNavigation() {
  return (
    <div className="flex items-center justify-between px-2 py-2 shadow-md p-4">
      <div className="relative p-0">
        <CreateNewFlow />
      </div>
      {/* <Link to="/create-flowchart">Create New Flow +</Link> */}
      <ImportTextFile />
    </div>
  );
}

export default SecondryNavigation;

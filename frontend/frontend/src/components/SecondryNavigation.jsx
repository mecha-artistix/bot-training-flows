import CreateNewFlow from './CreateNewFlow';
function SecondryNavigation() {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <div className="relative p-0">
        <CreateNewFlow />
      </div>
      {/* <Link to="/create-flowchart">Create New Flow +</Link> */}
      <button className="cwu_accent_btn">Import File</button>
    </div>
  );
}

export default SecondryNavigation;

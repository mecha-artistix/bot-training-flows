import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer); // useSelector takes the whole store as arg and in callback we return the data that we want
  // console.log(customer);
  return <h2> welcome {customer.fullName}</h2>;
}
export default Customer;

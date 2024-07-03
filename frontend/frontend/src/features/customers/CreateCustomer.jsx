import { useDispatch } from "react-redux";
import { createCustomer, updateName } from "./CustomerSlice.js";

function CreateCustomer() {
  const dispatch = useDispatch();

  //   function handleChange() {
  //     dispatch(createCustomer("Huzaifa", "pk092"));
  //   }
  function multiplier() {}
  //   dispatch(createCustomer("Huzaifa", "pk092"));
  //   dispatch(updateName("huzaifa khan"));

  //   useEffect(() => {
  //     function handleChange() {
  //       dispatch(createCustomer("Huzaifa", "pk092"));
  //     }
  //     handleChange();
  //   }, [dispatch]);

  return <div></div>;
}

export default CreateCustomer;

import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ItemForm from "../components/ItemForm";
import ItemsItem from "../components/ItemsItem";
import Spinner from "../components/Spinner";
import {getItems, reset} from "../features/items/itemSlice";

function Dashboard() {
  console.log("dashboard is ran");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {items, isLoading, isError, message} = useSelector((state) => state.items)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    // Check if user is logged in, else redirect to login
    if(!user) {
      navigate("/login")
    }

    // Gets only the users items
    dispatch(getItems("/items/"));

    // This runs at the end of useEffect
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1 className="centerText">Welcome {user && user.name}</h1>
    </section>

    <ItemForm />

    <section className="content">
      {items.length > 0 ? (
        <div className="items">
          {items.map((item) => (
            <ItemsItem key={item._id} item={item}/>
          ))}
        </div>
      ) : (<h3>You have no items</h3>)}
    </section>
    </>
}

export default Dashboard
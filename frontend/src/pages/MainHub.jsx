import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ItemsMain from "../components/ItemsMain";
import Spinner from "../components/Spinner";
import {getItems, reset as resetItems} from "../features/items/itemSlice";
import {getTrade, reset as resetTrade} from "../features/trade/tradeSlice";
import TagsButton from "../components/TagsButton";

function MainHub() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting user and items from redux
  const {user} = useSelector((state) => state.auth);
  const {items, isLoading, isError, message} = useSelector((state) => state.items);
  const [tags, setTags] = useState([]);

  const itemsToShow = tags.length > 0 ? items.filter((item) => tags.some((selectedTag) => item.tags.includes(selectedTag))) : items;

  const tagsToggle = (tag) => () => {
    if(tags.includes(tag)) setTags(tags.filter((t) => t !== tag))
    else setTags([...tags, tag])
  }

  console.log(tags)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    // Check if user is logged in, else redirect to login
    if(!user) {
      navigate("/login")
    }

    // Gets all items and runs through the builder
    dispatch(getItems("/main/"));
    dispatch(getTrade());

    // This runs at the end of useEffect
    return () => {
      dispatch(resetItems())
      dispatch(resetTrade());
    }
  }, [user, navigate, isError, message, dispatch])


  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1 className="centerText">THE MAIN HUB</h1>
    </section>
    <section className="searchables">
      <TagsButton sentFunc={tagsToggle("clothes")}
      sentValue={"clothes"} />
      <TagsButton sentFunc={tagsToggle("animals")}
      sentValue={"animals"} />
      <TagsButton sentFunc={tagsToggle("cars")}
      sentValue={"cars"} />
    </section>
    <section className="content">
      {itemsToShow.length > 0 ? (
        <div className="items">
          {itemsToShow.map((item) => <ItemsMain key={item._id} item={item}/>)}
        </div>
      ) : (<h3>There are no items</h3>)}
    </section>
    </>
}

export default MainHub
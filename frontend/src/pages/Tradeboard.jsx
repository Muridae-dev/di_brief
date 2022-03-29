import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ItemsMain from "../components/ItemsMain";
import Spinner from "../components/Spinner";
import {getItems, reset as resetItems} from "../features/items/itemSlice";
import {getTrade, reset as resetTrade} from "../features/trade/tradeSlice";

function Tradeboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth);
    const {items, isLoading, isError, message} = useSelector((state) => state.items);
    const {trades} = useSelector((state) => state.trades);

    const itemsToBuy = items.filter((item) => trades.some((trade) => (trade.buyer.includes(user._id) && item._id.includes(trade.itemId))));
    const itemsToSell = items.filter((item) => trades.some((trade) => (trade.seller.includes(user._id) && item._id.includes(trade.itemId))));

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
          dispatch(resetTrade())
        }
      }, [user, navigate, isError, message, dispatch])

    return <>
            <section>
                <h1>ITEMS TO BUY</h1>
                {itemsToBuy.map((item) => <div>{item.text}</div>)}
            </section>
            <section>
                <h1>ITEMS TO SELL</h1>
                {itemsToSell.map((item) => <div>{item.text}</div>)}
            </section>
        </>
  
}

export default Tradeboard
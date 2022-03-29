import {useStore, useDispatch, useSelector} from "react-redux";
import {createTrade} from "../features/trade/tradeSlice";

function ItemsMain({item}) {
    const store = useStore();
    const dispatch = useDispatch();
    const itemId = item._id;
    const seller = item.user;
    const buyer = store.getState().auth.user._id;

    const {trades} = useSelector((state) => state.trades)
    const isBuying = trades.some((trade) => (trade.buyer.includes(buyer) && itemId.includes(trade.itemId)))


  return (
    <>
    <div className="item">
        <img src={item.picture} alt={item.text + "picture"} className="item-img"/>
        <div>
            {/*new Date(item.createdAt).toLocaleString("en-US")*/}
        </div>
        <h2 style={{color: item.color}}>{item.text}</h2>
        <h4>{"Seller: " + item.username}</h4>
        <h5>Tags: {item.tags.map(element => element + " ")}</h5>
        {buyer !== seller ? (!isBuying ? (<button className="btn" onClick={() => dispatch(createTrade({itemId, seller, buyer}))}>REQUEST TRADE</button>) : "REQUEST SENT") : (null)}
        
    </div>
    </>
  )
}

export default ItemsMain
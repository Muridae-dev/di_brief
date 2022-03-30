import {useSelector, useDispatch} from "react-redux";
import {deleteTrade} from "../features/trade/tradeSlice";
import {updateItem} from "../features/items/itemSlice";

function ItemsTrade({item}) {
  const dispatch = useDispatch();

  const {trades} = useSelector((state) => state.trades)
  const {user} = useSelector((state) => state.auth)
  const currentTrade = trades.filter((trade) => (trade.seller.includes(user._id) && item._id.includes(trade.itemId)))

  console.log(item)
  const fulfillTrade = () => {
    dispatch(deleteTrade(currentTrade[0]._id));

    let updatedItem = {
      ...item
    };
    
    updatedItem.user = currentTrade[0].buyer;
    updatedItem.username = currentTrade[0].buyername;

    console.log(updatedItem, item)
    dispatch(updateItem(updatedItem))
  }

  return (
    <>
    <div className="item">
        <img src={item.picture} alt={item.text + "picture"} className="item-img"/>
        <div>
            {/*new Date(item.createdAt).toLocaleString("en-US")*/}
        </div>
        <h2 style={{color: item.color}}>{item.text}</h2>
        <h4>{"Buyer: " + currentTrade[0].buyername}</h4>
        {currentTrade ? (<button className="btn" onClick={fulfillTrade}>DO YOU WANT TO SELL????</button>) : null}
        
    </div>
    </>
  )
}

export default ItemsTrade
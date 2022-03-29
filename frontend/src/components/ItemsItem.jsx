import {useDispatch} from "react-redux";
import {deleteItem} from "../features/items/itemSlice";

function ItemsItem({item}) {
    const dispatch = useDispatch();

    // This is a little shady
    const currentUrl = window.location.href.split("/")[3];
    
    // This is how you import styles to specific objects
    const colorStyle = {
      color: item.color
    }
  return (
    <div className="item">
        <img src={item.picture} alt={item.text + "picture"} className="item-img"/>
        <div>
            {/*new Date(item.createdAt).toLocaleString("en-US")*/}
        </div>
        <h2 style={colorStyle}>{item.text}</h2>
        {currentUrl === "inventory" ? (<button onClick={() => dispatch(deleteItem(item._id))} className="close">X</button>) : (<h4>{"Seller: " + item.username}</h4>)}
    </div>
  )
}

export default ItemsItem
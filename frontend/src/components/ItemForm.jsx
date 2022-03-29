import {useState} from "react";
import {useDispatch} from "react-redux";
import {createItem} from "../features/items/itemSlice";
import TagsButton from "./TagsButton";

function ItemForm() {
    const [text, setText] = useState("");
    const [color, setColor] = useState("");
    const [picture, setPicture] = useState();
    const [tags, setTags] = useState([]);

    console.log(tags)

    const tagsToggle = (tag) => () => {
        if(tags.includes(tag)) setTags(tags.filter((t) => t !== tag))
        else setTags([...tags, tag])
      }
    

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault()

        console.log(picture);
        //setPicture(JSON.stringify(picture));
        
        dispatch(createItem({text, picture, color, tags}))
        setText("");
    }

    return <section className="form">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <p>
                        <label htmlFor="text">Item</label>
                        <input type="text" name="text" id="text" value={text} onChange={(e) => {setText(e.target.value); console.log(e.target.value)}}/>
                    </p>

                    <p>
                        <label htmlFor="picture">Picture upload</label>
                        <input type="file" name="picture" id="picture" onChange={(e) => setPicture(e.target.files[0])} />
                    </p>
                    <p>
                        <label htmlFor="color">Color</label>
                        <input type="text" name="color" id="color" value={color} onChange={(e) => setColor(e.target.value)}/>
                    </p>
                    <p>
                        <TagsButton sentFunc={tagsToggle("clothes")}
                        sentValue={"clothes"} />
                        <TagsButton sentFunc={tagsToggle("animals")}
                        sentValue={"animals"} />
                        <TagsButton sentFunc={tagsToggle("cars")}
                        sentValue={"cars"} />
                    </p>
                    <button className="btn" type="submit">Create item</button>
                </div>
            </form>
        </section>
}

export default ItemForm
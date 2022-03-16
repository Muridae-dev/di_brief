import {useState, useEffect} from "react";
import {FaSignInAlt} from "react-icons/fa"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {  email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            //what does ... do??
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }



    return <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Login to your account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={email} 
                    placeholder="Enter your email" 
                    onChange={onChange}
                />
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    value={password} 
                    placeholder="Enter your password" 
                    onChange={onChange}
                />
                <button type="submit">Login</button>
            </form>
        </section>
    
    </>
}

export default Login
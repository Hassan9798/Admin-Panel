import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { userRequest } from "../../makeRequest";
import {toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from 'react-router-dom';

const New = ({ inputs, title }) => {
 const location=useLocation();
 const pathname=location.pathname.split('/')[1];
 
  const [file, setFile] = useState("");
  const [state,setState]=useState({
    username:'',
    email:'',
    password:'',
  });
  const [productstate, setProductState] = useState({
    title: '',
    img: '',
    inStock:'',
    size: [],
    color: [],
    categories: [],
    price: '',
    desc: '',

  });
  const handleChange=(e)=>{
    setState((state)=>({
      ...state,
      [e.target.name]:e.target.value
    }))
  }
  const handleChangeProduct=(e)=>{
    if(e.target.name==='color' ){
      const data=e.target.value.split(',');
      setProductState((state)=>({
        ...state,
        color:data
      }))
    }
    else if(e.target.name==='categories' ){
      const data=e.target.value.split(',');
      setProductState((state)=>({
        ...state,
        categories:data
      }))
    }
    else if(e.target.name==='size' ){
      const data=e.target.value.split(',');
      setProductState((state)=>({
        ...state,
        size:data
      }))
    }
    else{
      setProductState((state)=>({
        ...state,
        [e.target.name]:e.target.value
      }))
    }
  }
  console.log(productstate);
  const createUser=async(e)=>{
    e.preventDefault();
    try{
      const res=await userRequest.post('/auth/register',state);
      res.status === 201 &&  toast.success('user created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        setState({
          username:'',
          email:'',
          password:'',
        });
        
    }
    catch{
    }
  }
  const createProduct=async(e)=>{
    e.preventDefault();
    try{
      const formData=new FormData();
      formData.append('title',productstate.title)
      formData.append('img',file)
      formData.append('desc',productstate.desc)
      productstate.color.map((c)=>(
        formData.append('color',c)
        ))
        productstate.size.map((s)=>(

          formData.append('size',s)
          ))
      formData.append('price',productstate.price)
      formData.append('inStock',productstate.inStock)
      productstate.categories.map((cat)=>(
        formData.append('categories',cat)
        ))
      const res=await userRequest.post('/products/createproduct',formData);
      setProductState((state)=>({
        ...state,
        title: '',
        img: '',
        inStock:'',
        size: [],
        color: [],
        categories: [],
        price: '',
        desc: '',
      }))
      setFile('');
      res.status === 200 &&  toast.success('Product created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
      setTimeout(()=>{
        window.location.reload();
      },2000)
        
    }
    catch{
    }
  }
  const c=productstate.color;
 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}  name={input.name} onChange={pathname === 'products' ? handleChangeProduct: handleChange} required/>
                </div>
              ))}
              <button onClick={pathname === 'products' ? createProduct : createUser}>Send</button>
              <ToastContainer autoClose={2000}  />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

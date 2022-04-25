import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../makeRequest";
import { Avatar, Button, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AddBox } from '@mui/icons-material';


const Single = () => {
  const style = {
    position: 'absolute',
    display: 'flex',
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '70vh',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const { id } = useParams();
  const { productId } = useParams();
  const [user, SetUser] = useState({});
  const [product, SetProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenProduct = () => setOpenProduct(true);
  const handleCloseProduct = () => setOpenProduct(false);
  let [inputValue, setInputValue] = useState({
    color: '',
    size: '',
    categories: ''
  });
  const [selectedcolor, setSelectedColor] = useState([]);
  const [selectedsize, setSelectedSize] = useState([]);
  const [selectedcategories, setSelectedCategories] = useState([]);
  const [userstate, setUserState] = useState({
    username: user.username,
    email: user.email,
    password: user.password
  });

  const [productstate, setProductState] = useState({
    title: product.title,
    img: product.img,
    inStock: product.inStock,
    size: product.size,
    color: product.color,
    categories: product.categories,
    price: product.price,
    desc: product.desc,

  });
  const addItem = (e) => {
    e.preventDefault();
    if (inputValue.color) {
      setSelectedColor(selectedcolor, selectedcolor.push(inputValue.color));
      setInputValue((prev) => ({
        ...prev,
        color: ''
      }));
      setProductState((prev) => ({
        ...prev,
        color: selectedcolor
      }))
    }
    if (inputValue.size) {
      setSelectedSize(selectedsize, selectedsize.push(inputValue.size));
      setInputValue((prev) => ({
        ...prev,
        size: ''
      }));
      setProductState((prev) => ({
        ...prev,
        size: selectedsize
      }))
    }
    if (inputValue.categories) {
      setSelectedCategories(selectedcategories, selectedcategories.push(inputValue.categories));
      setInputValue((prev) => ({
        ...prev,
        categories: ''
      }));
      setProductState((prev) => ({
        ...prev,
        categories: selectedcategories
      }))
    }
  }
  const handleChange = (e) => {
    setUserState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleProductChange = (e) => {
    setProductState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };
  const handlefiles = (e) => {
    // console.log(e.target.files[0]);
    setProductState((prev => ({
      ...prev,
      img: e.target.files[0]
    })))
  }
  const updateUser = async (e) => {
    e.preventDefault();
    try {

      const res = await userRequest.put(`/user/${id}`, userstate);
      console.log(res.data);
      setOpen(false);

    }
    catch { }
  }
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', productstate.title)
      formData.append('img', productstate.img)
      formData.append('size', productstate.size)
      formData.append('color', productstate.color)
      formData.append('categories', productstate.categories)
      formData.append('desc', productstate.desc)
      formData.append('price', productstate.price)
      formData.append('inStock', productstate.inStock)
      const res = await userRequest.put(`/products/${productId}`, formData);
      console.log(productstate,res.data);
      setOpenProduct(false);
      setSelectedColor([]);
      setSelectedSize([]);
      setSelectedCategories([]);
    }
    catch { }
  }
  useEffect(() => {

    const getUser = async () => {
      if (id) {

        const res = await userRequest.get(`/user/finduser/${id}`);
        SetUser(res.data);
      }
    }
    const getProduct = async () => {
      if (productId) {

        const res = await userRequest.get(`/products/findproduct/${productId}`);
        SetProduct(res.data);
      }
    }
    getProduct();
    getUser();
  }, [id, userstate, open, productId, productstate, openProduct])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={id ? handleOpen : handleOpenProduct}>Edit</div>
            {/* edit user modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <span style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', margin: '20px' }}>Edit User</span>
                <TextField id="outlined-basic" label="Username" variant="outlined" style={{ margin: '5px' }} name='username' onChange={handleChange} />
                <TextField id="outlined-basic" label="Password" variant="outlined" style={{ margin: '5px' }} name='password' onChange={handleChange} />
                <TextField id="outlined-basic" label="Email" variant="outlined" style={{ margin: '5px' }} name='email' onChange={handleChange} />
                <Button variant="contained" color="inherit" style={{ marginTop: '15px', padding: '10px', height: '50px', width: '50%', marginLeft: '25%' }} onClick={updateUser}>UPDATE</Button>
              </Box>
            </Modal>
            {/* end */}
            {/* edit Product modal */}
            <Modal
              open={openProduct}
              onClose={handleCloseProduct}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <span style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', margin: '20px' }}>Edit Product</span>
                <TextField id="outlined-basic" label="Title" variant="outlined" style={{ margin: '5px', width: '100%' }} name='title' onChange={handleProductChange} />
                <TextField
                  style={{ margin: '5px', width: '100%' }}
                  name="img"
                  type="file"
                  onChange={handlefiles}
                />
                <div style={{ width: '100%' }}>
                  <TextField id="outlined-basic" label="Size" variant="outlined" style={{ margin: '5px', width: '100%', position: 'relative' }} name='size' value={inputValue.size} onChange={(e) => setInputValue((prev) => ({ ...prev, size: e.target.value }))} />
                  <AddBox style={{ position: 'absolute', top: '49%', right: '8%', cursor: 'pointer' }} onClick={addItem} />
                </div>
                <div style={{ width: '100%' }}>
                  <TextField id="outlined-basic" label="Color" variant="outlined" style={{ margin: '5px', width: '100%', position: 'relative' }} name='color' value={inputValue.color} onChange={(e) => setInputValue((prev) => ({ ...prev, color: e.target.value }))} />
                  <AddBox onClick={addItem} style={{ position: 'absolute', top: '62%', right: '8%', cursor: 'pointer' }} />
                </div>
                <TextField id="outlined-basic" label="Description" variant="outlined" style={{ margin: '5px', width: '100%' }} name='desc' onChange={handleProductChange} />
                <TextField id="outlined-basic" label="Stock" variant="outlined" style={{ margin: '5px', width: '100%' }} name='inStock' onChange={handleProductChange} />
                <div style={{ width: '100%' }}>
                  <TextField id="outlined-basic" label="Categories" variant="outlined" style={{ margin: '5px', width: '100%', position: 'relative' }} name='categories' value={inputValue.categories} onChange={(e) => setInputValue((prev) => ({ ...prev, categories: e.target.value }))} />
                  <AddBox onClick={addItem} style={{ position: 'absolute', top: '100%', right: '8%', cursor: 'pointer' }} />
                </div>
                <TextField id="outlined-basic" label="Price" variant="outlined" style={{ margin: '5px', width: '100%' }} name='price' onChange={handleProductChange} />
                <Button variant="contained" color="inherit" style={{ marginTop: '15px', padding: '10px', height: '50px', width: '50%', marginLeft: '25%' }} onClick={updateProduct}>UPDATE</Button>
              </Box>
            </Modal>
            {/* end */}
            <h1 className="title">Information</h1>
            <div className="item">
              {id ?
                <Avatar src={"/broken-image.jpg"} />
                :
                product.img
                  ?
                  <Avatar src={"http://localhost:4000/" + product.img} sx={{ width: 70, height: 70 }} />
                  :
                  <Avatar src={"/broken-image.jpg"} />
              }

              <div className="details">
                <h1 className="itemTitle">{id ? user.username : product.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">{id ? 'Email:' : 'Color'}</span>
                  {id ?
                    <span className="itemValue">{user.email}</span>
                    :
                    product.color?.map((c) => (
                      // <span className="itemValue" style={{gap:'5px'}}>{c}</span>
                      <div style={{ display: 'flex' }}>
                        <div style={{ height: '15px', width: '15px', borderRadius: '50%', backgroundColor: c }} ></div>
                      </div>

                    ))
                  }
                </div>
                <div className="detailItem">
                  <span className="itemKey">{id ? 'Phone:' : 'Stock'}</span>
                  <span className="itemValue" >{id ? '+1 2345 67 89' : product.inStock && 'Yes'}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">{id ? 'Address:' : 'Price'}</span>
                  <span className="itemValue">
                    {id ? 'Elton St. 234 Garden Yd. Pakistan' : product.price}
                  </span>
                </div>
                {id &&
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">Pakistan</span>
                  </div>

                }

              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;

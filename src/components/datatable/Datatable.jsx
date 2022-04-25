import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, userColumns, userRows } from "../../datatablesource";
import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {userRequest} from '../../makeRequest';
const Datatable = () => {
  const [data, setData] = useState(userRows);
  const[users,setUsers]=useState([]);
  const[products,setProducts]=useState([]);
  const location=useLocation();
  const pathname=location.pathname.split('/')[1]
  useEffect(()=>{
    const getProducts=async()=>{
      const res=await userRequest.get('/products/getallproducts');
      setProducts(res.data);
    }
    const getUsers=async()=>{
      const res=await userRequest.get('/user');
      setUsers(res.data);
    }
    getUsers();
    getProducts();
  },[]);
  const handleDelete = async(id) => {
    try{
      if(pathname==='user'){

        const res=await userRequest.delete(`/user/${id}`);
        console.log(res.data);
        setUsers(users.filter((item) => item._id !== id));

      }
      else{
        const res=await userRequest.delete(`/products/${id}`);
        console.log(res.data);
        setProducts(products.filter((item) => item._id !== id));

      }
    }
    catch{

    }
  };
console.log(users);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={pathname === 'users'? `/users/${params.row._id}`: `/products/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    }
  ];
  console.log(products);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add new {pathname}
        <Link to={`/${pathname}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        style={{overflowX:'hidden'}}
        className="datagrid"
        rows={pathname === 'users' ? users : products}
        columns={pathname === 'users' ? userColumns.concat(actionColumn):productColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row)=>row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

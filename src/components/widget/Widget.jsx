import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import {userRequest} from '../../makeRequest';
const Widget = ({ type }) => {
  let data;
  const[users,setUsers]=useState([]);
  const[orders,setOrders]=useState([]);

  //temporary
  const amount = 100;
  const diff = 20;
  const getUserStats=async()=>{
    try{
      const res=await userRequest.get('/user/stats');
      setUsers(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  const getOrderStats=async()=>{
    try{
      const res=await userRequest.get('/order/stats');
      setOrders(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
   
    getOrderStats();
    getUserStats();
  },[type])
  
  

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        total:users.length > 1 && users[1].total,
        percentage:users.length > 1 && (users[1].total * 100) / users[0].total-100,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        total:orders.length > 1 && orders[1].total,
        percentage:orders.length > 1 && (orders[1].total * 100) / orders[0].total-100,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        total:100,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        total:100,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.total}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {data.percentage > 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon fontSize="small" color="red" /> }
          {data.percentage ? Math.floor(data.percentage) : diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

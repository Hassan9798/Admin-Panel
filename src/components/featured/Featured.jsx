import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {userRequest} from '../../makeRequest';
import { useEffect, useState } from "react";

const Featured = () => {
  const [revenue,setRevenue]=useState([]);
  const [percentage,setPercentage]=useState('');

  useEffect(()=>{
    const getRevenue=async()=>{
      try{
        const res=await userRequest.get('/order/stats');
        setRevenue(res.data);
        setPercentage((res.data[1].total * 100)/res.data[0].total - 100);
      }
      catch{}
    }
    getRevenue();
  },[])

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={Math.floor(percentage)+'%'} strokeWidth={5} />
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">{revenue.length > 0 && revenue[1].total +'PKR'}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{revenue.length> 0 && revenue[0].total + "PKR"}</div>
            </div>
          </div>
          {/* <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;

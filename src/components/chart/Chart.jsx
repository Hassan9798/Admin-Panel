import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState,useMemo } from "react";
import {userRequest} from '../../makeRequest';


const Chart = ({ aspect, title }) => {
  const [orderStats,setOrderStats]=useState([]);
  const Months = useMemo(()=>[
     "January",
     "February",
     "March", 
     "April", 
     "May",
     "June", 
     "July", 
     "Aug", 
     "Sep", 
     "Oct", 
     "Nov", 
     "Dec", 
  ],
  []
  );
  useEffect(()=>{
    const getOrderStats=async()=>{
      try{
        const res=await userRequest.get('/order/stats');
        res.data.map((item)=>{
          setOrderStats((prev)=>[
            ...prev,
            {name:Months[item._id - 1],"Revnue": item.total}
          ])
        })
      }
      catch(err){

      }
    }
    getOrderStats();
  },[Months]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={orderStats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Revnue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Revnue"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import './slots.css'
const AvailableSlots = () => {
  console.log("Inside the Available slots");

  let startTime = 8;
  let endTime = 20;
  let dataArray = ['8AM', '10AM', '3PM'];
  const [data, setData] = useState([])
  // localStorage.setItem("currentDoctor", "notUday");
  const dataToSend = {
    id: localStorage.getItem("unity-doctor-id-click"),
    type: "doctor"
  };

  const handleClickEvent = (e) => {
    let dataToSend = {
        patient: localStorage.getItem('unity-patient-id'),
        doctor: localStorage.getItem('unity-doctor-id-click'),
        date: new Date().toString(),
        issue: '',
        timeOfArrival: ''
    }
    if(e.classList[0] === 'clickable'){
        let issue = window.prompt("Specify your issue if you want");
        if(issue) {}
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      await axios.post("http://127.0.0.1:5000/appointment/list", dataToSend)
        .then((response) => {
          console.log(response.data.appointments)
          setData(response.data.appointments);
        })
        .catch((errr) => {
          console.log("Err", errr);
        })
    };
    fetchData();

  }, []);

  console.log(data)

  dataArray = data.map((appointment) => {

    let time = appointment.slot.split(' ')[1]
    return time
  })

  console.log(dataArray)


  const timeIntervals = [];
  // Generate time intervals
  while (startTime !== endTime) {
    let x = (startTime<12) ? "am" : "pm";
    if(startTime === 12){
        timeIntervals.push(`${12+x} - ${1+x}`);    
    }else {
        if(startTime+1 === 12){
            timeIntervals.push(`${(startTime)%12+x} - ${1+x}`);
        }else {

            timeIntervals.push(`${(startTime)%12+x} - ${(startTime+1)%12+x}`);
        }
    }
    startTime++;
  }

  return (
    <div>
      {console.log("inside the available")}
      {timeIntervals.map((interval, index) => (
        
        <div
          key={index}
          className={dataArray.includes(timeIntervals[index].split(' ')[0]) ? "dull" : "clickable"}
            onClick={handleClickEvent}
        >
          {interval}
        </div>
      ))}
    </div>
  );
};

export default AvailableSlots;

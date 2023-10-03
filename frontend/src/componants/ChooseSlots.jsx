import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './slots.css'

function ChooseSlots() {
  let endTime = 20;
  let startTime = 8;
    const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    console.log(e);
    setDate(e);
  };

  const handleClickEvent = async (e) => {
    let target = e.target.innerText;
    console.log("targeeeeeeeeeeeeeee",target.split(' ')[0]);

    if(target.split(' ')[0].includes(dataArray)){
        alert("Selected time slot is not available choose another");
    } else {
        let response = window.prompt("Please give any specific issue if you want and book appointment")
            let dataToSend = {
              patient: localStorage.getItem("unity-patient-id"),
              doctor: localStorage.getItem("unity-doctor-id-click"),
              slot: `${ dayjs(date).format("DD-MM-YYYY") + " " + target.split(' ')[0]}`,
              issue: `${response || "Not Provided"}`,
            };

            console.log(dataToSend)
            
            await axios.post('http://127.0.0.1:5000/appointment/create', dataToSend)
                .then(() => {
                    alert("Your appointment is booked successfully")
                    navigate('/')
                })
                .catch((err) => {
                    alert("Time slot is not available");
                })

        
    }
  };

  const dataToSend = {
    id: localStorage.getItem("unity-doctor-id-click"),
    type: "doctor",
    date: dayjs(date).format("DD-MM-YYYY"),
  };

  useEffect(() => {
    // console.log("Runnig");
    // console.log(dataToSend);
    // setData([{ "_id": "650ed4e964690ecaca319852", "patient": "650ecd51cfef35880cc3c251", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "23-04-2000 8pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:07:05.515Z", "updatedAt": "2023-09-23T12:07:05.515Z", "__v": 0 }, { "_id": "650ed5ac64690ecaca319854", "patient": "650ecd8fcfef35880cc3c253", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "11-09-2023 11am", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:10:20.355Z", "updatedAt": "2023-09-23T12:10:20.355Z", "__v": 0 }, { "_id": "650ed5cf64690ecaca319856", "patient": "650ecdb7cfef35880cc3c255", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "12-09-2023 1pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:10:55.179Z", "updatedAt": "2023-09-23T12:10:55.179Z", "__v": 0 }, { "_id": "650ed5e364690ecaca319858", "patient": "650ecdc1cfef35880cc3c257", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "13-09-2023 5pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:11:15.217Z", "updatedAt": "2023-09-23T12:11:15.217Z", "__v": 0 }, { "_id": "650ed5fd64690ecaca31985a", "patient": "650ecdcfcfef35880cc3c259", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "13-09-2023 1pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:11:41.111Z", "updatedAt": "2023-09-23T12:11:41.111Z", "__v": 0 }, { "_id": "650fbcae93d75847988aeb28", "patient": "650ecd51cfef35880cc3c251", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "24-09-2023 1pm", "issue": "Magaj mari", "prescription": "", "tokenNo": "", "createdAt": "2023-09-24T04:35:58.687Z", "updatedAt": "2023-09-24T04:35:58.687Z", "__v": 0 }, { "_id": "650fc3b53044fe3d9e5d9825", "patient": "650ecd51cfef35880cc3c251", "doctor": "650f5988eafe401cd10968c1", "slot": "24-09-2023 1pm", "issue": "Magaj mari", "prescription": "", "tokenNo": "", "createdAt": "2023-09-24T05:05:57.455Z", "updatedAt": "2023-09-24T05:05:57.455Z", "__v": 0 }, { "_id": "650fc6833044fe3d9e5d9842", "patient": "650ecdcfcfef35880cc3c259", "doctor": "650f5988eafe401cd10968c1", "slot": "16-09-2023 6pm", "issue": "Magaj mari", "prescription": "", "tokenNo": "", "createdAt": "2023-09-24T05:17:55.983Z", "updatedAt": "2023-09-24T05:17:55.983Z", "__v": 0 }, { "_id": "650fca3f3044fe3d9e5d9863", "patient": "650f44cf4c53a4f68907a7b4", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "23-04-2000 8pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-24T05:33:51.786Z", "updatedAt": "2023-09-24T05:33:51.786Z", "__v": 0 }, { "_id": "650fd1293044fe3d9e5d9878", "patient": "650f44cf4c53a4f68907a7b4", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "24-09-2023 4pm", "issue": "chhod bhai", "prescription": "", "tokenNo": "", "createdAt": "2023-09-24T06:03:21.621Z", "updatedAt": "2023-09-24T06:03:21.621Z", "__v": 0 }, { "_id": "650fd1e43044fe3d9e5d9889", "patient": "650f44cf4c53a4f68907a7b4", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "13-09-2023 3pm", "issue": "chhod bhai", "prescription": "", "tokenNo": "", "createdAt": "2023-09-24T06:06:28.405Z", "updatedAt": "2023-09-24T06:06:28.405Z", "__v": 0 }])
    const fetchData = async () => {
      await axios
        .post("http://127.0.0.1:5000/appointment/list", dataToSend)
        .then((response) => {
          console.log(response.data.appointments);
          setData(response.data.appointments);
        })
        .catch((errr) => {
          console.log("Err", errr);
        });
    };
    fetchData();
  }, [date]);

  let dataArray = data.map((appointment) => {
    let time = appointment.slot.split(" ")[1];
    return time;
  });

  console.log(dataArray);

  const timeIntervals = [];

  while (startTime !== endTime) {
    let x = startTime < 12 ? "am" : "pm";

    if (startTime === 12) 
    {
      timeIntervals.push(`${12 + x} - ${1 + x}`);
    } else {
      if (startTime + 1 === 12) {
        timeIntervals.push(`${(startTime % 12) + x} - ${1 + x}`);
      } else {
        timeIntervals.push(
          `${(startTime % 12) + x} - ${((startTime + 1) % 12) + x}`
        );
      }
    }
    startTime++;
  }

  return (
    <>
      <div className="div1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar"]}>
            <DateCalendar
              onChange={(newDate) => {
                handleChange(newDate);
              }}
              referenceDate={dayjs(date)}
              views={["year", "month", "day"]}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="div2">
        {console.log("inside the available")}
        {timeIntervals.map((interval, index) => (
          <div
            key={index}
            className={
              dataArray.includes(timeIntervals[index].split(" ")[0])
                ? "dull"
                : "clickable"
            }
            onClick={handleClickEvent}
          >
            {interval}
          </div>
        ))}
        {console.log("hehehehehe",date)}
      </div>
    </>
  );
}

export default ChooseSlots;
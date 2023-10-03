import React, { useEffect, useState } from "react";
import DoctorList from "./DoctorList";
import axios from "axios";
const Search = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        await axios
          .get("http://127.0.0.1:5000/doctor/list")
          .then((response) => {
            console.log(response.data.doctorsList);
            setDoctors(response.data.doctorsList);
            setFilteredDoctors(response.data.doctorsList);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    },[]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.email.toLowerCase().includes(query.toLowerCase()) || 
        doctor.speciality.toLowerCase().includes(query.toLowerCase()) ||
        doctor.venue.toLowerCase().includes(query.toLowerCase())
        // doctor.location.toLowerCase().includes(query.toLowerCase()) ||
    );
    setFilteredDoctors(filtered);
  };


  return (
    <div>
      <h1>Doctor Directory</h1>
      <input
        type="text"
        placeholder="Search by name, location, or specialty"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <DoctorList doctors={filteredDoctors} />
    </div>
  );
};

export default Search;

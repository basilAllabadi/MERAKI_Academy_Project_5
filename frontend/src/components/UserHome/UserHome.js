import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserHome = () => {
  const { userId } = useSelector((state) => {
    return { userId: state.usersAuth.userId };
  });

  const [jobs, setAllJobs] = useState("");
  const getAllJobs = () => {
    axios
      .get("http://localhost:5000/jobs")
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        setAllJobs(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddToFav = (jobId) => {
    axios
      .post(`http://localhost:5000/jobs/favjobs/${userId}`, jobId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <>
      <div className="jobsCardsDiv">
        {jobs &&
          jobs.map((elem, index) => {
            return (
              <div id={elem.id} key={index} className="jobCard">
                <img src={elem.companylogo}></img>
                <p>{elem.jobtitle}</p>
                <p>{elem.companyname}</p>
                <p>{elem.country}</p>
                <p>{elem.industry}</p>
                <p>{elem.createdat}</p>
                <p
                  onClick={(e) => {
                    handleAddToFav(elem.id);
                  }}
                >
                  Add to Favorite
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UserHome;

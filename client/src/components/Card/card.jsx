import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteSchool } from "../../services/service";

const Card = ({ item, setSchools, schools }) => {
  const navigate = useNavigate();
  const {
    city,
    pincode,
    phone,
    name,
    about,
    mission,
    vision,
    _id: schoolId,
  } = item;

  const handleClick = () => {
    navigate("./edit", { state: { item } });
  };

  const handleDelete = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    deleteSchool(token, schoolId)
      .then((res) => res.json())
      .then((data) => {
        let updatedSchools = schools.filter(
          (school) => school._id !== schoolId
        );
        setSchools(updatedSchools);
      });
  };

  return (
    <div className="card-container">
      <div className="school-details">
        <div className="col">
          <div className="group2">
            <div>
              <p className="bold">School Name</p>
              <p>{name}</p>
            </div>
            <div>
              <p className="bold">City</p>
              <p>{city}</p>
            </div>
          </div>
          <div className="group2">
            <div>
              <p className="bold">Pincode</p>
              <p>{pincode}</p>
            </div>
            <div>
              <p className="bold">Phone</p>
              <p>{phone}</p>
            </div>
          </div>
        </div>
        <div className="long-text">
          <div className="about">
            <p className="bold">About</p>
            <p>{about}</p>
          </div>
          <div className="about">
            <p className="bold">Mission</p>
            <p>{mission}</p>
          </div>
          <div className="about">
            <p className="bold">Vision</p>
            <p>{vision}</p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="edit">
          <button className="edit-btn" onClick={handleClick}>
            <FaEdit />
          </button>
        </div>
        <div className="delete" onClick={handleDelete}>
          <button className="edit-btn">
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

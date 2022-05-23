import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { validate } from "../../utils";
import "./style.css";
import { updateSchool } from "../../services/service";
import Input from "../Input/Input";

const SchoolEditForm = () => {
  const [school, setSchool] = useState({
    name: "",
    city: "",
    phone: "",
    pincode: "",
    about: "",
    mission: "",
    vision: "",
    logoUrl: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const item = location?.state?.item;
    if (item) {
      const transformedItem = {
        name: item.name,
        city: item.city,
        phone: item.phone,
        pincode: item.pincode,
        about: item.about,
        mission: item.mission,
        vision: item.vision,
        logoUrl: item.logoUrl,
      };
      setSchool(transformedItem);
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSchool((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    let message = validate(school);
    if (message !== "success") {
      toast.error(message);
      return;
    }

    const userId = JSON.parse(localStorage.getItem("userId"));
    let token = JSON.parse(localStorage.getItem("token"));
    let data = { userId, ...school };

    const res = await updateSchool(token, data, location.state.item._id);
    const response = await res.json();

    if (res.status == 200) {
      toast.success("School Updated!");
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="form-bg">
      <div className="newform-container">
        <div className="form-head">
          <h2 className="center-bold">Edit School</h2>
        </div>

        <form className="form-input" onsubmit="return false">
          <div className="group-of-2">
            <div className="form-item2">
              <Input
                type="text"
                name="name"
                placeholder="School Name"
                onChange={handleChange}
                value={school.name}
              />
            </div>
            <div className="form-item2">
              <Input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={school.city}
              />
            </div>
          </div>
          <div className="group-of-2">
            <div className="form-item2">
              <Input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                value={school.pincode}
              />
            </div>
            <div className="form-item2">
              <Input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={school.phone}
              />
            </div>
          </div>

          <div className="group-of-2 text-area">
            <div className="form-item2">
              <textarea
                name="about"
                placeholder="About"
                onChange={handleChange}
                value={school.about}
              />
            </div>
            <div className="form-item2">
              <textarea
                name="mission"
                placeholder="Mission"
                onChange={handleChange}
                value={school.mission}
              />
            </div>
          </div>

          <div className="group-of-2 text-area">
            <div className="form-item2">
              <textarea
                name="vision"
                placeholder="Vision"
                onChange={handleChange}
                value={school.vision}
              />
            </div>
            <div className="form-item2">
              <Input
                type="text"
                name="logoUrl"
                placeholder="Logo Url"
                onChange={handleChange}
                value={school.logoUrl}
              />
            </div>
          </div>

          <div className="group-1">
            <button
              className="submit-btn btn-large"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolEditForm;

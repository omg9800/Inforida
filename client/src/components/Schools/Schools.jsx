import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/card";
import "./schools.css";
import { getSchools } from "../../services/service";

const Schools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getSchools().then((data) => {
      setSchools(data);
    });
  }, []);

  return (
    <div className="schools">
      <div className="new">
        <Link className="new-link" to="/new">
          New Schools
        </Link>
      </div>
      <div className="school-list">
        {!schools.length ? (
          <h2>No Schools!</h2>
        ) : (
          schools.map((school) => {
            return (
              <Card
                key={school._id}
                item={school}
                setSchools={setSchools}
                schools={schools}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Schools;

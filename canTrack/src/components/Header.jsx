import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Header(props) {
  const { userId } = useParams(); // Extract the userId from the URL params

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow container-fluid pe-3 py-1">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 py-2 text-white" to={`/dashboard/${userId}`}>
        <img className="py-1 img-fluid me-1" src="../src/assets/react.svg" alt="" /> canTrack
      </Link>
      <div className="col col-6 col-md-4 col-lg-3 col-xl-2 d-md-block">
        <div className="input-group float-md-end my-2 mx-2">
          <input className="form-control form-control-dark rounded-0 border-0 py-1 rounded-start" type="text" placeholder="Search" aria-label="Search" />
          <i className="btn btn-primary fa fa-search p-2 px-3 m-0 ms-0 rounded-end"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;

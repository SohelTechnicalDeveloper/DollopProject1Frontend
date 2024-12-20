import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCursorClick } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { LuGitBranchPlus } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import "../../Styles/Sidebar.css";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineViewList } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { TbPackages } from "react-icons/tb";




const Sidebar = () => {
  const [Open, setOpen] = useState(false);
     const {pathname} = useLocation()
     

  return (
   
    
    <div className="mainlayout-sidebar ">
  <HiOutlineViewList
    className="navbar-opencross"
    style={{
      position: "fixed",
      top: "2px",
      zIndex: "100",
      left: "30px",
      fontSize: "2rem",
      color: "#fff",
    }}
    onClick={() => setOpen(!Open)}
  />
  <div className={`navbar-togglercross ${Open ? "open" : ""}`}>
    <div className="fs-3 mt-3 p-4 mx-4 text-white ">
      e Candidate
    </div>

<div className="btn-side px-3">
    <RxCross1 className="" onClick={() => setOpen(!Open)} />

</div>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/dashboard'>
          <RxDashboard className="fs-2 fa me-3" />
          <span>DashBoard</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/campaigns'>
          <HiOutlineCursorClick className="fs-2 fa me-3" />
          <span>Campaigns</span>
        </Link>
      </li>
    </ul>
    <ul className="nav mb-auto p-2 flex-column" data-bs-toggle="collapse" data-bs-target="#demo">
    <li className="nav-item">
        <Link   className="text-decoration-none text-white nav-link active">
          <LuGitBranchPlus className="fs-2 me-3 fa" />
          <span>Bharat SAT </span>
        </Link>
      </li>
     
    </ul>
    <ul className="flex-column mx-5  py-2  me-1 collapse"  id="demo" style={{borderLeft:"2px solid gray"}}>
    <li className="nav-item mb-2" >
        <Link   className="text-decoration-none text-white nav-link active" to="/create-exam">
         <span className="fs-5 position-relative" style={{paddingRight:"0px",top:"-7px",left:"-30px",right:"-30px"}}>___</span>
          <span  className={(pathname ==='/create-exam')?'text-warning':""} >View</span>
        </Link>
      </li>
      <li className="nav-item" >
        <Link  className="text-decoration-none text-white nav-link active" to='/BharatSAT'>
        <span className="fs-5 position-relative" style={{paddingLeft:"0px",top:"-7px",left:"-30px"}}>___</span>
          <span className={(pathname ==='/BharatSAT')?'text-warning':""} > Add </span>
        </Link>
      </li>
    </ul>
    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/Blog'>
          <TfiWrite  className="fs-2 fa me-3" />
          <span>Blog Add </span>
        </Link>
      </li>
    </ul>
    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/blogdetails'>
          <HiOutlineCursorClick className="fs-2 fa me-3" />
          <span>Blog Details</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/task'>
          <FaHome className="fs-2 me-3 fa" />
          <span>Tasks / Calender</span>
        </Link>
      </li>
    </ul>
    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/package'>
          <TbPackages className="fs-2 me-3 fa" />
          <span>Purchase Packages</span>
        </Link>
      </li>
    </ul>


    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to="/email">
          <MdOutlineMarkEmailUnread className="fs-2 me-3 fa" />
          <span>Email Functionality</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to="/agencyRoom">
          <FaHome className="fs-2 me-3 fa" />
          <span>Users Room</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/mockTest'>
          <FaRocketchat className="fs-2 me-3 fa" />
          <span>Mock Test</span>
        </Link>
      </li>
    </ul>

  

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to="/userdata">
          <FaUsers className="fs-2 me-3 fa" />
          <span>User</span>
        </Link>
      </li>
    </ul>
  </div>
</div>

  );
};

export default Sidebar;

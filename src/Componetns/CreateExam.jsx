import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MainLayout from "../MainLayout";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";

const CreateExam = () => {
  const [ExamData, setExamData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [availableDataCount, setAvialeCount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [singleChecked, setSingleChecked] = useState(false);
  const [addBtn, setAddBtne] = useState(false);
  const [activeStatus, setactiveStatus] = useState(false);
  const [singleData, setSingleData] = useState({
    bharatSatExamId: "",
    is_active: "",
  });

  const addShowModel = () => {
    setAddBtne(true);
  };

  const handleClose = () => {
    setAddBtne(false);
    setactiveStatus(false);
  };
  const handleConfirm = (data) => {
    setAddBtne(false);
    setSingleData(data);
    setactiveStatus(true);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update state with checkbox status
    setSingleChecked(
      e.target.checked ? ExamData.map(() => true) : ExamData.map(() => false)
    );
  };

  const handleSingleCheckbox = (index) => {
    setSingleChecked(index); // Update state with checkbox status

    // const updatedChecks = [...singleChecked];
    // updatedChecks[index] = !updatedChecks[index];
    // setSingleChecked(updatedChecks);

    // // If all individual checkboxes are checked, check the master checkbox
    // const allChecked = updatedChecks.every((checked) => checked);
    // setIsChecked(allChecked);
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzI3ODc3OTYsImV4cCI6MTczMjg3NDE5Nn0.ykQltcVIMVTNswC11VXhX20pLXGwyH-Doin7jLMxKJ8";

  const getAllExam = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/bharatSat/list-all-exam`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            offset: page,
            limit: limit,
            searchQuery: search,
          },
        }
      );
      if (response.status === 200) {
        setExamData(response.data.data);
        setAvialeCount(response.data.availableDataCount);
        setTotalPages(Math.ceil(response.data.availableDataCount / limit));
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const ChangeStatus = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.27:5003/bharatSat/change-status`,
        {
          id: singleData.bharatSatExamId,
          is_active: !singleData.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        getAllExam();

        setactiveStatus(false);
      }
    } catch (error) {
      toast.error("Failed to change status.");
    }
  };

  const getClassName = () => {
    if (isChecked && singleChecked.length > 0) {
      return "checkedBtn";
    }
    if (isChecked && singleChecked.length === 0) {
      return "partiallyCheckedBtn";
    }
    return "UncheckedBtn";
  };

  useEffect(() => {
    getAllExam();
  }, [page, limit, search]);

  return (
    <div className="bg-body-secondary">
      <MainLayout>
        <div className="d-flex justify-content-between p-3">
          <div className="fw-bold">BHARAT SAT</div>
          <div className="text-center">
            <span className="fw-bold">Dashborad</span>
            <MdKeyboardArrowRight />

            <Link className="text-decoration-none fw-bold">BHARAT SAT</Link>
          </div>
        </div>
        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div>
            <div
              className="fw-bold fs-4 mb-4 text-truncate"
              title="Create Bharat SAT Exam"
            >
              Create Bharat SAT Exam
            </div>
            <div className=" d-flex gap-3 justify-content-between text-center ">
              <div>
                <RiDeleteBinLine className={getClassName()} />
              </div>
              <div className="d-flex gap-4">
                <div>
                  <input
                    id="input1"
                    type="search"
                    className="form-control "
                    placeholder="Search User"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-end ">
                  <div className="btn-group ">
                    <button
                      type="submit"
                      className="btn "
                      style={{ backgroundColor: "#07284B", color: "#fff" }}
                    >
                      Submit
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-end-3 bg-primary text-white"
                    >
                      <GoPlus style={{ fontSize: "18px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="table-responsive mt-2 "
            style={{ maxWidth: "150%", overflowX: "auto" }}
          >
            <table className="table p-3" style={{ minWidth: "1500px" }}>
              <thead className="table-primary text-center">
                <tr className="fw-bold">
                  <th>
                    <input
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      style={{
                        width: "18px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </th>
                  <th>Sr No.</th>
                  <th>Bharat SAT Exam Name</th>
                  <th>Class</th>
                  <th>Medium</th>
                  <th>Exam Date</th>
                  <th>Exam Start Time</th>
                  <th>Exam End Time</th>
                  <th>View Question Paper</th>
                  <th>Generate E-Hall Ticket</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {ExamData.map((item, index) => (
                  <tr key={index} style={{ fontWeight: "500" }}>
                    <td>
                      <input
                        checked={singleChecked[index]}
                        onChange={(e) =>
                          handleSingleCheckbox(item.bharatSatExamId)
                        }
                        type="checkbox"
                        style={{
                          width: "18px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>{page * limit + index + 1}</td>
                    <td>{item.bharatSatExamName}</td>
                    <td>{item.className}</td>
                    <td>{item.medium}</td>
                    <td>{item.bharatSatExamDate}</td>
                    <td>{item.examStartTime}</td>
                    <td>{item.examEndTime}</td>
                    <td>
                      <Link
                      to={`/view-exam`}
                      state={{classId:item.class_id}}
                       
                      >
                          
                        View
                      </Link>
                    </td>
                    <td>
                      <Link onClick={addShowModel}>Generate</Link>
                    </td>
                    <td>
                      <div className="form-switch d-flex justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          style={{ cursor: "pointer" }}
                          checked={item.is_active}
                          onClick={() => {
                            handleConfirm(item);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="action-btn fs-3 d-flex justify-content-center">
                        &nbsp;
                        <BiEditAlt
                          style={{
                            backgroundColor: "#b3f3c966",
                            color: "#70FDA2",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                        />
                        &nbsp;
                        <RiDeleteBinLine
                          style={{
                            backgroundColor: " #efd7da",
                            color: "#e82e44",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination  data  */}

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted">
                Showing 1 to 10 of {availableDataCount} entries
              </p>
            </div>
            <div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-4">
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <Link className="page-link" aria-label="Previous">
                      <span
                        aria-hidden="true"
                        onClick={() => setPage(page - 1)}
                      >
                        &laquo; Previous
                      </span>
                    </Link>
                  </li>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          onClick={() => {
                            setPage(page - 1);
                          }}
                        >
                          {page}
                        </Link>
                      </li>
                    );
                  })}

                  <li
                    className={`page-item ${
                      page === totalPages - 1 ? "disabled" : ""
                    }`}
                  >
                    <Link className="page-link" aria-label="Next">
                      <span
                        aria-hidden="true"
                        onClick={() => setPage(page + 1)}
                      >
                        Next &raquo;
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* this modal for the status is  active */}

        <div className="container ">
          {addBtn && (
            <div
              className="modal show  "
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
            >
              <div className="modal-dialog  modal-dialog-centered  ">
                <div className="modal-content model-generate p-4 border-0 ">
                  <div className="p-4 text-center">
                    <div
                      className="d-flex position-absolute align-items-center circel-check  justify-content-center"
                      style={{
                        left: "50%",
                        top: "2%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <i className="fas fa-check-circle  "></i>
                    </div>
                  </div>
                  <div className="modal-body text-center">
                    <h4 className="mb-3 fw-bold">
                      Are you sure you want to generate E-hall ticket ?
                    </h4>
                    <div className="p-4 d-flex justify-content-center gap-4 align-items-center">
                      <button
                        className="btn btn-secondary  px-4 p-2 fw-bold fs-6"
                        onClick={handleClose}
                      >
                        No
                      </button>
                      <button
                        className="btn  px-4 p-2 text-white fw-bold"
                        style={{ backgroundColor: "#03AA11" }}
                        onClick={handleConfirm}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
        </div>

        {/* this modal for the status is not active */}

        <div className="container ">
          {activeStatus && (
            <div
              className="modal show  "
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
            >
              <div className="modal-dialog  modal-dialog-centered  ">
                <div className="modal-content model-custom p-4 px-4 border-0 ">
                  <div className="p-3 text-center">
                    <div
                      className="d-flex position-absolute align-items-center check-status  justify-content-center"
                      style={{
                        left: "50%",
                        top: "2%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="icon-container">
                        <span>!</span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body text-center mt-3">
                    <h4 className="mb-3 fw-bold">
                      Are you sure want to change the status ?
                    </h4>
                    <div className="p-4 d-flex justify-content-center gap-4 align-items-center">
                      <button
                        className="btn btn-secondary  px-4 p-2 fw-bold fs-6"
                        onClick={handleClose}
                      >
                        No
                      </button>
                      <button
                        className="btn  px-4 p-2 text-white fw-bold"
                        style={{ backgroundColor: "red" }}
                        onClick={() => ChangeStatus()}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
        </div>

        <ToastContainer />
      </MainLayout>
    </div>
  );
};

export default CreateExam;

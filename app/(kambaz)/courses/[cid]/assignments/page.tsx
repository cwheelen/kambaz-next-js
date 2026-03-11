"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "../modules/GreenCheckmark";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input type="search" placeholder="Search for Assignment"
               className="form-control w-50" id="wd-search-assignment" />
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <BsPlus /> Group
          </Button>
          <Link href={`/courses/${cid}/assignments/new`}>
            <Button variant="danger" id="wd-add-assignment-btn">
              <BsPlus /> Assignment
            </Button>
          </Link>
          <IoEllipsisVertical className="fs-4 ms-2" />
        </div>
      </div>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        <ListGroupItem className="wd-assignment-list-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <b>ASSIGNMENTS</b>
            </div>
            <div>
              <span className="border rounded-pill px-2 me-2">40% of Total</span>
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="wd-assignment-items rounded-0">
            {assignments
              .filter((a: any) => a.course === cid)
              .map((assignment: any) => (
                <ListGroupItem key={assignment._id}
                               className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <div>
                      <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                            className="text-decoration-none text-dark">
                        <b>{assignment.title}</b>
                      </Link>
                      <div className="text-muted fs-6">
                        Multiple Modules | Due {assignment.dueDate} | {assignment.points} pts
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <GreenCheckmark />
                    <FaTrash className="text-danger me-2"
                             onClick={() => handleDelete(assignment._id)} />
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
"use client";

import Link from "next/link";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import AssignmentsControls from "./assignmentControl";
import AssignmentControlButtons from "./assignmentControlButtons";


export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <br /><br /><br /><br />
      
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <div>
              <span className="badge rounded-pill bg-light text-dark border me-2">
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <span className="fs-4">⋮</span>
            </div>
          </div>
          
          <ListGroup className="rounded-0">
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
              <BsGripVertical className="me-2 fs-3" />
              <div className="d-inline-block" style={{ width: "calc(100% - 100px)" }}>
                <Link 
                  href="/courses/1234/assignments/123"
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                >
                  A1 - ENV + HTML
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
              <BsGripVertical className="me-2 fs-3" />
              <div className="d-inline-block" style={{ width: "calc(100% - 100px)" }}>
                <Link 
                  href="/courses/1234/assignments/456"
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                >
                  A2 - CSS + Bootstrap
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
              <BsGripVertical className="me-2 fs-3" />
              <div className="d-inline-block" style={{ width: "calc(100% - 100px)" }}>
                <Link 
                  href="/courses/1234/assignments/125"
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
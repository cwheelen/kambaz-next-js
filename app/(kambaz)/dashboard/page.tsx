"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <Button variant="primary" className="float-end"
                id="wd-enrollments-btn"
                onClick={() => setShowAllCourses(!showAllCourses)}>
          Enrollments
        </Button>
      </h1> <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={() => dispatch(addNewCourse(course))}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2"
                    id="wd-update-course-click"
                    onClick={() => dispatch(updateCourse(course))}>
              Update
            </button>
          </h5><br />
          <FormControl value={course.name} className="mb-2"
                       onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
                       onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden"
                            style={{ height: "100px" }}>
                    {c.description}
                  </CardText>
                  <div className="d-flex justify-content-between">
                    {isEnrolled(c._id) ? (
                      <>
                        <Link href={`/courses/${c._id}/home`}>
                          <Button variant="primary"> Go </Button>
                        </Link>
                        <Button variant="danger"
                                onClick={() => dispatch(unenroll({ userId: currentUser?._id, courseId: c._id }))}>
                          Unenroll
                        </Button>
                      </>
                    ) : (
                      <Button variant="success"
                              onClick={() => dispatch(enroll({ userId: currentUser?._id, courseId: c._id }))}>
                        Enroll
                      </Button>
                    )}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <Button variant="warning"
                                id="wd-edit-course-click"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCourse(c);
                                }}>
                          Edit
                        </Button>
                        <Button variant="danger"
                                id="wd-delete-course-click"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(deleteCourse(c._id));
                                }}>
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
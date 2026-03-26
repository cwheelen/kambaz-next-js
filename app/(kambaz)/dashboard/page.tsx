"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);

  const displayedCourses = showAllCourses ? courses : courses;

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => c._id === course._id ? course : c)));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <Button variant="primary" className="float-end" id="wd-enrollments-btn"
                onClick={() => setShowAllCourses(!showAllCourses)}>
          Enrollments
        </Button>
      </h1><hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click"
                    onClick={onAddNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click"
                    onClick={onUpdateCourse}>Update</button>
          </h5><br />
          <FormControl value={course.name} className="mb-2"
                       onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
                       onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2><hr />
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
                            style={{ height: "100px" }}>{c.description}</CardText>
                  <div className="d-flex justify-content-between">
                    <Link href={`/courses/${c._id}/home`}>
                      <Button variant="primary">Go</Button>
                    </Link>
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <Button variant="warning" id="wd-edit-course-click"
                                onClick={(e) => { e.preventDefault(); setCourse(c); }}>
                          Edit
                        </Button>
                        <Button variant="danger" id="wd-delete-course-click"
                                onClick={(e) => { e.preventDefault(); onDeleteCourse(c._id); }}>
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
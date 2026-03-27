"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import * as coursesClient from "../courses/client";
import * as enrollmentsClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const fetchMyCourses = async () => {
    try {
      const data = await coursesClient.findMyCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const data = await enrollmentsClient.fetchAllCourses();
      setAllCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [currentUser]);

  const handleEnrollmentsToggle = async () => {
    if (!showAllCourses) {
      await fetchAllCourses();
    }
    setShowAllCourses(!showAllCourses);
  };

  const onEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollInCourse(courseId);
    await fetchMyCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse(courseId);
    await fetchMyCourses();
    // also remove from allCourses view so state stays in sync
    if (showAllCourses) await fetchAllCourses();
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(
      setCourses(courses.map((c: any) => (c._id === course._id ? course : c))),
    );
  };

  const displayedCourses = showAllCourses ? allCourses : courses;

  const isEnrolled = (courseId: string) =>
    courses.some((c: any) => c._id === courseId);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          variant="primary"
          className="float-end"
          id="wd-enrollments-btn"
          onClick={handleEnrollmentsToggle}
        >
          Enrollments
        </Button>
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <CardImg
                  src="/images/reactjs.jpg"
                  variant="top"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {c.description}
                  </CardText>

                  <div className="d-flex justify-content-between flex-wrap gap-1">
                    {/* Go button — only if enrolled */}
                    {isEnrolled(c._id) && (
                      <Link href={`/courses/${c._id}/home`}>
                        <Button variant="primary">Go</Button>
                      </Link>
                    )}

                    {/* Enroll / Unenroll — only for students in Enrollments view */}
                    {currentUser?.role === "STUDENT" &&
                      showAllCourses &&
                      (isEnrolled(c._id) ? (
                        <Button
                          variant="danger"
                          onClick={() => onUnenroll(c._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => onEnroll(c._id)}
                        >
                          Enroll
                        </Button>
                      ))}

                    {/* Faculty controls */}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <Button
                          variant="warning"
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          id="wd-delete-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                        >
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

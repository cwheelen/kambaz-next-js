import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1234/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img 
                  src="/images/reactjs.jpg" 
                  className="card-img-top"
                  alt="React JS"
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </h5>
                  <p className="card-text wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer
                  </p>
                  <Button variant="primary">Go</Button>
                </div>
              </Link>
            </Card>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <div>GAME 4700 - game capstone</div>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <div>Programming in C++</div>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <div>Writing 101</div>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <div>Intro to Communications</div>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <div>Narrative for Games</div>
          </Col>
          
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <div>Chinese Tea Ceremonies</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
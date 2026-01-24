import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> game 4700 - game capstone </div>
        <div className="wd-dashboard-course"> programming in c++ </div>
        <div className="wd-dashboard-course"> writing 101 </div>
        <div className="wd-dashboard-course"> intro to communications </div>
        <div className="wd-dashboard-course"> narrative for games </div>
        <div className="wd-dashboard-course"> chinese tea ceremonies </div>
      </div>
    </div>
);}

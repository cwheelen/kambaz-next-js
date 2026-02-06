import Link from "next/link";
import { ListGroup } from "react-bootstrap";
import { FaRegCircleUser, FaInbox, FaFlask } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";

export default function KambazNavigation() {
  return (
    <ListGroup 
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" 
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <Link 
        className="list-group-item bg-black border-0 text-center text-decoration-none" 
        target="_blank" 
        href="https://www.northeastern.edu/" 
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </Link>
      <br />
      
      <Link 
        href="/account" 
        id="wd-account-link" 
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>
      <br />
      
      <Link 
        href="/dashboard" 
        id="wd-dashboard-link" 
        className="list-group-item border-0 bg-white text-center text-danger text-decoration-none"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </Link>
      <br />
      
      <Link 
        href="/dashboard" 
        id="wd-course-link" 
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <LiaBookSolid className="fs-1 text-white" />
        <br />
        Courses
      </Link>
      <br />
      
      <Link 
        href="/calendar" 
        id="wd-calendar-link" 
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <IoCalendarOutline className="fs-1 text-white" />
        <br />
        Calendar
      </Link>
      <br />
      
      <Link 
        href="/inbox" 
        id="wd-inbox-link" 
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <FaInbox className="fs-1 text-white" />
        <br />
        Inbox
      </Link>
      <br />
      
      <Link 
        href="/labs" 
        id="wd-labs-link" 
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <FaFlask className="fs-1 text-white" />
        <br />
        Labs
      </Link>
    </ListGroup>
  );
}
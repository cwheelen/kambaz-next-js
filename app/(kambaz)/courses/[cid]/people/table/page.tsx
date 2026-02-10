import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
        <tr>
            <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Tony</span>{" "}
                <span className="wd-last-name">Stark</span></td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td>
        </tr>

        <tr>
            <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Kaladin</span>{" "}
                <span className="wd-last-name">Stormblessed</span></td>
            <td className="wd-login-id">001234016S</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2021-10-01</td>
            <td className="wd-total-activity">10:21:00</td>
        </tr>

        <tr>
            <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Elend</span>{" "}
                <span className="wd-last-name">Venture</span></td>
            <td className="wd-login-id">001216561S</td>
            <td className="wd-section">S103</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2021-10-01</td>
            <td className="wd-total-activity">16:21:32</td>
        </tr>

        <tr>
            <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">Maka</span>{" "}
                <span className="wd-last-name">Albarn</span></td>
            <td className="wd-login-id">001554561S</td>
            <td className="wd-section">S104</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2022-10-01</td>
            <td className="wd-total-activity">14:21:32</td>
        </tr>
    </tbody>
   </Table>
  </div> );}
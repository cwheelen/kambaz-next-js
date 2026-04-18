"use client";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = [
    { label: "Home", path: `/courses/${cid}/home` },
    { label: "Modules", path: `/courses/${cid}/modules` },
    { label: "Pazza", path: `/courses/${cid}/pazza` },
    { label: "Zoom", path: `/courses/${cid}/zoom` },
    { label: "Assignments", path: `/courses/${cid}/assignments` },
    { label: "Quizzes", path: `/courses/${cid}/quizzes` },
    { label: "People", path: `/courses/${cid}/people/table` },
  ];

  return (
    <ListGroup id="wd-courses-navigation" className="wd fs-5 rounded-0">
      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={link.path}
          className={`border-0
            ${pathname.includes(link.label) ? "active" : "text-danger"}`}
        >
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills">
      <NavItem>
        <Link href="/labs" passHref legacyBehavior>
          <NavLink>Labs</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/labs/lab1" passHref legacyBehavior>
          <NavLink>Lab 1</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/labs/lab2" passHref legacyBehavior>
          <NavLink>Lab 2</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/labs/lab3" passHref legacyBehavior>
          <NavLink>Lab 3</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/" passHref legacyBehavior>
          <NavLink>Kambaz</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <NavLink id="wd-github" href="https://github.com/cwheelen">
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}

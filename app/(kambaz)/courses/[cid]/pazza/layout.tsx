"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function PazzaLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const course = courses.find((c: any) => c._id === cid);
  const isInstructor =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const isManage = pathname.includes("/manage");

  return (
    <div id="wd-pazza" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Fixed Pazza Navigation Bar */}
      <div
        className="d-flex align-items-center px-3 py-2 border-bottom"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          gap: "16px",
        }}
      >
        <span className="fw-bold text-danger fs-5 me-3">pazza</span>
        <span className="fw-semibold me-4">{course?.name || cid}</span>

        <Link
          href={`/courses/${cid}/pazza`}
          className={`text-decoration-none me-3 pb-1 ${
            !isManage
              ? "text-danger border-bottom border-2 border-danger fw-semibold"
              : "text-secondary"
          }`}
        >
          Q&amp;A
        </Link>

        {isInstructor && (
          <Link
            href={`/courses/${cid}/pazza/manage`}
            className={`text-decoration-none me-3 pb-1 ${
              isManage
                ? "text-danger border-bottom border-2 border-danger fw-semibold"
                : "text-secondary"
            }`}
          >
            Manage Class
          </Link>
        )}

        <span className="ms-auto text-secondary small">
          {currentUser
            ? `${(currentUser as any).firstName ?? ""} ${(currentUser as any).lastName ?? ""}`.trim() ||
              currentUser.username
            : ""}
        </span>
      </div>

      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
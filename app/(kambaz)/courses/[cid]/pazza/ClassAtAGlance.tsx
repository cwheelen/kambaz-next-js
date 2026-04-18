"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function ClassAtAGlance({
  posts,
  courseId,
}: {
  posts: any[];
  courseId: string;
}) {
  const [enrolledCount, setEnrolledCount] = useState<number | null>(null);

  useEffect(() => {
    if (!courseId) return;
    axios
      .get(`${HTTP_SERVER}/api/courses/${courseId}/users`, { withCredentials: true })
      .then((res) => setEnrolledCount(res.data.length))
      .catch(() => setEnrolledCount(null));
  }, [courseId]);

  const questions = posts.filter((p) => p.type === "question");
  const unanswered = questions.filter(
    (p) => !p.studentAnswers?.length && !p.instructorAnswer
  );
  const unread = posts.filter((p) => !p.viewed);

  const instructorResponses = posts.filter((p) => p.instructorAnswer).length;
  const studentResponses = posts.reduce(
    (acc: number, p: any) => acc + (p.studentAnswers?.length ?? 0),
    0
  );

  const stats = [
    {
      label: unread.length === 0 ? "no unread posts" : `${unread.length} unread posts`,
      ok: unread.length === 0,
    },
    {
      label:
        unanswered.length === 0
          ? "no unanswered questions"
          : `${unanswered.length} unanswered questions`,
      ok: unanswered.length === 0,
    },
  ];

  return (
    <div className="p-4" style={{ maxWidth: 600 }}>
      <h5 className="fw-semibold mb-1">Class at a Glance</h5>
      <p className="text-muted small mb-3">Overview for course {courseId}</p>

      <div className="mb-3">
        {stats.map((s, i) => (
          <div key={i} className="d-flex align-items-center gap-2 mb-1">
            <span style={{ color: s.ok ? "green" : "#dc3545", fontWeight: 600, fontSize: 14 }}>
              {s.ok ? "✓" : "!"}
            </span>
            <span style={{ fontSize: 14 }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div
        className="border rounded p-3"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}
      >
        <div className="text-muted small">total posts</div>
        <div className="fw-semibold small">{posts.length}</div>

        <div className="text-muted small">instructors&apos; responses</div>
        <div className="fw-semibold small">{instructorResponses}</div>

        <div className="text-muted small">students&apos; responses</div>
        <div className="fw-semibold small">{studentResponses}</div>

        <div className="text-muted small">students enrolled</div>
        <div className="fw-semibold small">
          {enrolledCount !== null ? enrolledCount : "—"}
        </div>
      </div>
    </div>
  );
}
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import * as client from "./client";

const ReactQuill = dynamic(
  () => import("react-quill-new").then((m) => m.default as any),
  { ssr: false }
) as any;

export default function PostScreen({
  post,
  currentUser,
  onPostUpdated,
  onPostDeleted,
}: {
  post: any;
  currentUser: any;
  onPostUpdated: (p: any) => void;
  onPostDeleted: (id: string) => void;
}) {
  const isInstructor =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isAuthor = post.authorId === currentUser?._id;

  const [editingPost, setEditingPost] = useState(false);
  const [editSummary, setEditSummary] = useState(post.summary);
  const [editDetails, setEditDetails] = useState(post.details);

  const [studentAnswerText, setStudentAnswerText] = useState("");
  const [instructorAnswerText, setInstructorAnswerText] = useState("");

  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editAnswerContent, setEditAnswerContent] = useState("");

  const [newFollowup, setNewFollowup] = useState("");
  const [editingFollowupId, setEditingFollowupId] = useState<string | null>(null);
  const [editFollowupText, setEditFollowupText] = useState("");

  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [editingReplyKey, setEditingReplyKey] = useState<string | null>(null);
  const [editReplyText, setEditReplyText] = useState("");

  const authorName = () =>
    currentUser
      ? `${(currentUser as any).firstName ?? ""} ${(currentUser as any).lastName ?? ""}`.trim() ||
        currentUser.username
      : "Unknown";

  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleString([], {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });

  const handleSavePost = async () => {
    const updated = await client.updatePost({ ...post, summary: editSummary, details: editDetails });
    onPostUpdated(updated);
    setEditingPost(false);
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    await client.deletePost(post._id);
    onPostDeleted(post._id);
  };

  const handleSubmitStudentAnswer = async () => {
    if (!studentAnswerText.replace(/<[^>]+>/g, "").trim()) return;
    const updated = await client.createAnswer(post._id, {
      content: studentAnswerText,
      authorId: currentUser?._id,
      authorName: authorName(),
      authorRole: currentUser?.role,
      createdAt: new Date().toISOString(),
    });
    onPostUpdated(updated);
    setStudentAnswerText("");
  };

  const handleSubmitInstructorAnswer = async () => {
    if (!instructorAnswerText.replace(/<[^>]+>/g, "").trim()) return;
    const updated = await client.createAnswer(post._id, {
      content: instructorAnswerText,
      authorId: currentUser?._id,
      authorName: authorName(),
      authorRole: currentUser?.role,
      createdAt: new Date().toISOString(),
    });
    onPostUpdated(updated);
    setInstructorAnswerText("");
  };

  const handleSaveAnswer = async (ans: any) => {
    const updated = await client.updateAnswer(post._id, { ...ans, content: editAnswerContent });
    onPostUpdated(updated);
    setEditingAnswerId(null);
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (!window.confirm("Delete this answer?")) return;
    const updated = await client.deleteAnswer(post._id, answerId);
    onPostUpdated(updated);
  };

  const handleSubmitFollowup = async () => {
    if (!newFollowup.trim()) return;
    const updated = await client.createFollowup(post._id, {
      text: newFollowup,
      authorId: currentUser?._id,
      authorName: authorName(),
      resolved: false,
      createdAt: new Date().toISOString(),
      replies: [],
    });
    onPostUpdated(updated);
    setNewFollowup("");
  };

  const handleToggleResolved = async (followup: any) => {
    const updated = await client.updateFollowup(post._id, { ...followup, resolved: !followup.resolved });
    onPostUpdated(updated);
  };

  const handleSaveFollowup = async (fud: any) => {
    const updated = await client.updateFollowup(post._id, { ...fud, text: editFollowupText });
    onPostUpdated(updated);
    setEditingFollowupId(null);
  };

  const handleDeleteFollowup = async (followupId: string) => {
    if (!window.confirm("Delete this discussion?")) return;
    const updated = await client.deleteFollowup(post._id, followupId);
    onPostUpdated(updated);
  };

  const handleSubmitReply = async (followupId: string) => {
    const text = replyTexts[followupId];
    if (!text?.trim()) return;
    const updated = await client.createReply(post._id, followupId, {
      text,
      authorId: currentUser?._id,
      authorName: authorName(),
      createdAt: new Date().toISOString(),
    });
    onPostUpdated(updated);
    setReplyTexts((r) => ({ ...r, [followupId]: "" }));
  };

  const handleSaveReply = async (followupId: string, reply: any) => {
    const updated = await client.updateReply(post._id, followupId, { ...reply, text: editReplyText });
    onPostUpdated(updated);
    setEditingReplyKey(null);
  };

  const handleDeleteReply = async (followupId: string, replyId: string) => {
    if (!window.confirm("Delete this reply?")) return;
    const updated = await client.deleteReply(post._id, followupId, replyId);
    onPostUpdated(updated);
  };

  const studentAnswers = (post.studentAnswers ?? []).filter(
    (a: any) => a.authorRole !== "FACULTY" && a.authorRole !== "ADMIN"
  );
  const instructorAnswers = (post.studentAnswers ?? []).filter(
    (a: any) => a.authorRole === "FACULTY" || a.authorRole === "ADMIN"
  );

  return (
    <div className="p-4" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="text-muted small">
          {post.views ?? 0} view{post.views !== 1 ? "s" : ""} ·{" "}
          {Array.isArray(post.folders) && post.folders.join(", ")}
        </div>
        {(isAuthor || isInstructor) && (
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={() => setEditingPost(true)}>
              Edit
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" size="sm">Actions</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEditingPost(true)}>Edit</Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={handleDeletePost}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>

      {editingPost ? (
        <div className="mb-3">
          <input className="form-control mb-2" value={editSummary}
            onChange={(e) => setEditSummary(e.target.value)} />
          <ReactQuill theme="snow" value={editDetails} onChange={setEditDetails}
            style={{ minHeight: 140, marginBottom: 8 }} />
          <div className="d-flex gap-2 mt-2">
            <Button size="sm" variant="danger" onClick={handleSavePost}>Save</Button>
            <Button size="sm" variant="secondary" onClick={() => setEditingPost(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="fw-bold mb-1">{post.summary}</h4>
          <div className="text-muted small mb-2">
            by {post.authorName} ·{" "}
            {post.authorRole === "FACULTY" || post.authorRole === "ADMIN" ? "Instructor" : "Student"}
          </div>
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: post.details }} />
        </>
      )}

      {post.type === "question" && (
        <>
          <div className="border rounded p-3 mb-3">
            <div className="fw-semibold mb-2 small text-uppercase text-muted">
              Student&apos;s Answer
            </div>
            {studentAnswers.map((ans: any) => (
              <div key={ans._id} className="mb-3 border-bottom pb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small fw-semibold">{ans.authorName}</span>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-muted small">{fmtTime(ans.createdAt)}</span>
                    {(isInstructor || ans.authorId === currentUser?._id) && (
                      <Dropdown>
                        <Dropdown.Toggle variant="link" size="sm" className="p-0 text-secondary">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {
                            setEditingAnswerId(ans._id);
                            setEditAnswerContent(ans.content);
                          }}>Edit</Dropdown.Item>
                          <Dropdown.Item className="text-danger" onClick={() => handleDeleteAnswer(ans._id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                {editingAnswerId === ans._id ? (
                  <div className="mt-2">
                    <ReactQuill theme="snow" value={editAnswerContent} onChange={setEditAnswerContent}
                      style={{ minHeight: 100 }} />
                    <div className="d-flex gap-2 mt-2">
                      <Button size="sm" variant="danger" onClick={() => handleSaveAnswer(ans)}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditingAnswerId(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="small mt-1" dangerouslySetInnerHTML={{ __html: ans.content }} />
                )}
              </div>
            ))}
            {studentAnswers.length === 0 && !isInstructor && (
              <div>
                <ReactQuill theme="snow" value={studentAnswerText} onChange={setStudentAnswerText}
                  style={{ minHeight: 100 }} />
                <Button size="sm" variant="danger" className="mt-2" onClick={handleSubmitStudentAnswer}>
                  Submit
                </Button>
              </div>
            )}
          </div>

          <div className="border rounded p-3 mb-3">
            <div className="fw-semibold mb-2 small text-uppercase text-muted">
              Instructor&apos;s Answer
            </div>
            {instructorAnswers.map((ans: any) => (
              <div key={ans._id} className="mb-3 border-bottom pb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small fw-semibold">{ans.authorName}</span>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="text-muted small">{fmtTime(ans.createdAt)}</span>
                    {isInstructor && (
                      <Dropdown>
                        <Dropdown.Toggle variant="link" size="sm" className="p-0 text-secondary">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {
                            setEditingAnswerId(ans._id);
                            setEditAnswerContent(ans.content);
                          }}>Edit</Dropdown.Item>
                          <Dropdown.Item className="text-danger" onClick={() => handleDeleteAnswer(ans._id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                {editingAnswerId === ans._id ? (
                  <div className="mt-2">
                    <ReactQuill theme="snow" value={editAnswerContent} onChange={setEditAnswerContent}
                      style={{ minHeight: 100 }} />
                    <div className="d-flex gap-2 mt-2">
                      <Button size="sm" variant="danger" onClick={() => handleSaveAnswer(ans)}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditingAnswerId(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="small mt-1" dangerouslySetInnerHTML={{ __html: ans.content }} />
                )}
              </div>
            ))}
            {instructorAnswers.length === 0 && isInstructor && (
              <div>
                <ReactQuill theme="snow" value={instructorAnswerText} onChange={setInstructorAnswerText}
                  style={{ minHeight: 100 }} />
                <Button size="sm" variant="danger" className="mt-2" onClick={handleSubmitInstructorAnswer}>
                  Submit
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-3">
        <div className="fw-semibold small text-muted text-uppercase mb-2">
          Followup Discussions
        </div>

        {(post.followups ?? []).map((fud: any) => (
          <div key={fud._id} className="border rounded p-3 mb-2">
            <div className="d-flex align-items-center gap-2 mb-1">
              <button
                className={`btn btn-sm ${fud.resolved ? "btn-success" : "btn-outline-secondary"}`}
                style={{ fontSize: 11, padding: "1px 8px" }}
                onClick={() => handleToggleResolved(fud)}
              >
                {fud.resolved ? "Resolved" : "Unresolved"}
              </button>
              <span className="small fw-semibold">{fud.authorName}</span>
              <span className="text-muted small">{fmtTime(fud.createdAt)}</span>
              {(isInstructor || fud.authorId === currentUser?._id) && (
                <Dropdown className="ms-auto">
                  <Dropdown.Toggle variant="link" size="sm" className="p-0 text-secondary">
                    Actions
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                      setEditingFollowupId(fud._id);
                      setEditFollowupText(fud.text);
                    }}>Edit</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => handleDeleteFollowup(fud._id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>

            {editingFollowupId === fud._id ? (
              <div className="mb-2">
                <textarea
                  className="form-control form-control-sm mb-2"
                  rows={3}
                  value={editFollowupText}
                  onChange={(e) => setEditFollowupText(e.target.value)}
                />
                <div className="d-flex gap-2">
                  <Button size="sm" variant="danger" onClick={() => handleSaveFollowup(fud)}>Save</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingFollowupId(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <p className="small mb-2">{fud.text}</p>
            )}

            {(fud.replies ?? []).map((reply: any) => {
              const replyKey = `${fud._id}:${reply._id}`;
              return (
                <div key={reply._id} className="ms-3 border-start ps-3 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="small fw-semibold">{reply.authorName}</span>
                    <span className="text-muted small">{fmtTime(reply.createdAt)}</span>
                    {(isInstructor || reply.authorId === currentUser?._id) && (
                      <Dropdown className="ms-auto">
                        <Dropdown.Toggle variant="link" size="sm" className="p-0 text-secondary">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {
                            setEditingReplyKey(replyKey);
                            setEditReplyText(reply.text);
                          }}>Edit</Dropdown.Item>
                          <Dropdown.Item className="text-danger"
                            onClick={() => handleDeleteReply(fud._id, reply._id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                  {editingReplyKey === replyKey ? (
                    <div className="mt-1">
                      <textarea
                        className="form-control form-control-sm mb-1"
                        rows={2}
                        value={editReplyText}
                        onChange={(e) => setEditReplyText(e.target.value)}
                      />
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="danger" onClick={() => handleSaveReply(fud._id, reply)}>Save</Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditingReplyKey(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <p className="small mb-1">{reply.text}</p>
                  )}
                </div>
              );
            })}

            <div className="ms-3 mt-2 d-flex gap-2">
              <input
                className="form-control form-control-sm"
                placeholder="Reply to this followup..."
                value={replyTexts[fud._id] ?? ""}
                onChange={(e) => setReplyTexts((r) => ({ ...r, [fud._id]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmitReply(fud._id); }}
              />
              <Button size="sm" variant="outline-danger" onClick={() => handleSubmitReply(fud._id)}>
                Reply
              </Button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-2 mt-2">
          <input
            className="form-control form-control-sm"
            placeholder="Start a new followup discussion..."
            value={newFollowup}
            onChange={(e) => setNewFollowup(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmitFollowup(); }}
          />
          <Button size="sm" variant="outline-danger" onClick={handleSubmitFollowup}>Post</Button>
        </div>
      </div>
    </div>
  );
}
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => import("react-quill-new").then((m) => m.default as any),
  { ssr: false }
) as any;

export default function NewPostScreen({
  folders,
  onSubmit,
  onCancel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentUser,
  enrolledUsers = [],
}: {
  folders: any[];
  onSubmit: (post: any) => void;
  onCancel: () => void;
  currentUser: any;
  enrolledUsers?: any[];
}) {
  const [type, setType] = useState<"question" | "note">("question");
  const [postTo, setPostTo] = useState<"class" | "individual">("class");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!summary.trim()) e.summary = "Summary is required.";
    if (summary.length > 100) e.summary = "Summary must be 100 characters or less.";
    if (!details.replace(/<[^>]+>/g, "").trim()) e.details = "Details are required.";
    if (selectedFolders.length === 0) e.folders = "Select at least one folder.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSubmit({
      type,
      postTo: postTo === "class" ? "class" : "individual",
      visibleTo: postTo === "individual" ? selectedUsers : [],
      folders: selectedFolders,
      summary,
      details,
      studentAnswers: [],
      instructorAnswer: null,
      followups: [],
      views: 0,
    });
  };

  const toggleFolder = (fId: string) => {
    setSelectedFolders((prev) =>
      prev.includes(fId) ? prev.filter((f) => f !== fId) : [...prev, fId]
    );
    setErrors((e) => ({ ...e, folders: "" }));
  };

  return (
    <div className="p-4" style={{ maxWidth: 700 }}>
      <h5 className="fw-semibold mb-3">New Post</h5>

      <div className="mb-3">
        <label className="form-label fw-semibold">Post Type*</label>
        <div className="d-flex gap-3">
          {(["question", "note"] as const).map((t) => (
            <div key={t} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id={`type-${t}`}
                checked={type === t}
                onChange={() => setType(t)}
              />
              <label className="form-check-label" htmlFor={`type-${t}`}>
                {t === "question"
                  ? "Question (if you need an answer)"
                  : "Note (if you don't need an answer)"}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Post To*</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input className="form-check-input" type="radio" id="postTo-class"
              checked={postTo === "class"} onChange={() => setPostTo("class")} />
            <label className="form-check-label" htmlFor="postTo-class">Entire Class</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" id="postTo-individual"
              checked={postTo === "individual"} onChange={() => setPostTo("individual")} />
            <label className="form-check-label" htmlFor="postTo-individual">
              Individual Student(s) / Instructor(s)
            </label>
          </div>
        </div>

        {postTo === "individual" && (
          <div className="mt-2">
            <div className="text-muted small mb-1">Hold Cmd/Ctrl to select multiple</div>
            <FormControl
              as="select"
              multiple
              value={selectedUsers}
              onChange={(e) => {
                const select = e.target as unknown as HTMLSelectElement;
                setSelectedUsers(Array.from(select.selectedOptions).map((o) => o.value));
              }}
              style={{ height: 120 }}
            >
              {enrolledUsers.map((u: any) => (
                <option key={u._id} value={u._id}>
                  {u.firstName} {u.lastName} ({u.role})
                </option>
              ))}
            </FormControl>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Select Folder(s)*</label>
        <div className="d-flex flex-wrap gap-2">
          {folders.map((f: any) => (
            <button key={f._id} type="button" onClick={() => toggleFolder(f._id)}
              className={`btn btn-sm ${selectedFolders.includes(f._id) ? "btn-danger" : "btn-outline-secondary"}`}>
              {f.name}
            </button>
          ))}
        </div>
        {errors.folders && <div className="text-danger small mt-1">{errors.folders}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="wd-pazza-summary" className="form-label fw-semibold">Summary*</label>
        <FormControl
          id="wd-pazza-summary"
          placeholder="Enter a one line summary, 100 characters or less"
          maxLength={100}
          value={summary}
          onChange={(e) => { setSummary(e.target.value); setErrors((er) => ({ ...er, summary: "" })); }}
        />
        {errors.summary && <div className="text-danger small mt-1">{errors.summary}</div>}
        <div className="text-muted small text-end">{summary.length}/100</div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Details*</label>
        <ReactQuill
          theme="snow"
          value={details}
          onChange={(val: SetStateAction<string>) => { setDetails(val); setErrors((er) => ({ ...er, details: "" })); }}
          style={{ minHeight: 160 }}
        />
        {errors.details && <div className="text-danger small mt-1">{errors.details}</div>}
      </div>

      <div className="d-flex gap-2 mt-5">
        <Button variant="danger" onClick={handleSubmit}>
          {type === "question" ? "Post My Question" : "Post My Note"}
        </Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
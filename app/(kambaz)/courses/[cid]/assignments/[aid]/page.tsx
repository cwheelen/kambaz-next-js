"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const isNew = aid === "new";

  const [assignment, setAssignment] = useState<any>({
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  useEffect(() => {
    if (!isNew) {
      client.findAssignmentById(aid as string).then((data) => {
        if (data) setAssignment(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aid]);

  const handleSave = async () => {
    if (isNew) {
      const created = await client.createAssignment(cid as string, {
        ...assignment,
        course: cid,
      });
      dispatch(addAssignment(created));
    } else {
      const updated = await client.updateAssignment(assignment);
      dispatch(updateAssignment(updated));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <FormControl
          as="textarea"
          rows={8}
          id="wd-description"
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-points" className="col-sm-2 col-form-label text-end">
          Points
        </label>
        <div className="col-sm-10">
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label text-end">Assign</label>
        <div className="col-sm-10 border p-3">
          <div className="mb-3">
            <label htmlFor="wd-due-date" className="form-label">
              <b>Due</b>
            </label>
            <FormControl
              id="wd-due-date"
              type="date"
              value={assignment.dueDate}
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
              }
            />
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="wd-available-from" className="form-label">
                <b>Available from</b>
              </label>
              <FormControl
                id="wd-available-from"
                type="date"
                value={assignment.availableFrom}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableFrom: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-6">
              <label htmlFor="wd-available-until" className="form-label">
                <b>Until</b>
              </label>
              <FormControl
                id="wd-available-until"
                type="date"
                value={assignment.availableUntil}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableUntil: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          className="me-2"
          id="wd-cancel-assignment-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          id="wd-save-assignment-btn"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

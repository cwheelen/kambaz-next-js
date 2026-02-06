import { Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control 
            id="wd-name" 
            defaultValue="A1 - ENV + HTML" 
          />
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control 
            as="textarea"
            id="wd-description" 
            rows={10}
            defaultValue="The assignment is available online Submit a link to the landing page of"
          />
        </div>

        <div className="row mb-3">
          <Form.Label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">
            Points
          </Form.Label>
          <div className="col-sm-9">
            <Form.Control 
              id="wd-points" 
              type="number"
              defaultValue={100} 
            />
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">
            Assignment Group
          </Form.Label>
          <div className="col-sm-9">
            <Form.Select id="wd-group">
              <option value="assignments">ASSIGNMENTS</option>
              <option value="quizzes">QUIZZES</option>
              <option value="exams">EXAMS</option>
              <option value="projects">PROJECTS</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">
            Display Grade as
          </Form.Label>
          <div className="col-sm-9">
            <Form.Select id="wd-display-grade-as">
              <option value="percentage">Percentage</option>
              <option value="points">Points</option>
              <option value="complete">Complete/Incomplete</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">
            Submission Type
          </Form.Label>
          <div className="col-sm-9">
            <div className="border rounded p-3">
              <Form.Select id="wd-submission-type" className="mb-3">
                <option value="online">Online</option>
                <option value="inperson">In Person</option>
                <option value="paper">Paper</option>
              </Form.Select>

              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check 
                type="checkbox" 
                id="wd-text-entry"
                label="Text Entry" 
              />
              <Form.Check 
                type="checkbox" 
                id="wd-website-url"
                label="Website URL" 
              />
              <Form.Check 
                type="checkbox" 
                id="wd-media-recordings"
                label="Media Recordings" 
              />
              <Form.Check 
                type="checkbox" 
                id="wd-student-annotation"
                label="Student Annotation" 
              />
              <Form.Check 
                type="checkbox" 
                id="wd-file-upload"
                label="File Uploads" 
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label className="col-sm-3 col-form-label text-end">Assign</Form.Label>
          <div className="col-sm-9">
            <div className="border rounded p-3">
              <div className="mb-3">
                <Form.Label htmlFor="wd-assign-to" className="fw-bold">Assign to</Form.Label>
                <Form.Control 
                  id="wd-assign-to" 
                  type="text"
                  defaultValue="Everyone"
                />
              </div>

              <div className="mb-3">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
                <Form.Control 
                  id="wd-due-date" 
                  type="date"
                  defaultValue="2024-05-13"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Label htmlFor="wd-available-from" className="fw-bold">
                      Available from
                    </Form.Label>
                    <Form.Control 
                      id="wd-available-from" 
                      type="date"
                      defaultValue="2024-05-06"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <Form.Label htmlFor="wd-available-until" className="fw-bold">
                      Until
                    </Form.Label>
                    <Form.Control 
                      id="wd-available-until" 
                      type="date"
                      defaultValue="2024-05-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
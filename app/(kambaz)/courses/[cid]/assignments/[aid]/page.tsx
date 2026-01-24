export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
        <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <td align="right" valign="top">
            <label htmlFor="ed-group">Assignment Group</label>
        </td>
        <td>
            <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
                <option value="quizzes">QUIZZES</option>
                <option value="exams">EXAMS</option>
                <option value="projects">PROJECTS</option>
            </select>
        </td>
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option value="percentage">Percentage</option>
                    <option value="points">Points</option>
                    <option value="complete">Complete/Incomplete</option>
                </select>
            </td>
        </tr>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option value="online">Online</option>
                    <option value="inperson">In Person</option>
                    <option value="paper">Paper</option>
                </select>
            </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label>Online Entry Options</label>
          </td>
          <td>
            <input type="checkbox" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>
            
            <input type="checkbox" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
            
            <input type="checkbox" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
            
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
            
            <input type="checkbox" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
          </td>
        </tr>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
                <input id="wd-assign-to" type="text" defaultValue="Everyone"/>
            </td>
        </tr>

        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
                <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
            </td>
        </tr>
        
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
                <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </td>
        </tr>
        </table>
        <button>cancel</button>
        <button>save</button>
    </div>
);}

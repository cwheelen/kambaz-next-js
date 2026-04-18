"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  setFolders,
  addFolder,
  updateFolder,
  deleteFolders,
} from "../reducer";
import * as client from "../client";
import { Button } from "react-bootstrap";

export default function ManageClassPage() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { folders } = useSelector((state: RootState) => state.pazzaReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [newFolderName, setNewFolderName] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // Protect route — only instructors
  useEffect(() => {
    if (
      currentUser &&
      currentUser.role !== "FACULTY" &&
      currentUser.role !== "ADMIN"
    ) {
      router.push(`/courses/${cid}/pazza`);
    }
  }, [currentUser, cid, router]);

  useEffect(() => {
    if (!cid) return;
    client.findFoldersForCourse(cid as string).then((data) => {
      dispatch(setFolders(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const handleAddFolder = async () => {
    const name = newFolderName.trim();
    if (!name) return;
    const created = await client.createFolder(cid as string, { name });
    dispatch(addFolder(created));
    setNewFolderName("");
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} folder(s)?`)) return;
    await client.deleteFolders(cid as string, selectedIds);
    dispatch(deleteFolders(selectedIds));
    setSelectedIds([]);
  };

  const handleStartEdit = (folder: any) => {
    setEditingId(folder._id);
    setEditName(folder.name);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const updated = await client.updateFolder({ _id: editingId, name: editName });
    dispatch(updateFolder(updated));
    setEditingId(null);
  };

  const handleCancelEdit = () => setEditingId(null);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4" style={{ maxWidth: 600 }}>
      <h5 className="fw-semibold mb-1">Manage Folders</h5>
      <p className="text-muted small mb-4">
        Configure the folders students and instructors can use when posting.
      </p>

      {/* Add folder */}
      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          placeholder="Add a folder..."
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAddFolder(); }}
        />
        <Button variant="danger" onClick={handleAddFolder}>
          Add Folder
        </Button>
      </div>

      {/* Folder list */}
      <div className="mb-3">
        {folders.map((f: any) => (
          <div
            key={f._id}
            className="d-flex align-items-center gap-2 border-bottom py-2"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(f._id)}
              onChange={() => toggleSelect(f._id)}
              className="form-check-input"
            />

            {editingId === f._id ? (
              <>
                <input
                  className="form-control form-control-sm"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(); }}
                  autoFocus
                />
                <Button size="sm" variant="danger" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button size="sm" variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span className="flex-fill">{f.name}</span>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => handleStartEdit(f)}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <Button variant="outline-danger" size="sm" onClick={handleDeleteSelected}>
          Delete selected folders ({selectedIds.length})
        </Button>
      )}
    </div>
  );
}
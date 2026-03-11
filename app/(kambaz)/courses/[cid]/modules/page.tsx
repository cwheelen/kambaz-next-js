"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { v4 as uuidv4 } from "uuid";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");

  const addModule = () => {
    setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  };

  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule} />
      <br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl className="w-50 d-inline-block"
                                 onChange={(e) => updateModule({ ...module, name: e.target.value })}
                                 onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                     updateModule({ ...module, editing: false });
                                   }
                                 }}
                                 defaultValue={module.name} />
                  )}
                </span>
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={deleteModule}
                  editModule={editModule} />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1 d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <span className="flex-grow-1">{lesson.name}</span>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
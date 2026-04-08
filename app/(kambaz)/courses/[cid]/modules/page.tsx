"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { setModules, editModule, updateModule } from "./reducer";
import * as client from "../../client";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");

  const fetchModules = async () => {
    const mods = await client.findModulesForCourse(cid as string);
    dispatch(setModules(mods));
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreateModule = async () => {
    const newModule = await client.createModuleForCourse(cid as string, {
      name: moduleName,
      course: cid,
    });
    dispatch(setModules([...modules, newModule]));
    setModuleName("");
  };

  const onDeleteModule = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId); // was: client.deleteModule(moduleId)
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid as string, module); // was: client.updateModule(module)
    dispatch(
      setModules(modules.map((m: any) => (m._id === module._id ? module : m))),
    );
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModule}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="flex-grow-1">
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value }),
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </span>
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={onDeleteModule}
                editModule={(id) => dispatch(editModule(id))}
              />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                  >
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

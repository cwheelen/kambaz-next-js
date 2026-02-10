import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className="fs-5 me-2" />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
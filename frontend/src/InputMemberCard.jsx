import { CustomDatePicker } from "./CustomDatePicker";
import { IoPersonRemoveOutline, IoPencil } from "react-icons/io5";

export function InputMemberCard(props) {
  return (
    <div className="memberCard addMemberCard">
      <div className="memberButtons">
        <button className="editMember" onClick={props.editOnClick}>
          <IoPencil />
        </button>

        <button className="deleteMember" onClick={props.deleteOnClick}>
          <IoPersonRemoveOutline />
        </button>
      </div>
      <input
        value={props.name}
        onChange={props.nameOnChange}
        placeholder="Tag neve"
      />
      <CustomDatePicker
        selected={props.selectedDate}
        onChange={props.dateOnChange}
      />
      <input
        value={props.club}
        onChange={props.clubOnChange}
        placeholder="Egyesület neve"
      />
      <button onClick={props.saveOnClick} className="saveMember">
        Mentés
      </button>
      {props.error && <strong>Kérjük, hogy minden mezőt adjon meg!</strong>}
    </div>
  );
}

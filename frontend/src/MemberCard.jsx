import {
    IoPersonRemoveOutline,
    IoPencil,
  } from "react-icons/io5";

export function MemberCard(props) {
    return (
        <li>
                <div className="memberCard">
                  <div className="memberButtons">
                    <button
                      className="editMember"
                      onClick={props.editOnClick}
                    >
                      <IoPencil />
                    </button>

                    <button
                      className="deleteMember"
                      onClick={props.deleteOnClick}
                    >
                      <IoPersonRemoveOutline />
                    </button>
                  </div>
                  <span className="memberId">{props.id}</span>
                  <h2>{props.name}</h2>
                  <h4>{props.clubName}</h4>
                  <h4>{props.birth}</h4>
                </div>
              </li>
    );
}

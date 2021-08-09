import axios from "axios";
import { useState, useEffect } from "react";
import { IoPersonAddOutline, IoPersonRemoveOutline, IoPencil } from "react-icons/io5";

export function Members(props) {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/api/");
    const members = data;
    setMembers(members);
  };

  useEffect(() => {
    fetchMembers();
  }, [members]);

  return (
    <div>
      <h1 id="membersTitle">Tagok</h1>
      <ul id="memberList">
        {members.map((member) => {
          return (
            <li>
              <div className="memberCard">
                <div className="memberButtons">
                <button className="editMember">
                  <IoPencil />
                </button>
                
                <button className="deleteMember">
                  <IoPersonRemoveOutline />
                </button>
                </div>
                <h2>{member.name}</h2>
                <h4>{member.clubName}</h4>
                <h4>{member.birth.replaceAll('-', '.') + '.'}</h4>
              </div>
            </li>
          );
        })}
        <li>
          <button id="newMember">
          <span id="newMemberIcon"><IoPersonAddOutline /></span><br/>
            Új Tag
          </button>
        </li>
      </ul>
    </div>
  );
}

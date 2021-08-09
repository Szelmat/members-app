import axios from "axios";
import { useState, useEffect } from "react";
import {
  IoPersonAddOutline,
  IoPersonRemoveOutline,
  IoPencil,
} from "react-icons/io5";
import { DatePicker } from "react-datepicker";

export function Members(props) {
  const [members, setMembers] = useState([]);

  // Éppen új embert adunk-e hozzá
  const [addingMember, setAddingMember] = useState(false);

  // Az új tag hozzáadáshoz szükséges mezők
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberBirth, setNewMemberBirth] = useState(Date.now());
  const [newMemberClub, setNewMemberClub] = useState('');

  // Másodpercentként beolvassuk az új értékeket a listába
  useEffect(() => {
    // A kezdeti érték beolvasása betöltéskor
    fetchMembers();

    setInterval(() => {
      fetchMembers();
    }, 1000);
  }, []);

  const fetchMembers = async () => {
    const { data } = await axios("http://127.0.0.1:8000/api/");
    const members = data;
    setMembers(members);
  };

  function deleteMember(id) {
    fetch("http://127.0.0.1:8000/api/" + id, {
      method: "DELETE",
    });
  }

  function newMember() {
    setAddingMember(true);
  }

  return (
    <div>
      <h1 id="membersTitle">Tagok</h1>
      <ul id="memberList">
        {members.map((member) => {
          return (
            <li key={member.id}>
              <div className="memberCard">
                <div className="memberButtons">
                  <button className="editMember">
                    <IoPencil />
                  </button>

                  <button
                    className="deleteMember"
                    onClick={() => deleteMember(member.id)}
                  >
                    <IoPersonRemoveOutline />
                  </button>
                </div>
                <span className="memberId">{member.id}</span>
                <h2>{member.name}</h2>
                <h4>{member.clubName}</h4>
                <h4>{member.birth.replaceAll("-", ".") + "."}</h4>
              </div>
            </li>
          );
        })}
        {addingMember && (
          <div className="memberCard addMemberCard">
            <div className="memberButtons">
              <button className="editMember">
                <IoPencil />
              </button>

              <button className="deleteMember">
                <IoPersonRemoveOutline />
              </button>
            </div>
            <input value={newMemberName} />
            <DatePicker selected={newMemberBirth} onChange={(date) => setNewMemberBirth(date)} />
            <input value={newMemberClub} />
            <button onClick={() => {
              setAddingMember(false);
              setNewMemberName('');
              setNewMemberBirth(Date.now());
              setNewMemberClub('');
            }} class="saveMember">Mentés</button>
          </div>
        )}

        <li>
          <button id="newMember" onClick={newMember}>
            <span id="newMemberIcon">
              <IoPersonAddOutline />
            </span>
            <br />
            Új Tag
          </button>
        </li>
      </ul>
    </div>
  );
}

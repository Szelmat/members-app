import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  IoPersonAddOutline,
  IoPersonRemoveOutline,
  IoPencil,
} from "react-icons/io5";
import DatePicker, { registerLocale } from "react-datepicker";
import hu from "date-fns/locale/hu";

import "react-datepicker/dist/react-datepicker.css";

export function Members(props) {
  registerLocale("hu", hu);

  const [members, setMembers] = useState([]);

  // Éppen új embert adunk-e hozzá
  const [addingMember, setAddingMember] = useState(false);

  // Az új tag hozzáadásához szükséges mezők
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberBirth, setNewMemberBirth] = useState(new Date());
  const [newMemberClub, setNewMemberClub] = useState("");

  // 5 másodpercentként beolvassuk az új értékeket a listába
  useEffect(() => {
    // A kezdeti érték beolvasása betöltéskor
    fetchMembers();

    setInterval(() => {
      fetchMembers();
    }, 5000);
  }, []);

  // A beolvasó interval törlése, ha eltűnik a komponens
  useEffect(() => {
    return () => {
      clearInterval(() => {
        fetchMembers();
      }, 1000);
    };
  }, []);

  const fetchMembers = async () => {
    const { data } = await axios("http://127.0.0.1:8000/api/");
    const members = data;
    setMembers(members);
  };

  function deleteMember(id) {
    axios.delete("http://127.0.0.1:8000/api/" + id);
    fetchMembers();
  }

  function newMember() {
    setAddingMember(true);
  }

  function saveMember() {
    console.log(formatDate(newMemberBirth));
    axios
    .post("http://127.0.0.1:8000/api/", {
      name: newMemberName,
      birth: formatDate(newMemberBirth),
      clubName: newMemberClub,
    })
    .catch(function (error) {
      // Itt mindig 500-as hibakód lesz a válaszérték,
      // de az adatok mentésre kerültek
      console.log(error);
    });

    fetchMembers();
    setAddingMember(false);
    clearNewMemberFields();
  }

  // A dátum adat megformázása küldésre alkalmas formára
  function formatDate(date) {
    let datestr = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
    return datestr;
  }

  // Kiürítjük az új tag hozzáadásához szükséges mezőket,
  // hogy legközelebb 'tiszta lappal induljunk'
  function clearNewMemberFields() {
    setNewMemberName("");
    setNewMemberBirth(new Date());
    setNewMemberClub("");
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

              <button
                className="deleteMember"
                onClick={() => {
                  setAddingMember(false);
                  clearNewMemberFields();
                }}
              >
                <IoPersonRemoveOutline />
              </button>
            </div>
            <input
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Tag neve"
            />
            <DatePicker
              selected={newMemberBirth}
              onChange={(date) => setNewMemberBirth(date)}
              dropdownMode="select"
              dateFormat="yyyy.MM.dd."
              todayButton="Ma"
              closeOnScroll={true}
              locale="hu"
              showMonthDropdown
              showYearDropdown
              disabledKeyboardNavigation
            />
            <input
              value={newMemberClub}
              onChange={(e) => setNewMemberClub(e.target.value)}
              placeholder="Egyesület neve"
            />
            <button
              onClick={() => saveMember()}
              className="saveMember"
            >
              Mentés
            </button>
          </div>
        )}

        { !addingMember && (<li>
          <button id="newMember" onClick={newMember}>
            <span id="newMemberIcon">
              <IoPersonAddOutline />
            </span>
            <br />
            Új Tag
          </button>
        </li>
        )}
      </ul>
    </div>
  );
}

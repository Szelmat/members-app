import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  IoPersonAddOutline,
  IoPersonRemoveOutline,
  IoPencil,
} from "react-icons/io5";
import { CustomDatePicker } from "./CustomDatePicker";

export function Members(props) {
  const [members, setMembers] = useState([]);

  // Az új tag hozzáadásához szükséges mezők
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberBirth, setNewMemberBirth] = useState(new Date());
  const [newMemberClub, setNewMemberClub] = useState("");
  // Éppen új tagot adunk-e hozzá
  const [addingMember, setAddingMember] = useState(false);
  // Ha nem adtunk meg elég adatot a hozzáadáskor, hibát jelzünk
  const [newMemberError, setNewMemberError] = useState(false);

  // Adott tag szerkesztéséhez szükséges mezők
  const [editMemberId, setEditMemberId] = useState(0);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberBirth, setEditMemberBirth] = useState(new Date());
  const [editMemberClub, setEditMemberClub] = useState("");
  // Ha nem adtunk meg elég adatot a szerkesztéskor, hibát jelzünk
  const [editMemberError, setEditMemberError] = useState(false);

  // 5 másodpercentként beolvassuk az új értékeket a listába
  useEffect(() => {
    // A kezdeti érték beolvasása betöltéskor
    fetchMembers();

    setInterval(() => {
      fetchMembers();
    }, 3000);
  }, []);

  // A beolvasó interval törlése, ha eltűnik a komponens
  useEffect(() => {
    return () => {
      clearInterval(() => {
        fetchMembers();
      }, 3000);
    };
  }, []);

  const fetchMembers = async () => {
    const { data } = await axios("http://127.0.0.1:8000/api/");
    const fetchedMembers = data;
    setMembers(fetchedMembers);
  };

  function deleteMember(id) {
    axios.delete("http://127.0.0.1:8000/api/" + id);
    fetchMembers();
  }

  function newMember() {
    setAddingMember(true);
  }

  function saveNewMember() {
    if (newMemberName !== "" && newMemberClub !== "" && newMemberBirth !== "") {
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
      setNewMemberError(false);
      fetchMembers();
      setAddingMember(false);
      clearNewMemberFields();
    } else {
      setNewMemberError(true);
    }
  }

  // A dátum adat megformázása küldésre alkalmas formára
  function formatDate(date) {
    let datestr =
      date.getFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();
    return datestr;
  }

  // Kiürítjük az új tag hozzáadásához szükséges mezőket,
  // hogy legközelebb 'tiszta lappal induljunk'
  function clearNewMemberFields() {
    setNewMemberName("");
    setNewMemberBirth(new Date());
    setNewMemberClub("");
  }

  function editMember(id) {
    // Megkeressük az épp szerkesztendő tagot és bekérjük az adatait
    setEditMemberId(id);
    const currMember = members.find((member) => member.id === id);
    setEditMemberName(currMember.name);
    setEditMemberBirth(currMember.birth);
    setEditMemberClub(currMember.clubName);
  }

  // A szerkesztett tag módosított adatainak elmentése
  function saveEditMember() {
    if (
      editMemberName !== "" &&
      editMemberClub !== "" &&
      editMemberBirth !== ""
    ) {
      axios
        .patch("http://127.0.0.1:8000/api/" + editMemberId + "/", {
          name: editMemberName,
          birth: formatDate(new Date(editMemberBirth)),
          clubName: editMemberClub,
        })
        .catch(function (error) {
          console.log(error);
        });
      setEditMemberError(false);
      fetchMembers();
      setEditMemberId(0);
    } else {
      setEditMemberError(true);
    }
  }

  return (
    <div>
      <h1 id="membersTitle">Tagok</h1>
      <ul id="memberList">
        {members.map((member) => {
          if (editMemberId !== member.id) {
            return (
              <li key={member.id}>
                <div className="memberCard">
                  <div className="memberButtons">
                    <button
                      className="editMember"
                      onClick={() => editMember(member.id)}
                    >
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
          } else {
            return (
              <div className="memberCard addMemberCard" key="editMemberId">
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
                  value={editMemberName}
                  onChange={(e) => setEditMemberName(e.target.value)}
                  placeholder="Tag neve"
                />
                <CustomDatePicker
                  selected={new Date(editMemberBirth)}
                  onChange={(date) => setEditMemberBirth(date)}
                />
                <input
                  value={editMemberClub}
                  onChange={(e) => setEditMemberClub(e.target.value)}
                  placeholder="Egyesület neve"
                />
                <button onClick={() => saveEditMember()} className="saveMember">
                  Mentés
                </button>
                {editMemberError && (
                  <strong>Kérjük, hogy minden mezőt adjon meg!</strong>
                )}
              </div>
            );
          }
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
            <CustomDatePicker
              selected={newMemberBirth}
              onChange={(date) => setNewMemberBirth(date)}
            />
            <input
              value={newMemberClub}
              onChange={(e) => setNewMemberClub(e.target.value)}
              placeholder="Egyesület neve"
            />
            <button onClick={() => saveNewMember()} className="saveMember">
              Mentés
            </button>
            {newMemberError && (
              <strong>Kérjük, hogy minden mezőt adjon meg!</strong>
            )}
          </div>
        )}

        {!addingMember && (
          <li>
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

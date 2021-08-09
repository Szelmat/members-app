import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { MemberCard } from "./MemberCard";
import { InputMemberCard } from "./InputMemberCard";

export function Members(props) {
  const [members, setMembers] = useState([]);

  // Az API-al történő kommunikáció jelzése
  const [loading, setLoading] = useState(false);

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
    setLoading(false);
  };

  function deleteMember(id) {
    setLoading(true);
    axios.delete("http://127.0.0.1:8000/api/" + id);
    fetchMembers();
  }

  function newMember() {
    setAddingMember(true);
    setEditMemberId(0);
  }

  function saveNewMember() {
    if (newMemberName && newMemberClub && newMemberBirth) {
      setLoading(true);
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
    setAddingMember(false);
    setEditMemberError(false);
    setEditMemberId(id);
    const currMember = members.find((member) => member.id === id);
    setEditMemberName(currMember.name);
    setEditMemberBirth(currMember.birth);
    setEditMemberClub(currMember.clubName);
  }

  // A szerkesztett tag módosított adatainak elmentése
  function saveEditMember() {
    if (editMemberName && editMemberClub && editMemberBirth) {
      setLoading(true);
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
              <MemberCard
                key={member.id}
                editOnClick={() => editMember(member.id)}
                deleteOnClick={() => deleteMember(member.id)}
                id={member.id}
                name={member.name}
                clubName={member.clubName}
                birth={member.birth.replaceAll("-", ".") + "."}
              />
            );
          } else {
            return (
              <InputMemberCard
                key={editMemberId}
                deleteOnClick={() => {
                  deleteMember(editMemberId);
                  setEditMemberId(0);
                }}
                editOnClick={() => {}}
                name={editMemberName}
                nameOnChange={(e) => setEditMemberName(e.target.value)}
                selectedDate={new Date(editMemberBirth)}
                dateOnChange={(date) => setEditMemberBirth(date)}
                club={editMemberClub}
                clubOnChange={(e) => setEditMemberClub(e.target.value)}
                saveOnClick={() => saveEditMember()}
                error={editMemberError}
              />
            );
          }
        })}
        {addingMember && (
          <InputMemberCard
            key={editMemberId}
            deleteOnClick={() => {
              setAddingMember(false);
              clearNewMemberFields();
              setNewMemberError(false);
            }}
            editOnClick={() => {}}
            name={newMemberName}
            nameOnChange={(e) => setNewMemberName(e.target.value)}
            selectedDate={new Date(newMemberBirth)}
            dateOnChange={(date) => setNewMemberBirth(date)}
            club={newMemberClub}
            clubOnChange={(e) => setNewMemberClub(e.target.value)}
            saveOnClick={() => saveNewMember()}
            error={newMemberError}
          />
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
      {loading && <img className="loading" alt="loading" src={process.env.PUBLIC_URL + '/spinner.gif'} />}
    </div>
  );
}

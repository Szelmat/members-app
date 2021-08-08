import axios from "axios";
import { useState, useEffect } from "react";

export function Members(props) {
  const [members] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(function (response) {
      response.data.map((member) => members.push(member));
      console.log(members);
    });
  }, [members]);

  return (
    <div>
      {/* <h1>Tagok</h1> */}
      <ul id="memberList">
        {members.map((member) => {
          return (
            <li>
              <div className="memberCard">
                <h2>{member.name}</h2>
                <h4>{member.clubName}</h4>
                <h4>{member.birth}</h4>
              </div>
            </li>
          );
        })}
        <li>
          <button id="newMember">
            +<br/>
            Új Tag
          </button>
        </li>
      </ul>
    </div>
  );
}

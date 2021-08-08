import axios from "axios";
import { useState, useEffect } from "react";

export function Members(props) {
  const [members, setMembers] = useState();
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(function (response) {
      console.log(response);
    });
  }, [members]);

  return <div></div>;
}

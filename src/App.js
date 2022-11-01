import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const URL = "https://jsonplaceholder.typicode.com/users";
  const fetchUsersData = async (api) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(api);
      const data = await response.json();
      console.log(data);
      setUsers(data);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (response.status === 404) {
        throw new Error("data not found");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError({
        status: true,
        msg: error.message || "something not found, pls try after sometime"
      });
    }
  };
  useEffect(() => {
    fetchUsersData(URL);
  }, []);
  if (loading) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}> LOADING....! </h3>
      </div>
    );
  }
  if (isError?.status) {
    return (
      <div>
        <h3 style={{ color: "red", textAlign: "center" }}> {isError?.msg} </h3>
      </div>
    );
  }
  return (
    <div className="App">
      <h3> an api example </h3>
      {users.map((user) => {
        const { id, username } = user;
        return (
          <div key={id}>
            <p> {username} </p>
          </div>
        );
      })}
    </div>
  );
}

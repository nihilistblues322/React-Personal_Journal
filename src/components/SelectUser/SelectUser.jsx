import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function SelectUser({ changeUser }) {

    const { userId } = useContext(UserContext);
    const changeUser = (e) => {
        changeUser(e.target.value);
    };

    return (
        <select name="user" id="user" value={userId} onChange={changeUser}>
            <option value="1">Anton</option>
            <option value="2">Vasya</option>
        </select>
    );
}   
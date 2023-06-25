import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Dash from "./Dash";
import Auth from "./Auth";

const UserData = () => {
    const { userInfo } = useContext(UserContext);
    const info = useContext(UserContext);

        const username = userInfo?.username ?? '';
    return <>
        {username && <Dash {...info}/>}
        {!username && <Auth/>}
    </>;
};

export default UserData;

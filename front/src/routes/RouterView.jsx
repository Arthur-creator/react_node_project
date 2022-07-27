import {useRole, hasPermission} from "../components/utils/Permission";
import {PERMISSIONS} from "../utils/permissions-map";
import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../components/provider/AuthProvider";

export default function RouterView({children, scopes = []}) {
    const { user, setUser } = useContext(UserContext);
    const role = useRole(user);
    if (scopes.length) {
        const permissions = PERMISSIONS[role];
        const permissionGranted = hasPermission({permissions, scopes});
        if (!permissionGranted) {
            console.log("Permission denied");
        }
    }
    return (
        <>{children}</>
    );
}
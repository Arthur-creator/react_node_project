import {PERMISSIONS} from "../../utils/permissions-map";
import {useContext} from "react";
import {UserContext} from "../provider/AuthProvider";


// Custom hook that returns the role of the user
export const useRole = (user) => {
    if (user) {
        if (user.isAdmin) {
            return "ADMIN";
        }
        return "USER";
    }
    return "GUEST";
}


export const hasPermission = ({permissions, scopes}) => {
    const scopesMap = {};
    scopes.forEach((scope) => {
        scopesMap[scope] = true;
    });

    return permissions.some((permission) => scopesMap[permission]);
};

export default function Permission({children, scopes = [], deniedCallback = () => {}}) {
    const { user, setUser } = useContext(UserContext);
    const role = useRole(user);
    const permissions = PERMISSIONS[role];
    const permissionGranted = hasPermission({permissions, scopes});
    if (!permissionGranted) {
        deniedCallback()
        return <></>
    }
    return <>{children}</>;
}
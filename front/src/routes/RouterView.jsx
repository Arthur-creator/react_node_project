import {useRole, hasPermission} from "../components/utils/Permission";
import {PERMISSIONS} from "../utils/permissions-map";
import {Navigate} from "react-router-dom";

export default function RouterView({children, scopes = []}) {
    const role = useRole();
    if (scopes.length) {
        const permissions = PERMISSIONS[role];
        const permissionGranted = hasPermission({permissions, scopes});
        if (!permissionGranted) {
            return (
                <Navigate to="/login" />
            )
        }
    }
    return (
        <>{children}</>
    );
}
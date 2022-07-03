import {useEffect, useState} from "react";
import {PERMISSIONS} from "../../utils/permissions-map";

function useGetRole() {
    const [role, setRole] = useState('GUEST');
    useEffect(() => {
        // imaging getting the role from the JWT
        console.log('test')
        return setRole('ADMIN')
    });
    return role;
}

const hasPermission = ({permissions, scopes}) => {
    const scopesMap = {};
    scopes.forEach((scope) => {
        scopesMap[scope] = true;
    });

    return permissions.some((permission) => scopesMap[permission]);
};

export default function Permission({children, scopes = [], deniedCallback = () => {}}) {
    const role = useGetRole();
    console.log(role)
    const permissions = PERMISSIONS[role];
    const permissionGranted = hasPermission({permissions, scopes});
    if (!permissionGranted) {
        deniedCallback()
        return <></>
    }
    return <>{children}</>;
}
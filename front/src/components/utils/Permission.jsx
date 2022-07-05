import {useEffect, useState} from "react";
import {PERMISSIONS} from "../../utils/permissions-map";

// Custom hook that returns the role of the user
export const useRole = () => {
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
    const role = useRole();
    const permissions = PERMISSIONS[role];
    const permissionGranted = hasPermission({permissions, scopes});
    if (!permissionGranted) {
        deniedCallback()
        return <></>
    }
    return <>{children}</>;
}
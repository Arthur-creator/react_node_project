export const ROLES = {
    guest: "GUEST",
    user: "USER",
    editor: "EDITOR",
    admin: "ADMIN"
};

export const SCOPES = {
    canCreate: "can-create",
    canEdit: "can-edit",
    canDelete: "can-delete",
    canView: "can-view"
};

export const PERMISSIONS = {
    [ROLES.guest]: [],
    [ROLES.user]: [SCOPES.canView],
    [ROLES.editor]: [SCOPES.canView, SCOPES.canEdit],
    [ROLES.admin]: [
        SCOPES.canView,
        SCOPES.canEdit,
        SCOPES.canCreate,
        SCOPES.canDelete
    ]
};
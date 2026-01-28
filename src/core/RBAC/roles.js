import { permissions } from '../RBAC/permissions.js';
export const rolePermissions = {
    ADMIN: [
        permissions.CREATE_POST,
        permissions.EDIT_POST,
        permissions.DELETE_POST,
        permissions.VIEW_POST,
        permissions.EDIT_OWN_COMMENT,
        permissions.DELETE_OWN_COMMENT,
        permissions.EDIT_OWN_POST,
        permissions.DELETE_OWN_POST,
        permissions.CREATE_USER,
        permissions.EDIT_USER,
        permissions.DELETE_USER,
        permissions.VIEW_USER,
        permissions.CREATE_COMMENT,
        permissions.EDIT_COMMENT,
        permissions.DELETE_COMMENT,
        permissions.VIEW_COMMENT,
        permissions.EDIT_ROLE,
        permissions.UPDATE_USER_ROLE,
        permissions.CREATE_USER
    ],
    USER: [
        permissions.VIEW_POST,
        permissions.CREATE_COMMENT,
        permissions.EDIT_OWN_COMMENT,
        permissions.DELETE_OWN_COMMENT,
        permissions.EDIT_OWN_POST,
        permissions.DELETE_OWN_POST,
        permissions.VIEW_COMMENT,
        permissions.VIEW_USER,
        permissions.CREATE_COMMENT
    ],
    EDITOR: [
        permissions.CREATE_POST,
        permissions.EDIT_POST,
        permissions.DELETE_POST,
        permissions.VIEW_POST,
        permissions.CREATE_COMMENT,
        permissions.EDIT_COMMENT,
        permissions.DELETE_OWN_COMMENT,
        permissions.EDIT_OWN_POST,
        permissions.DELETE_OWN_POST,
        permissions.VIEW_COMMENT,
        permissions.DELETE_COMMENT,
        permissions.VIEW_COMMENT
    ]
}
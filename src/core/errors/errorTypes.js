import { COMMAND_LIST_FILTER_BY } from "redis";

export const ERROR_TYPE = {
    VALIDATION: 'VALIDATION',
    INFRA: 'INFRA',
    AUTH: 'AUTH',
    NOT_FOUND: 'NOT_FOUND',
    BUG: 'BUG',
    CONFLICT: 'CONFLICT',
}
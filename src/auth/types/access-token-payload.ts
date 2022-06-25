import { AccountTypes } from '@common/types/account-types';

export type AccessTokenPayload = {
    owner_id: string;
    nickname: string;
    accountType: AccountTypes;
};

import { FC } from 'react';
import { AuthRequestConfig } from 'expo-auth-session/src/AuthRequest.types';
export interface IKeycloakConfiguration extends Partial<AuthRequestConfig> {
    clientId: string;
    disableAutoRefresh?: boolean;
    nativeRedirectPath?: string;
    realm: string;
    refreshTimeBuffer?: number;
    scheme?: string;
    tokenStorageKey?: string;
    url: string;
}
export declare const KeycloakProvider: FC<IKeycloakConfiguration>;

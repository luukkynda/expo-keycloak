import { AuthRequestConfig, AuthSessionResult, DiscoveryDocument, TokenResponse } from 'expo-auth-session';
export interface IHandleTokenExchange {
    response: AuthSessionResult | null;
    discovery: DiscoveryDocument | null;
    config: AuthRequestConfig;
}
export declare const handleTokenExchange: ({ response, discovery, config, }: IHandleTokenExchange) => Promise<{
    tokens: TokenResponse;
} | null>;

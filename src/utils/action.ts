export const getSdkOauthAction = (provider: string) => ({ name: 'sdk_oauth', params: { oauth: provider } });

export const encodeSdkOauthAction = (provider: string): string => btoa(JSON.stringify(getSdkOauthAction(provider)));


export default interface IAuthState {
    username: string | null;
    _id: string | null;
    isAdmin: boolean;
    access_token: string | null;
    refresh_token: string | null;
}
import { jwtDecode } from "jwt-decode";

export default (jwt: string | undefined | null) => {
    try {
        jwtDecode(jwt || "");
        return true;
    }
    catch(error) { return false; }
}
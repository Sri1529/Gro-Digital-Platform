import api from "./index";


export function LoginService(data) {
  return api.post("/api/v1/login", data);
}

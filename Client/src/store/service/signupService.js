import api from "./index";


export function SignupService(data) {
  return api.post("/api/v1/signup", data);
}

import api from "./index";

export function ValidateTokenService() {
  return api.get("/api/v1/validate-token");
}

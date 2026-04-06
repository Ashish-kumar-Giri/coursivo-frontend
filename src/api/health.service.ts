import { api } from "./http";

export const healthService = {
  checkHealth: async () => {
    // We expect the endpoint to be /api/health not /api/health/health if base is /api/
    // But api wrapper adds base URL. Let's check BASE URL in http.ts
    // BASE is http://localhost:8080/api/
    // So if we request "health" it becomes "http://localhost:8080/api/health" which is correct
    return api.get<{ status: string }>("health");
  },
};

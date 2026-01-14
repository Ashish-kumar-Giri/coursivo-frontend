import { api } from "./http"
import type { Course } from "@/types/course.types"

export const courseService = {
  // Get all public courses
  getPublicCourses: (): Promise<Course[]> => {
    return api.get<Course[]>("courses")
  },

  // Get course by ID
  getCourseById: (id: number): Promise<Course> => {
    return api.get<Course>(`courses/${id}`)
  },
}

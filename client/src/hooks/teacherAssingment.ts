import { api } from "../utils/api";

interface ITeacherAssignment {
    school_year_id: string,
    section_id: string,
    subject_id: string,
    teacher_id: string
}

export const assingTeacher = async ({school_year_id, section_id, subject_id, teacher_id}: ITeacherAssignment) => {
    const response = await fetch(`${api}/teacherassignment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
        , body: JSON.stringify({ school_year_id, section_id, subject_id, teacher_id })
    });

    // check if the content type is application/json... meaning it will not show an html error page
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
    }

    const data = await response.json(); ho

    if (!response.ok) {
        throw data;
    }
    return data;
}

interface IGetTeachingClass {
    search_text: string,
    school_year_id: string,
    subject_id: string,
}

export const getAllAssignTeacher = async ({search_text, school_year_id,subject_id} : IGetTeachingClass) => {
  const params = new URLSearchParams();

  if(search_text){
    params.append("search_text", search_text)
  }
  if(school_year_id){
    params.append("school_year_id", school_year_id)
  }
   if(subject_id){
    params.append("subject_id", subject_id)
  }

  const response = await fetch(`${api}/teacherassignment?${params.toString()}`,{
    method: "GET",
    credentials: "includes",
  });

  const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }
    return data;
  
}
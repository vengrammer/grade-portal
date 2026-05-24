
export type SectionType = {
    _id: number;
    name: string;
    grade_level_id: string;
    createdAt: string;
    updatedAt: string;
    grade_level?: {
        _id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }
}
import { ICategory } from "./Category";
import { ITag } from "./Tag";

export interface IArticle {
    id: number;
    user_id: number;
    name: string;
    content: string;
    excerpt: string;
    image: string | null;
    created_at: Date;
    updated_at: Date;
    categories: ICategory[];
    tags: ITag[];
    files: any[];
}
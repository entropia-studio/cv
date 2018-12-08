import { Language } from './language';

export interface Project {
    _id: string;
    name: Language[];
    description: Language[];
    technologies: Array<string>;
    types: Array<string>; //Backend, Frontend    
    url: string;
    url_code?: string;
}



export interface Project {
    name: Language[];
    description: Language[];
    tecnologies: Array<string>;
    type: Array<string>; //Backend, Frontend    
    url: string;
    url_code?: string;
}

interface Language{
    name: string;
    text: string;
}

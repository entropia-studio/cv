import { Language } from './language';
export interface About {    
    head: Language[];
    paragraph: Language[];    
    skills: Array<Skill>;
}

interface Skill {
    name: string,
    percent: number
}
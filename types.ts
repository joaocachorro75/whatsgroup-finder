
export interface WhatsAppGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: string;
  tags: string[];
  inviteLink: string;
  language: string;
}

export type Category = 
  | 'Tecnologia' 
  | 'Educação' 
  | 'Saúde & Fitness' 
  | 'Jogos' 
  | 'Negócios' 
  | 'Entretenimento' 
  | 'Culinária' 
  | 'Viagens';

export interface SearchFilters {
  query: string;
  category?: Category;
}

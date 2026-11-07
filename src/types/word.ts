export interface Word {
  id: string;       
  word: string;     
  image: string;    
  bgColor: string;  
  meaning: string;  
}

export interface CollectedCard {
  wordId: string;     
  collectedAt: string; 
  isNew: boolean;      
  reviewed: boolean;   
}
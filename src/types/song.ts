// 노래 안에서 단어 하나를 부르는 구간
export interface SongVerse {
  wordId: string;   
  lyric: string;    
  caption: string;  
  startSec: number;
}

// 아이가 만든 노래 한 곡
export interface Song {
  id: string;
  title: string;   
  durationSec: number;  
  verses: SongVerse[];  
  audioUrl?: string;    
}
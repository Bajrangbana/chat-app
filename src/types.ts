// src/types.ts
export interface Message {
    id: string;
    name: string;
    user: string;
    timestamp: string;
    content: string;
  }
  
  export interface Chat {
    id: string;
    name: string;
    messages: Message[];
  }

import { GoogleGenAI, Type } from "@google/genai";
import { WhatsAppGroup } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchGroups = async (query: string, category?: string): Promise<WhatsAppGroup[]> => {
  const prompt = `Atue como um diretório exaustivo e inteligente de grupos de WhatsApp. 
    Sua tarefa é encontrar ou listar grupos que realmente existem ou são extremamente populares e ativos baseados na busca: "${query}" ${category ? `na categoria ${category}` : ''}.
    
    INSTRUÇÕES IMPORTANTES:
    1. Retorne uma lista robusta com EXATAMENTE 20 grupos diferentes. Não retorne menos que 15.
    2. Garanta que os grupos sejam variados dentro do tema.
    3. Para os links de convite, utilize IDs de convite realistas no formato 'https://chat.whatsapp.com/L2k...'.
    4. Descrições devem ser detalhadas e convidativas.
    5. O idioma deve ser prioritariamente Português (Brasil).
    
    Retorne os dados estritamente em formato JSON seguindo o esquema fornecido.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              memberCount: { type: Type.STRING },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              inviteLink: { type: Type.STRING },
              language: { type: Type.STRING }
            },
            required: ["id", "name", "description", "category", "inviteLink", "tags"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Erro ao buscar grupos via Gemini:", error);
    return [];
  }
};

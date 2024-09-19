import { Schema, model, Document } from 'mongoose';

// Definição de interface para Unidade
export interface IUnidade extends Document {
  nomeUnidade: string;
  idade: string;
  genero: string;
  responsavel: string;
  conselheiros: string[];
  auxiliares: string[];
}

// Esquema para Unidade
const UnidadeSchema = new Schema<IUnidade>({
  nomeUnidade: { type: String, required: true },
  idade: { type: String, required: true },
  genero: { type: String, required: true },
  responsavel: { type: String, required: true },
  conselheiros: { type: [String], required: true },
  auxiliares: { type: [String], required: false },
}, {
  timestamps: true,  // Adiciona campos `createdAt` e `updatedAt`
});

// Exportar o modelo da Unidade
export default model<IUnidade>('Unidade', UnidadeSchema);

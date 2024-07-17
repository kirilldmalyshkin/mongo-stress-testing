import { Document } from 'mongoose';

export interface Item extends Document {
  readonly name: string;
}

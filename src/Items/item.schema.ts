import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  name: { type: String, required: true },
});

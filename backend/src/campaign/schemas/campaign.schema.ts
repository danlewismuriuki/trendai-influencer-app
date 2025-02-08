// import { Schema, Document } from 'mongoose';

// export interface ICampaign extends Document {
//   title: string;
//   description: string;
//   instructions: string;
//   status: 'pending' | 'ongoing' | 'completed';
//   deadline: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export const CampaignSchema = new Schema<ICampaign>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     instructions: { type: String, required: true },
//     status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
//     deadline: { type: Date, required: true },
//   },
//   { timestamps: true }
// );


import { Schema, Document, model } from 'mongoose';

export interface ISubmission {
  influencerId: string;
  contentUrl: string; 
  submittedAt: Date;
}

export interface ICampaign extends Document {
  title: string;
  description: string;
  instructions: string;
  status: 'pending' | 'ongoing' | 'completed';
  deadline: Date;
  submissions: ISubmission[];
  createdAt: Date;
  updatedAt: Date;
}

export const CampaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
    deadline: { type: Date, required: true },
    submissions: [
      {
        influencerId: { type: String, required: true },
        contentUrl: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Campaign = model<ICampaign>('Campaign', CampaignSchema);

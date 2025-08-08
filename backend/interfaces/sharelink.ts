import mongoose from "mongoose";

export interface PopulatedLink {
    _id: mongoose.Types.ObjectId | undefined | null;
    hash: string;
    contentId: {
      _id: mongoose.Types.ObjectId | undefined | null;
      link: string;
      type: string;
      title: string;
      tags: string;
    };
    userId: {
      _id: mongoose.Types.ObjectId | undefined | null;
      username: string;
    };
    type: string;
    createdAt: Date;
  }
  
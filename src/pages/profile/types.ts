export type ProfileUser = {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
};

export type ProfileRatings = {
  id: string;
  bookId: string;
  created_at: string;
  cover_url: string;
  name: string;
  author: string;
  rate: number;
  description: string;
};

export type ProfileInfo = {
  readPages: number;
  ratedBooks: number;
  readAuthors: number;
  mostReadCategory: number;
};

export type ProfileData = {
  user: ProfileUser;
  ratings: ProfileRatings[];
  info: ProfileInfo;
};

type ClipsSearchResponse = {
  authors: {
    username: string;
  }[];
  clips: {
    title: string;
    author_id: number;
    num_views: string;
  }[];
};

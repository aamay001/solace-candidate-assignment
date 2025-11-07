interface Settings {
  database: {
    url: string | null;
  };
};

const settings: Settings = {
  database: {
    url: process.env.DATABASE_URL || null,
  },
};

export default settings;
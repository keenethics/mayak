import { dataProvider } from 'ra-data-simple-prisma';

const config = {
  apiUrl: '/api/admin',
};

const dp = dataProvider(config.apiUrl);

export default dp;

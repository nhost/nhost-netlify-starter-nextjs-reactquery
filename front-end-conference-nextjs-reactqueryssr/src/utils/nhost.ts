import { NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: 'localhost:1337',
});

export { nhost };

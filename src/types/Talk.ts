import { Key } from 'react';
import { Speaker } from './Speaker';

export type Talk = {
  key: Key;
  id: string;
  name: string;
  speaker: Speaker;
  start_date: string;
  end_date: string;
};

import * as migration_20250322_091522 from './20250322_091522';

export const migrations = [
  {
    up: migration_20250322_091522.up,
    down: migration_20250322_091522.down,
    name: '20250322_091522'
  },
];

/* eslint-disable no-var */
import type { Connection } from 'mongoose';

declare global {
  var db: Connection | undefined;
}

/* eslint-disable no-var */
import type { Connection } from 'mongoose';
import React from 'react';

declare global {
  var db: Connection | undefined;

  declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
    ? Props extends object
      ? Props
      : never
    : never;
}

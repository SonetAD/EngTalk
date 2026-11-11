import type { EventArg, NavigationAction } from '@react-navigation/native';

/** Event passed to a React Navigation `beforeRemove` listener. */
export type BeforeRemoveEvent = EventArg<
  'beforeRemove',
  true,
  { action: NavigationAction }
>;

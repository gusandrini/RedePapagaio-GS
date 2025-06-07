import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export function reset(name: string) {
  if (navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{ name }],
    });
  }
}

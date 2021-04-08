/*
 *
 * AppC actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const drawer = (drawer: boolean) => action(ActionTypes.DRAWER, drawer);

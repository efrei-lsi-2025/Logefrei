import { TSchema, TRef } from '@sinclair/typebox';
import { t } from 'elysia';

export const ParametrizedRef = <T extends TSchema>(ref: string): TRef<T> => t.Ref(ref);

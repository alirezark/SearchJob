import { ApolloState } from '@/modules/core/apollo/apolloClient';
import { Customer } from '@/modules/core/data/types/Customer';
import { Session } from 'next-auth';

/**
 * Page properties available on all pages, whether they're rendered statically, dynamically, from the server or the client
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 */
export type MultiversalPageProps<E extends {} = {}> = {
  bestCountryCodes: string[];
  serializedDataset: string; // Transferred from server to browser as JSON (using Flatten.stringify), then parsed on the browser/server within the MultiversalAppBootstrap
  error?: Error; // Only defined if there was an error
  gcmsLocales: string;
  isReadyToRender: boolean;
  statusCode?: number; // Provided by Next.js framework, sometimes
  session?: Session;
} & ApolloState &
  E;

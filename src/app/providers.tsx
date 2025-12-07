// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
	isServer,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

import type { ComponentProps } from 'react'
import qs from 'query-string'
import { QueryParamProvider } from 'use-query-params'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient()
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

const QueryParamsProvider = ({
	children,
	options,
}: Partial<ComponentProps<typeof QueryParamProvider>>) => {
	return (
		<QueryParamProvider
			options={{
				removeDefaultsFromUrl: true,
				updateType: 'pushIn',
				searchStringToObject: (string) =>
					qs.parse(string, { arrayFormat: 'comma' }),
				objectToSearchString: (object) =>
					qs.stringify(object, { arrayFormat: 'comma' }),
				...options,
			}}
		>
			{children}
		</QueryParamProvider>
	)
}


export default function Providers({ children }: { children: React.ReactNode }) {
	// NOTE: Avoid useState when initializing the query client if you don't
	//       have a suspense boundary between this and the code that may
	//       suspend because React will throw away the client on the initial
	//       render if it suspends and there is no boundary
	const queryClient = getQueryClient()

	return (
		<QueryParamsProvider><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></QueryParamsProvider>
	)
}
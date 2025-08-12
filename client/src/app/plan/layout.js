'use client';

import { FormContextProvider } from '@/utils/FormContext';

export default function Layout({ children }) {
	return (
		<main>
			<FormContextProvider>{children}</FormContextProvider>
		</main>
	);
}

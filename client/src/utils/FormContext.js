'use client';

import { createContext, useContext, useState } from 'react';

export const NewFormPropertyContext = createContext({
	user: null,
	updatePropertyForm: () => null,
});

export function FormContextProvider({ children }) {
	const [user, setUser] = useState(null);

	const updateUserData = (values) => {
		setUser({ ...user, ...values });
	};

	return (
		<NewFormContext.Provider value={{ user, updateUserData }}>
			{children}
		</NewFormContext.Provider>
	);
}

export function useNewFormContext() {
	return useContext(NewFormPropertyContext);
}

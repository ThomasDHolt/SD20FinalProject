// 'use client';

// import { createContext, useContext, useState } from 'react';

// export const FormContext = createContext({
// 	user: null,
// 	updateUserData: () => null,
// });

// export function FormContextProvider({ children }) {
// 	const [user, setUser] = useState(null);

// 	const updateUserData = (values) => {
// 		setUser({ ...user, ...values });
// 	};

// 	return (
// 		<FormContext.Provider value={{ user, updateUserData }}>
// 			{children}
// 		</FormContext.Provider>
// 	);
// }

// export function useFormContext() {
// 	return useContext(FormContext);
// }

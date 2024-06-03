import {createContext, useContext, useState} from "react";
import * as React from "react";
import '../assets/css/util/alert.css';
type AlertType = 'success' | 'error' | 'warning';

interface AlertContextType {
    showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);
export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert muss innerhalb eines AlertProviders verwendet werden');
    }
    return context;
};

interface AlterProviderProps {
    children: React.ReactNode
}
export default function AlertProvider({children}: AlterProviderProps) {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<AlertType>('success');
    const showAlert = (message: string, type: AlertType) => {
        setAlertMessage(message);
        setAlertType(type);
        setIsVisible(true);

        setTimeout(() => {
            hideAlert();
        }, 5000);
    };
    const hideAlert = () => {
        setIsVisible(false);
    };

    return(
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <div className={`alert ${alertType}`} style={{ display: isVisible ? 'block' : 'none' }}>
                {alertMessage}
            </div>
        </AlertContext.Provider>
    )
}
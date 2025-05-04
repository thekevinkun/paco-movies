import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { IPreviewContext } from "@types";

const PreviewContextDefaultValues: IPreviewContext = {
    previewId: null,
    previewMediaType: "",
    open: (mediaType: string, id: number) => {},
    close: () => {},
}

const PreviewContext = createContext<IPreviewContext>(PreviewContextDefaultValues);

export const PreviewProvider = ({ children } : Readonly<{children: ReactNode;}>) => {
    const [previewId, setPreviewId] = useState<number | null>(null);
    const [previewMediaType, setPreviewMediaType] = useState<any>(null);

    // Open modal and get data
    const open = useCallback((mediaType: string, id: number) => {        
        // Get preview data
        setPreviewMediaType(mediaType);
        setPreviewId(id);
    }, []);

     // Close modal and remove hash
     const close = useCallback(() => {
        setPreviewId(null);
        setPreviewMediaType(null);
    }, []);

    return (
        <PreviewContext.Provider value={{ previewId, previewMediaType, open, close }}>
          {children}
        </PreviewContext.Provider>
    );
}

export const usePreview = () => {
    const ctx = useContext(PreviewContext);
    
    if (!ctx) throw new Error("useVideo must be used within a VideoProvider");
    
    return ctx;
};
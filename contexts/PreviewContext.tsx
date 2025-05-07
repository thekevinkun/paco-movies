import { createContext, useContext, useState, useCallback, ReactNode } from "react";

import type { IPreviewContextProps } from "@types";

const PreviewContextDefaultValues: IPreviewContextProps = {
    previewId: null,
    previewMediaType: "",
    open: (mediaType: string, id: number) => {},
    close: () => {},
}

const PreviewContext = createContext<IPreviewContextProps>(PreviewContextDefaultValues);

export const PreviewProvider = ({ children } : Readonly<{children: ReactNode;}>) => {
    const [previewId, setPreviewId] = useState<number | null>(null);
    const [previewMediaType, setPreviewMediaType] = useState<string>("");

    // Open modal and get data
    const open = useCallback((mediaType: string, id: number) => {        
        // Get preview data
        setPreviewMediaType(mediaType);
        setPreviewId(id);
    }, []);

     // Close modal and remove hash
     const close = useCallback(() => {
        setPreviewId(null);
        setPreviewMediaType("");
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
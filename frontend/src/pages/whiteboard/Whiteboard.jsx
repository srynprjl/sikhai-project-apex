import { useState, useEffect, useCallback } from 'react';
 import {
  Excalidraw,
  WelcomeScreen,
  MainMenu,
  exportToBlob,
 } from "@excalidraw/excalidraw";
import '@excalidraw/excalidraw/index.css'
import { debounce } from 'lodash';
import api from '../../api';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const getWhiteboardData = async () => {
    try {
        const response = await api.get('/api/whiteboard/');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch whiteboard data:', error);
        throw error;
    }
};

const saveWhiteboardData = async (data) => {
    try {
        const response = await api.put('/api/whiteboard/', { data });
        return response.data;
    } catch (error) {
        console.error('Failed to save whiteboard data:', error);
        throw error;
    }
};

export default function Whiteboard(){
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    const debouncedSave = useCallback(
        debounce(async (elements, appState) => {
            if (!excalidrawAPI) return;

            const dataToSave = {
                elements: elements,
                appState: {
                    zenMode: appState.zenMode,
                    viewBackgroundColor: appState.viewBackgroundColor,
                },
            };

            try {
                await saveWhiteboardData(dataToSave);
                console.log('Whiteboard saved successfully!');
            } catch (err) {
                console.error('Error saving whiteboard:', err);
            }
        }, 200),
        [excalidrawAPI]
    );

    useEffect(() => {
        const loadWhiteboard = async () => {
            try {
                const data = await getWhiteboardData();
                if (data && data.data) {
                    setInitialData(data.data);
                } else {
                    setInitialData({});
                }
            } catch (err) {
                console.error('Error loading whiteboard:', err);
                setError('Failed to load whiteboard data. Please ensure you are logged in.');
                setInitialData({});
            } finally {
                setLoading(false);
            }
        };

        loadWhiteboard();
    }, []);

    const onChange = (elements, appState, files) => {
        debouncedSave(elements, appState);
    };

    if (loading) {
        return <div className="text-center mt-12">Loading whiteboard...</div>;
    }

    if (error) {
        return <div className="text-center mt-12 text-red-500">Error: {error}</div>;
    }


    const handleExport = async (type) => {
        if (!excalidrawAPI) return;
        try {
            const blob = await exportToBlob({
                elements: excalidrawAPI.getSceneElements(),
                appState: excalidrawAPI.getAppState(),
                files: excalidrawAPI.getFiles(),
                mimeType: type === "svg" ? "image/svg+xml" : "image/png",
                quality: 1,
                exportPadding: 24,
                darkmode: appState.theme === "dark",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `sikhai.${type}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(`Error exporting to ${type.toUpperCase()}:`, error);
        }
    };

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-60px)] w-screen">
                <Excalidraw
                    initialData={initialData}
                    onChange={onChange}
                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                    theme="dark"
                >
                <WelcomeScreen>
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Heading>Welcome to Sikhai 's Whiteboard </WelcomeScreen.Center.Heading> 
                    </WelcomeScreen.Center> 
                </WelcomeScreen>

                <MainMenu>
                    <MainMenu.Item onSelect = {() => handleExport("png")} >
                        Export as PNG 
                    </MainMenu.Item> 
                    <MainMenu.Item onSelect = {() => handleExport("svg")}>
                        Export as SVG 
                    </MainMenu.Item> 
                </MainMenu>
                </Excalidraw>
            </div>
        </DashboardLayout>
    )}

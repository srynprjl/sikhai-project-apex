import {
  Excalidraw,
  WelcomeScreen,
  MainMenu,
  exportToBlob,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

export default function Whiteboard() {
  const excalidrawRef = useRef(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [elements, setElements] = useState([]);
  const [appState, setAppState] = useState({});
  const [files, setFiles] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("sikhaiWhiteboardData");
    if (savedData) {
      const { elements, appState, files } = JSON.parse(savedData);
      setElements(elements);
      setAppState(appState);
      setFiles(files);
    }
  }, []);

  const handleExcalidrawChange = useCallback((elements, appState, files) => {
    setElements(elements);
    setAppState(appState);
    setFiles(files);
    localStorage.setItem(
      "sikhaiWhiteboardData",
      JSON.stringify({
        elements,
        appState: {
          ...appState,
          viewBackgroundColor: "#FDF8EE",
          collaborators: [],
        },
        files,
      })
    );
  }, []);

  const handleExportPNG = async () => {
    if (excalidrawAPI) {
      try {
        const blob = await exportToBlob({
          elements: excalidrawAPI.getSceneElements(),
          appState: excalidrawAPI.getAppState(),
          files: files,
          mimeType: "image/png",
          quality: 1,
          exportPadding: 10,
          darkmode: appState.theme === "dark",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-excalidraw-drawing.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error exporting to PNG:", error);
      }
    }
  };

  const handleExportSVG = async () => {
    if (excalidrawAPI) {
      try {
        const blob = await exportToBlob({
          elements: excalidrawAPI.getSceneElements(),
          appState: excalidrawAPI.getAppState(),
          files: files,
          mimeType: "image/svg+xml",
          quality: 1,
          exportPadding: 10,
          darkmode: appState.theme === "dark",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-excalidraw-drawing.svg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error exporting to PNG:", error);
      }
    }
  };

  return (
    <div className="h-[89vh] excalidraw_sikhai">
      <Excalidraw
        ref={excalidrawRef}
        onChange={handleExcalidrawChange}
        initialData={{ elements, appState, files }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      >
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Heading>
              Welcome to Sikhai's Whiteboard
            </WelcomeScreen.Center.Heading>
          </WelcomeScreen.Center>
        </WelcomeScreen>

        <MainMenu>
          <MainMenu.Item onSelect={handleExportPNG}>
            Export to Desktop as PNG
          </MainMenu.Item>
          <MainMenu.Item onSelect={handleExportSVG}>
            Export to Desktop as SVG
          </MainMenu.Item>
        </MainMenu>
      </Excalidraw>
    </div>
  );
}

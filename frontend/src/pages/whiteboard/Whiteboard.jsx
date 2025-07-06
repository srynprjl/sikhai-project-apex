import {
  Excalidraw,
  WelcomeScreen,
  MainMenu,
  exportToBlob,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useState, useEffect, useRef, useCallback } from "react";
import api from "../../api";

export default function Whiteboard() {
  const excalidrawRef = useRef(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // ✅ Track data load
  const [elements, setElements] = useState([]);
  const [appState, setAppState] = useState({});
  const [files, setFiles] = useState({});

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const { data } = await api.get("/api/board/");
        const loadedElements = data.elements || [];
        const loadedAppState = data.app_state || {};
        const loadedFiles = data.files || {};

        setElements(loadedElements);
        setAppState(loadedAppState);
        setFiles(loadedFiles);
        setDataLoaded(true); // ✅ trigger update after data arrives
      } catch (error) {
        console.warn("Failed to fetch board, using localStorage fallback");

        const savedData = localStorage.getItem("sikhaiWhiteboardData");
        if (savedData) {
          const { elements, appState, files } = JSON.parse(savedData);
          setElements(elements || []);
          setAppState(appState || {});
          setFiles(files || {});
          setDataLoaded(true);
        }
      }
    };

    fetchBoard();
  }, []);

  // ✅ Update scene after data is fetched
  useEffect(() => {
    if (dataLoaded && excalidrawAPI) {
      excalidrawAPI.updateScene({
        elements,
        appState: {
          ...appState,
          viewBackgroundColor: "#FDF8EE",
        },
        files,
      });
    }
  }, [dataLoaded, excalidrawAPI]);

  const handleExcalidrawChange = useCallback(
    async (updatedElements, updatedAppState, updatedFiles) => {
      const activeElements = updatedElements.filter((el) => !el.isDeleted);

      const payload = {
        title: "Sikhai Whiteboard",
        elements: activeElements,
        app_state: {
          ...updatedAppState,
          viewBackgroundColor: "#FDF8EE",
          collaborators: [],
        },
        files: updatedFiles || {},
      };

      localStorage.setItem("sikhaiWhiteboardData", JSON.stringify(payload));

      try {
        await api.post("/api/board/", payload);
      } catch (error) {
        console.error("Failed to save board:", error);
      }

      setElements(activeElements);
      setAppState(updatedAppState);
      setFiles(updatedFiles);
    },
    []
  );

  const handleExport = async (type) => {
    if (!excalidrawAPI) return;

    try {
      const blob = await exportToBlob({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files,
        mimeType: type === "svg" ? "image/svg+xml" : "image/png",
        quality: 1,
        exportPadding: 10,
        darkmode: appState.theme === "dark",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sikhai-whiteboard.${type}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error exporting to ${type.toUpperCase()}:`, error);
    }
  };

  return (
    <div className="h-[89vh] excalidraw_sikhai">
      <Excalidraw
        ref={excalidrawRef}
        onChange={handleExcalidrawChange}
        excalidrawAPI={setExcalidrawAPI}
      >
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Heading>
              Welcome to Sikhai's Whiteboard
            </WelcomeScreen.Center.Heading>
          </WelcomeScreen.Center>
        </WelcomeScreen>

        <MainMenu>
          <MainMenu.Item onSelect={() => handleExport("png")}>
            Export as PNG
          </MainMenu.Item>
          <MainMenu.Item onSelect={() => handleExport("svg")}>
            Export as SVG
          </MainMenu.Item>
        </MainMenu>
      </Excalidraw>
    </div>
  );
}
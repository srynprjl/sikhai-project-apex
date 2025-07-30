import {
Excalidraw,
WelcomeScreen,
MainMenu,
exportToBlob,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useState, useEffect, useRef, useCallback } from "react";
import api from "../../api";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function Whiteboard() {
const excalidrawRef = useRef(null);
const [excalidrawAPI, setExcalidrawAPI] = useState(null);
const [dataLoaded, setDataLoaded] = useState(false);
const [elements, setElements] = useState([]);
const [appState, setAppState] = useState({});
const [files, setFiles] = useState({});
const [localUsage, setLocalUsage] = useState(false);


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
    setDataLoaded(true);
  } catch (error) {
    alert("Failed to fetch board, using localStorage fallback");
    const savedData = localStorage.getItem("sikhaiWhiteboardData");
    if (savedData) {
      const { elements, appState, files } = JSON.parse(savedData);
      setElements(elements || []);
      setAppState(appState || {});
      setFiles(files || {});
      setDataLoaded(true);
      setLocalUsage(true);
    }
  }
};
fetchBoard();
}, []);

useEffect(() => {
  if (dataLoaded && excalidrawAPI) {
    excalidrawAPI.updateScene({
      elements,
      appState: {
        ...appState,
        theme: "dark"
      },
      files,
    });
  }
}, [dataLoaded, excalidrawAPI]);



const handleExcalidrawChange = useCallback(
  async (updatedElements, updatedAppState, updatedFiles) => {
    const payload = {
      title: "Sikhai Whiteboard",
      elements: updatedElements,
      app_state: {
      ...updatedAppState,
      theme: "dark",
      collaborators: [],
      },
      files: updatedFiles || {},
    };
    localStorage.setItem("sikhaiWhiteboardData", JSON.stringify(payload));
    if (!localUsage) {
      try {
        await api.post("/api/board/", payload);
      } catch (error) {
        console.error("Failed to save board:", error);
      }
    }
    setElements(updatedElements);
    setAppState(updatedAppState);
    setFiles(updatedFiles);
  }, []);

const handleExport = async (type) => {
  if (!excalidrawAPI) return;
  try {
    const blob = await exportToBlob({
    elements: excalidrawAPI.getSceneElements(),
    appState: excalidrawAPI.getAppState(),
    files,
    mimeType: type === "svg" ? "image/svg+xml" : "image/png",
    quality: 1,
    exportPadding: 24,
    darkmode: appState.theme === "dark", });
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
  <div className="h-[89vh] w-full custom-styles">
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

</DashboardLayout>

);

}

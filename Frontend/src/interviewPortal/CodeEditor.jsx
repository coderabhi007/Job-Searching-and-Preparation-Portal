import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import socket from "./socket.js";
import { useParams } from "react-router-dom";
// Replace dynamically if needed

const languages = {
  python: { id: 71, label: "Python", value: "python", defaultCode: 'print("Hello, Python!")' },
  c: { id: 50, label: "C", value: "c", defaultCode: '#include <stdio.h>\nint main() { printf("Hello, C!"); return 0; }' },
  cpp: { id: 54, label: "C++", value: "cpp", defaultCode: '#include <iostream>\nint main() { std::cout << "Hello, C++!"; return 0; }' },
  javascript: { id: 63, label: "JavaScript", value: "javascript", defaultCode: 'console.log("Hello, JavaScript!");' },
  java: { id: 62, label: "Java", value: "java", defaultCode: 'public class Main { public static void main(String[] args) { System.out.println("Hello, Java!"); } }' },
};

const CodeEditor = () => {
  const { interviweID } = useParams();
const interviewId = interviweID 
  const editorRef = useRef(null);
  const ydoc = useRef(new Y.Doc());
  const provider = useRef(null);
  const [selectedLang, setSelectedLang] = useState(languages.python);
  const [output, setOutput] = useState("// Output will appear here...");
  useEffect(() => {
    // Listen for the code result from other clients via socket
    socket.on("code-result", (data) => {
      if (data.interviewId === interviewId) {
        setOutput(data.output); // Update the output with the received result
      }
    });
  
    // Cleanup the socket listener on unmount
    return () => {
      socket.off("code-result");
    };
  }, []);
  useEffect(() => {
    provider.current = new WebsocketProvider("ws://localhost:3004", "monacoRoom", ydoc.current);
    provider.current.on("status", (event) => console.log("WebSocket Status:", event.status));
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const yText = ydoc.current.getText("monaco");
    new MonacoBinding(yText, editor.getModel(), new Set([editor]), provider.current.awareness);
  };

  const handleLanguageChange = (e) => {
    const langKey = e.target.value;
    const langConfig = languages[langKey];
    setSelectedLang(langConfig);

    if (editorRef.current) {
      const model = editorRef.current.getModel();
      monaco.editor.setModelLanguage(model, langConfig.value);
      editorRef.current.setValue(langConfig.defaultCode);
    }
  };

  const runCode = async () => {
    const code = editorRef.current.getValue();
    setOutput("Creating Submission...\n");

    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "b9c2291363msh5aad1d3e8ce6a1ap142b2fjsndf22f0cab1f6",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: selectedLang.id,
      }),
    });

    const jsonResponse = await response.json();
    const token = jsonResponse.token;
    setOutput("Waiting for results...\n");

    const poll = async () => {
      const res = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "b9c2291363msh5aad1d3e8ce6a1ap142b2fjsndf22f0cab1f6",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
      });

      const result = await res.json();

      if (result.status.description === "In Queue" || result.status.description === "Processing") {
        setTimeout(poll, 1000);
      } else {
        let finalOutput = "";

        if (result.stdout) {
          const outputText = atob(result.stdout);
          finalOutput = `✅ Results:\n${outputText}\nExecution Time: ${result.time} secs\nMemory: ${result.memory} bytes`;
        } else if (result.stderr) {
          finalOutput = `❌ Runtime Error:\n${atob(result.stderr)}`;
        } else if (result.compile_output) {
          finalOutput = `🚫 Compilation Error:\n${atob(result.compile_output)}`;
        } else {
          finalOutput = "⚠️ Unknown error occurred.";
        }

        setOutput(finalOutput);

        // 🔁 Emit result to other clients via socket
        socket.emit("code-result", {
          interviewId,
          output: finalOutput,
        });
      }
    };

    poll();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace", backgroundColor: "#1e1e1e", color: "white" }}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px"}}>Select Language:</label>
        <select value={selectedLang.value} onChange={handleLanguageChange} style={{ padding: "5px" ,backgroundColor:"black"}}>
          {Object.entries(languages).map(([key, lang]) => (
            <option key={key} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      <Editor
        height="300px"
        defaultLanguage={selectedLang.value}
        theme="vs-dark"
        defaultValue={selectedLang.defaultCode}
        onMount={handleEditorDidMount}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={runCode}
          style={{
            padding: "10px 20px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          ▶ Run Code
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>📤 Output</label><br />
        <textarea
          rows={10}
          cols={100}
          readOnly
          style={{
            backgroundColor: "#2d2d2d",
            color: "lime",
            padding: "10px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
          value={output}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

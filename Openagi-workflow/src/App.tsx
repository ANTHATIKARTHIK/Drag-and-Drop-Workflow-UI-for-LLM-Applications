import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  ReactFlowProvider,
  addEdge,
  Connection,
  Edge,
  Node,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Bot, MessageSquare, Zap } from 'lucide-react';
import { shallow } from 'zustand/shallow';
import useStore from './store';
import InputNode from './components/nodes/InputNode';
import LLMNode from './components/nodes/LLMNode';
import OutputNode from './components/nodes/OutputNode';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
};

let id = 1;
const getId = () => `${id++}`;

function Flow() {
  const reactFlowInstance = useReactFlow();
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    setError,
    error,
    runWorkflow,
    isRunning,
    addNode
  } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setError: state.setError,
    error: state.error,
    runWorkflow: state.runWorkflow,
    isRunning: state.isRunning,
    addNode: state.addNode
  }), shallow);

  const [showChat, setShowChat] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { 
          input: '',
          output: '',
          model: 'gpt-3.5',
          apiKey: '',
          apiType: 'openai',
          searchEngineId: '',
          maxTokens: 2000,
          temperature: 0.5,
          onChange: (value: string) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, input: value } } : n
              )
            }));
          },
          onModelChange: (value: string) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, model: value } } : n
              )
            }));
          },
          onApiKeyChange: (value: string) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, apiKey: value } } : n
              )
            }));
          },
          onApiTypeChange: (value: string) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, apiType: value } } : n
              )
            }));
          },
          onSearchEngineIdChange: (value: string) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, searchEngineId: value } } : n
              )
            }));
          },
          onMaxTokensChange: (value: number) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, maxTokens: value } } : n
              )
            }));
          },
          onTemperatureChange: (value: number) => {
            useStore.setState(state => ({
              nodes: state.nodes.map(n => 
                n.id === newNode.id ? { ...n, data: { ...n.data, temperature: value } } : n
              )
            }));
          },
        },
      };

      addNode(newNode);
    },
    [reactFlowInstance]
  );

  const handleDeploy = () => {
    if (!isDeployed) {
      setIsDeployed(true);
    } else {
      setIsDeployed(false);
      setShowChat(false);
    }
  };

  const handleRun = async () => {
    const inputNode = nodes.find(node => node.type === 'input');
    const llmNode = nodes.find(node => node.type === 'llm');
    
    if (!inputNode || !llmNode) {
      setError('Please add Input and LLM nodes to the workflow');
      return;
    }

    if (!llmNode.data.apiKey) {
      setError('Please add your API key');
      return;
    }

    if (llmNode.data.apiType === 'google' && !llmNode.data.searchEngineId) {
      setError('Please add your Search Engine ID');
      return;
    }

    if (!inputNode.data.input.trim()) {
      setError('Please add some input text');
      return;
    }

    try {
      await runWorkflow();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 border-b flex items-center px-4">
          <Bot className="w-8 h-8 text-green-600" />
          <span className="text-xl font-semibold ml-2">OpenAGI</span>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Components</h2>
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-white border-b flex items-center justify-end px-4 space-x-4">
          <button
            onClick={handleDeploy}
            className={`px-4 py-2 rounded-md ${
              isDeployed 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            } transition-colors`}
          >
            {isDeployed ? 'Undeploy' : 'Deploy'}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          {isDeployed && (
            <button
              onClick={() => setShowChat(true)}
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
          )}
        </div>

        {error && (
          <div className="absolute top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {showChat && (
        <ChatWindow onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;
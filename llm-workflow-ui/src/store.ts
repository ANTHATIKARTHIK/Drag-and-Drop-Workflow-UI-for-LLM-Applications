import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import OpenAI from 'openai';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  error: string | null;
  isRunning: boolean;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setError: (error: string | null) => void;
  runWorkflow: () => Promise<void>;
  resetWorkflow: () => void;
  addNode: (node: Node) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  error: null,
  isRunning: false,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    const { nodes } = get();
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);

    if (
      (sourceNode?.type === 'input' && targetNode?.type !== 'llm') ||
      (sourceNode?.type === 'llm' && targetNode?.type !== 'output')
    ) {
      set({ error: 'Invalid connection. Connect Input → LLM → Output' });
      return;
    }

    set({
      edges: addEdge(connection, get().edges),
      error: null,
    });
  },
  setError: (error) => set({ error }),
  runWorkflow: async () => {
    const { nodes, edges } = get();
    set({ isRunning: true, error: null });
    
    try {
      // Find all nodes
      const inputNode = nodes.find(n => n.type === 'input');
      const llmNode = nodes.find(n => n.type === 'llm');
      const outputNode = nodes.find(n => n.type === 'output');

      // Validate workflow
      if (!inputNode || !llmNode || !outputNode) {
        throw new Error('Workflow is incomplete. Add all required nodes.');
      }

      // Validate connections
      const inputToLLM = edges.find(e => e.source === inputNode.id && e.target === llmNode.id);
      const llmToOutput = edges.find(e => e.source === llmNode.id && e.target === outputNode.id);

      if (!inputToLLM || !llmToOutput) {
        throw new Error('Please connect the nodes in order: Input → LLM → Output');
      }

      // Validate input
      if (!llmNode.data.apiKey) {
        throw new Error('OpenAI API key is required');
      }

      if (!inputNode.data.input.trim()) {
        throw new Error('Input text is required');
      }

      // Initialize OpenAI
      const openai = new OpenAI({
        apiKey: llmNode.data.apiKey,
        dangerouslyAllowBrowser: true
      });

      // Make API call
      const completion = await openai.chat.completions.create({
        model: llmNode.data.model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: inputNode.data.input
          }
        ],
        max_tokens: llmNode.data.maxTokens || 2000,
        temperature: llmNode.data.temperature || 0.5,
      });

      // Update output node with response
      const response = completion.choices[0]?.message?.content || 'No response generated';
      set({
        nodes: nodes.map(node => 
          node.type === 'output' 
            ? { ...node, data: { ...node.data, output: response } }
            : node
        ),
        error: null,
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error; // Re-throw to handle in the component
    } finally {
      set({ isRunning: false });
    }
  },
  resetWorkflow: () => {
    set({
      nodes: [],
      edges: [],
      error: null,
    });
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
}));

export default useStore;
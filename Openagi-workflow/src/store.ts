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

type DeployedWorkflow = {
  input: string;
  output: string;
  llmConfig: any;
};

type RFState = {
  nodes: Node[];
  edges: Edge[];
  error: string | null;
  isRunning: boolean;
  deployedWorkflow: DeployedWorkflow | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setError: (error: string | null) => void;
  runWorkflow: () => Promise<void>;
  resetWorkflow: () => void;
  addNode: (node: Node) => void;
  deployWorkflow: () => void;
  processDeployedQuery: (query: string) => Promise<string>;
};

async function processQuery(query: string, config: any): Promise<string> {
  switch (config.model) {
    case 'gpt-3.5':
    case 'gpt-4':
      const openai = new OpenAI({
        apiKey: config.apiKey,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: config.model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }],
        max_tokens: config.maxTokens || 2000,
        temperature: config.temperature || 0.5,
      });

      return completion.choices[0]?.message?.content || 'No response generated';

    case 'google':
      const searchResponse = await fetch(
        `https://customsearch.googleapis.com/customsearch/v1?key=${config.apiKey}&cx=${config.searchEngineId}&q=${encodeURIComponent(query)}`
      );
      
      if (!searchResponse.ok) {
        throw new Error('Failed to fetch Google search results');
      }
      
      const searchData = await searchResponse.json();
      return searchData.items?.map((item: any) => 
        `${item.title}\n${item.snippet}\n${item.link}`
      ).join('\n\n') || 'No results found';

    case 'bing':
      return 'Bing Search API implementation pending';

    case 'serp':
      return 'SerpAPI implementation pending';

    case 'duckduckgo':
      return 'DuckDuckGo API implementation pending';

    default:
      throw new Error('Invalid model selected');
  }
}

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  error: null,
  isRunning: false,
  deployedWorkflow: null,

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
      const inputNode = nodes.find(n => n.type === 'input');
      const llmNode = nodes.find(n => n.type === 'llm');
      const outputNode = nodes.find(n => n.type === 'output');

      if (!inputNode || !llmNode || !outputNode) {
        throw new Error('Workflow is incomplete. Add all required nodes.');
      }

      const inputToLLM = edges.find(e => e.source === inputNode.id && e.target === llmNode.id);
      const llmToOutput = edges.find(e => e.source === llmNode.id && e.target === outputNode.id);

      if (!inputToLLM || !llmToOutput) {
        throw new Error('Please connect the nodes in order: Input → LLM → Output');
      }

      const apiKey = llmNode.data.apiKey?.trim();
      const model = llmNode.data.model || 'gpt-3.5';
      
      if (!apiKey) {
        throw new Error('Please enter your API key');
      }

      if (!inputNode.data.input.trim()) {
        throw new Error('Input text is required');
      }

      let response = await processQuery(inputNode.data.input, llmNode.data);

      set({
        nodes: nodes.map(node => 
          node.type === 'output' 
            ? { ...node, data: { ...node.data, output: response } }
            : node
        ),
        error: null,
      });
    } catch (error: any) {
      let errorMessage = error.message;
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid API key. Please check your API key and try again.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'API service error. Please try again later.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your connection and try again.';
      }
      
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isRunning: false });
    }
  },

  resetWorkflow: () => {
    set({
      nodes: [],
      edges: [],
      error: null,
      deployedWorkflow: null,
    });
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  deployWorkflow: () => {
    const { nodes } = get();
    const inputNode = nodes.find(n => n.type === 'input');
    const llmNode = nodes.find(n => n.type === 'llm');
    const outputNode = nodes.find(n => n.type === 'output');

    if (!inputNode || !llmNode || !outputNode) {
      set({ error: 'Cannot deploy incomplete workflow' });
      return;
    }

    if (!outputNode.data.output) {
      set({ error: 'Please run the workflow before deploying' });
      return;
    }

    set({
      deployedWorkflow: {
        input: inputNode.data.input,
        output: outputNode.data.output,
        llmConfig: {
          model: llmNode.data.model,
          apiKey: llmNode.data.apiKey,
          maxTokens: llmNode.data.maxTokens,
          temperature: llmNode.data.temperature,
          searchEngineId: llmNode.data.searchEngineId,
          serpApiKey: llmNode.data.serpApiKey,
        },
      },
      error: null,
    });
  },

  processDeployedQuery: async (query: string) => {
    const { deployedWorkflow } = get();
    if (!deployedWorkflow) {
      throw new Error('No deployed workflow available');
    }

    // Check if the query is similar to the deployed input
    if (query.toLowerCase().includes(deployedWorkflow.input.toLowerCase())) {
      return deployedWorkflow.output;
    }

    // If not an exact match, process with the deployed configuration
    return processQuery(query, deployedWorkflow.llmConfig);
  },
}));

export default useStore;
import React from 'react';
import { Handle, Position } from 'reactflow';

function LLMNode({ data, isConnectable }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
      <div className="font-semibold mb-2">LLM ENGINE</div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model Name
          </label>
          <select
            value={data.model || 'gpt-3.5'}
            onChange={(e) => data.onModelChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={data.apiKey || ''}
            onChange={(e) => data.onApiKeyChange(e.target.value)}
            placeholder="sk-..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Tokens
          </label>
          <input
            type="number"
            value={data.maxTokens || 2000}
            onChange={(e) => data.onMaxTokensChange(parseInt(e.target.value))}
            min="1"
            max="4000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperature
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={data.temperature || 0.5}
            onChange={(e) => data.onTemperatureChange(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default LLMNode;
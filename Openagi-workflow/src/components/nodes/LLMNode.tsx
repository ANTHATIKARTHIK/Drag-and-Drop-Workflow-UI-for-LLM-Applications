import React from 'react';
import { Handle, Position } from 'reactflow';

function LLMNode({ data, isConnectable }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">LLM ENGINE</div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="sr-only">Close</span>
          &times;
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model Name
          </label>
          <select
            value={data.model || 'gpt-3.5'}
            onChange={(e) => data.onModelChange(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
            <option value="google">Google Search</option>
            <option value="bing">Bing Search</option>
            <option value="serp">SerpAPI</option>
            <option value="duckduckgo">DuckDuckGo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={data.apiKey || ''}
            onChange={(e) => data.onApiKeyChange(e.target.value.trim())}
            placeholder="Enter your API key"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {data.model === 'google' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Engine ID (cx)
            </label>
            <input
              type="text"
              value={data.searchEngineId || ''}
              onChange={(e) => data.onSearchEngineIdChange(e.target.value.trim())}
              placeholder="Enter your Search Engine ID"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {data.model === 'serp' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SerpAPI Key
            </label>
            <input
              type="password"
              value={data.serpApiKey || ''}
              onChange={(e) => data.onSerpApiKeyChange(e.target.value.trim())}
              placeholder="Enter your SerpAPI key"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(data.model === 'gpt-3.5' || data.model === 'gpt-4') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Tokens
              </label>
              <input
                type="number"
                value={data.maxTokens || 2000}
                onChange={(e) => data.onMaxTokensChange(parseInt(e.target.value))}
                min="1"
                max="4000"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={data.temperature || 0.5}
                onChange={(e) => data.onTemperatureChange(parseFloat(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="w-3 h-3 bg-blue-500"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-3 h-3 bg-blue-500"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default LLMNode;
import React from 'react';
import { Handle, Position } from 'reactflow';

function OutputNode({ data, isConnectable }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
      <div className="font-semibold mb-2">OUTPUT</div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Output Response
        </label>
        <div className="mt-1 p-4 min-h-[150px] max-h-[300px] overflow-y-auto bg-gray-50 rounded-md whitespace-pre-wrap text-sm">
          {data.output || 'Output response will appear here after running the workflow'}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="llm"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default OutputNode;
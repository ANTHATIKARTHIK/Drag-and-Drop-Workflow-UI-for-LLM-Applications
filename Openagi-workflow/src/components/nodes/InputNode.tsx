import React from 'react';
import { Handle, Position } from 'reactflow';

function InputNode({ data, isConnectable }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[250px]">
      <div className="font-semibold mb-2">INPUT</div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Write the input/question you want to ask
        </label>
        <textarea
          value={data.input || ''}
          onChange={(e) => data.onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="llm"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default InputNode;
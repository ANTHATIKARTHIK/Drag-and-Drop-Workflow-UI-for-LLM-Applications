import React from 'react';
import { FileInput as Input, Bot, FileOutput as Output } from 'lucide-react';

const nodeTypes = [
  { type: 'input', icon: Input, label: 'Input' },
  { type: 'llm', icon: Bot, label: 'LLM Engine' },
  { type: 'output', icon: Output, label: 'Output' },
];

function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="space-y-2">
      {nodeTypes.map(({ type, icon: Icon, label }) => (
        <div
          key={type}
          className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md cursor-move hover:bg-gray-100 transition-colors"
          onDragStart={(e) => onDragStart(e, type)}
          draggable
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
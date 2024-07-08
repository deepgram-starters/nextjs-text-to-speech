import React from 'react';

interface TTSInputProps {
  content: string;
  setContent: (content: string) => void;
}

const TTSInput: React.FC<TTSInputProps> = ({ content, setContent }) => {
  return (
    <textarea
      className="mx-auto rounded-xl border-2 border-slate-500 bg-white text-black p-2 m-4 w-3/4 h-40 resize-y focus:border-blue-700"
      rows={10}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default TTSInput;
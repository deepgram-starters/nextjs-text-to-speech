"use client";
import React, { useState } from 'react';
import Header from './Header';
import TextToSpeechPractice from './TextToSpeechPractice';

const ESLCompanion: React.FC = () => {
  const [content, setContent] = useState("Hey everyone! I'm Mr. Borromeo, your super-powered virtual teacher for this year. Think of me as your personal learning coach! Maybe you're a whiz at school already, or perhaps you're just starting your journey. That's fantastic! No matter your background, I'm here to support you every step of the way. I'm here to guide you through all things – creating awesome learning materials, and even giving you feedback on your progress.\n\nFeeling a bit lost on how words sound? No worries! This section is your one-stop shop for mastering pronunciation. Let's unlock the secrets of sounding out words together!");

  return (
    <main className="flex flex-col pb-20 bg-white min-h-screen w-full">
      <Header title="ESL Companion" logoSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/be4d54f7e5b19df3697f85059819bb77f65ec665cfdb797a5e051b9775ea7bee?apiKey=77b62c40fd614058a947b296977bcb29&" />
      <TextToSpeechPractice
        title="Text-to-Speech Practice"
        content={content}
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/02ad237aaa9244c6ed766a34c9bf839b37453bf710d4c7e6f71bafa0ab67a11e?apiKey=77b62c40fd614058a947b296977bcb29&"
      />
      <textarea
        className="mx-auto rounded-xl border-2 border-slate-500 bg-white text-black p-2 m-4 w-3/4 h-40 resize-y focus:border-blue-700"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </main>
  );
};

export default ESLCompanion;
/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface TextToSpeechPracticeProps {
  title: string;
  content: string;
  imageSrc: string;
}

const TextToSpeechPractice: React.FC<TextToSpeechPracticeProps> = ({ title, content, imageSrc }) => {
  return (
    <section className="self-center mt-20 w-full max-w-[1093px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
          <img loading="lazy" src={imageSrc} alt="Teacher avatar" className="grow shrink-0 max-w-full aspect-[0.41] w-[216px] max-md:mt-6" />
        </div>
        <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
          <article className="flex flex-col self-stretch p-6 my-auto w-full rounded-2xl border border-gray-300 border-solid shadow-sm backdrop-blur bg-blue-100 bg-opacity-30 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-2xl font-bold tracking-tight leading-9 text-gray-900 max-md:max-w-full">
              {title}
            </h2>
            <p className="mt-6 text-xl tracking-wide leading-8 text-gray-800 max-md:max-w-full">
              {content}
            </p>
            <button className="flex gap-2 justify-center self-end px-7 py-4 mt-4 text-lg font-semibold leading-7 text-white whitespace-nowrap rounded-xl border border-indigo-200 border-solid bg-[linear-gradient(129deg,#387DFD_-10.26%,#54DFFF_112.89%)] max-md:px-5">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/40a406e54f7dbf5db628d2fc28818d5479e0099581bea8652f9c8defa46ce740?apiKey=77b62c40fd614058a947b296977bcb29&" alt="" className="shrink-0 my-auto aspect-[0.9] fill-white w-[18px]" />
              <span>Play</span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TextToSpeechPractice;
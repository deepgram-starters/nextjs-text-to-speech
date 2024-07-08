/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface HeaderProps {
  title: string;
  logoSrc: string;
}

const Header: React.FC<HeaderProps> = ({ title, logoSrc }) => {
  return (
    <header className="flex flex-col justify-center w-full border border-solid border-b-[3px] max-md:max-w-full">
      <div className="flex flex-col justify-center py-px w-full border border-solid border-b-[3px] max-md:max-w-full">
        <div className="flex z-10 gap-5 justify-between px-10 py-6 w-full bg-white border border-solid border-b-[3px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col text-2xl font-semibold tracking-wide leading-8 text-black shadow-sm">
            <div className="flex z-10 gap-3.5">
              <img loading="lazy" src={logoSrc} alt={`${title} logo`} className="shrink-0 my-auto aspect-[0.98] w-[54px]" />
              <h1>{title}</h1>
            </div>
          </div>
          <nav className="flex flex-col my-auto">
            <div className="flex gap-5 justify-between">
              <div className="flex flex-col">
                <div className="flex flex-col justify-center mt-3 bg-neutral-700">
                  <div className="shrink-0 bg-blue-600 h-[3px]" />
                </div>
              </div>
              <div className="flex z-10 gap-5 justify-between text-xl leading-7 whitespace-nowrap">
                <div className="flex flex-col font-semibold text-blue-600">
                  <div>Learning</div>
                  <div className="shrink-0 mt-3 bg-blue-600 h-[3px]" />
                </div>
                <div className="self-start text-gray-500">Converse</div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { cookies } from 'next/headers';
import DismissButton from './dismiss-button';

export default function Toast() {
  const cookieStore = cookies();
  const isHidden = cookieStore.get('template-banner-hidden');

  return isHidden ? null : (
    <div className="sticky rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] mt-40 sm:mt-[-80px] p-0.5 z-20 top-4 left-0 right-0 mx-auto">
      <div className="rounded-[14px] w-full h-full bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-black text-[13px] font-mono w-[304px] h-10 flex items-center justify-center p-3">
          Get started with Next.js and LangChain instantly. <DismissButton />
        </p>
        <a
          className="text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
          href="https://github.com/mrtom/nextjs-langchain-template"
          target="_blank"
          rel="noreferrer"
        >
          Clone
        </a>
      </div>
    </div>
  );
}

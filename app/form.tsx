'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';

import { queryModelRequest } from 'lib/client/api';

type QuestionAndAnswer = {
  question: string;
  answer: string;
};

export const Form = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<QuestionAndAnswer[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaElement = textareaRef.current;

  const sendQuery = useCallback(async () => {
    const apiResponse = await queryModelRequest(query);
    const qAndA = { question: query, answer: apiResponse.answer };
    const newResponses = [...responses, qAndA];
    setResponses(newResponses);
  }, [responses, query]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendQuery();
      }
    };

    if (textareaElement) {
      textareaElement.addEventListener('keydown', listener);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener('keydown', listener);
      }
    };
  }, [textareaElement, sendQuery]);

  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl h-full">
        <div className="col-span-full">
          {responses.map((qAndA, idx) => (
            <div className="mt-2 mb-4" key="idx">
              <div
                id={`question-${idx}`}
                className="block w-full border-0 mr-16 mb-1"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2 text-gray-900 inline-block" />
                <span className="inline-block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-4">
                  {qAndA.question}
                </span>
              </div>
              <div
                id={`response-${idx}`}
                className="block w-full border-0 ml-16 mb-4"
              >
                <span className="inline-block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50 p-4">
                  {qAndA.answer}
                </span>
                <SparklesIcon className="h-6 w-6 ml-2 text-blue-500 inline-block" />
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="sticky p-[50px] h-40 sm:h-[120px] p-0.5 z-10 bottom-0 left-0 right-0 mx-auto bg-white border-t border-slate-300">
        <form onChange={(e) => setQuery((e.target as HTMLFormElement).value)}>
          <textarea
            id="query"
            name="query"
            ref={textareaRef}
            placeholder="Send a message"
            rows={1}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-4"
            defaultValue={query}
          />
          {/* <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async (e) => {
              e.preventDefault();
              const response = await queryModelRequest(query);
              setResponse(response.answer);
            }}
          >
            Submit
          </button> */}
        </form>
      </div>
    </>
  );
};

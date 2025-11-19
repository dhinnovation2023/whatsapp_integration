'use client';

import ErrorTemplate from '@/components/ui-elements/error-template';
import InputGroup from '@/components/ui/input-group'
import { handleCatchBlock } from '@/functions/common';
import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from 'react'
import { generateBasicReportFromClient } from './generate-basic-report';
import { RiFileChartLine, RiLoader4Line } from '@remixicon/react';
import Link from 'next/link';

const GenerateReportPageClientComponent = () => {

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  const [date, setDate] = useState<{ start: Date, end: Date }>({
    start: new Date(Date.now() - (86400000 * 30)),
    end: new Date(),
  });

  const fieldsData: {
    label: string,
    placeholder: string,
    value?: string,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    name: string,
    type?: InputHTMLAttributes<HTMLInputElement>["type"] | "select",
    required?: boolean,
  }[] = [
      {
        label: "Start Date",
        name: "startDate",
        placeholder: "Start date",
        onChange: (event) => {
          setDate(prev => ({
            ...prev,
            start: new Date(event.target.value),
          }))
        },
        type: "date",
        required: true,
        value: `${date.start.getFullYear()}-${(date.start.getMonth() + 1).toString().padStart(2, '0')}-${date.start.getDate().toString().padStart(2, '0')}`,
      },
      {
        label: "End Date",
        name: "endDate",
        onChange: (event) => {
          setDate(prev => ({
            ...prev,
            end: new Date(event.target.value),
          }))
        },
        placeholder: "End date",
        required: true,
        value: `${date.end.getFullYear()}-${(date.end.getMonth() + 1).toString().padStart(2, '0')}-${date.end.getDate().toString().padStart(2, '0')}`,
        type: "date"
      }
    ]

  async function handleFormSubmission(event: FormEvent) {

    event.preventDefault();

    setError(null);
    setInProgress(true);

    try {
      if (!date.start || !date.end) {
        throw new Error("Please select a valid dates");
      }

      const sheetUrl = await generateBasicReportFromClient({
        date: {
          start: date.start.getTime(),
          end: date.end.getTime(),
        },
      })

      setSheetUrl(sheetUrl);

    } catch (err) {
      const message = handleCatchBlock(err);
      setError(message);
    }

    setInProgress(false);
  }

  return (
    <div
      className='w-full py-10'
    >
      <div
        className='max-w-[400px] mx-auto'
      >
        <form
          className='space-y-3'
          onSubmit={handleFormSubmission}
        >
          {fieldsData.map((field) => (
            <InputGroup
              {...field}
              key={field.name}
            />
          ))}

          {
            error && (
              <div
                className='space-y-2 py-3 px-4 bg-red-600/10 rounded-2xl'
              >
                <ErrorTemplate
                  error={error}
                />
                <Link
                  href={"/app/google-oauth"}
                  className='py-3 px-5 w-full rounded-xl font-semibold bg-red-600 text-background flex items-center gap-3 cursor-pointer'
                >Reconnect Google</Link>
              </div>
            )
          }

          <div
            className='flex items-center gap-3'
          >
            <button
              className='py-3 px-5 w-full rounded-xl font-semibold bg-foreground text-background flex items-center gap-3 cursor-pointer'
            >
              {
                inProgress && (
                  <RiLoader4Line
                    size={20}
                    className='animate-spin shrink-0'
                  />
                )
              }
              <p>{inProgress ? "Loading..." : "Generate Report"}</p>
            </button>

            {
              sheetUrl && (
                <a
                  href={sheetUrl}
                  className='py-3 px-5 w-full rounded-xl font-semibold bg-theme-primary text-background flex items-center gap-3 cursor-pointer'
                  target='_blank'
                  rel='noopener no follow'
                >
                  <RiFileChartLine
                    size={20}
                    className='shrink-0'
                  />
                  <p>View Sheet</p>
                </a>
              )
            }
          </div>

        </form>
      </div>
    </div>
  )
}

export default GenerateReportPageClientComponent
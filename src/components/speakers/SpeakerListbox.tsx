import { Speaker } from '@/types/Speaker';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AddTalkFormValues } from '../talks/AddNewTalk';

export interface SpeakerListboxProps {
  /**
   * List of speakers to display in the listbox
   */
  speakers: Speaker[];
}

export function SpeakerListbox({ speakers }: SpeakerListboxProps) {
  const { setValue } = useFormContext<AddTalkFormValues>();
  const speaker: Speaker = useWatch({ name: 'speaker' });
  const selectedSpeaker = speaker || speakers[0];

  return (
    <div className="w-full cursor-pointer">
      <Listbox
        value={selectedSpeaker?.id}
        onChange={(id) =>
          setValue(
            'speaker',
            speakers.find((speaker: Speaker) => speaker.id === id),
          )
        }
      >
        <div className="relative mt-1">
          <Listbox.Button
            className="bg-input relative w-full py-2 pl-3 pr-10 text-left text-white bg-transparent border border-gray-700 rounded-lg cursor-default"
            disabled={!selectedSpeaker?.name}
            id="speaker"
          >
            <span className="block text-xs truncate">
              {selectedSpeaker?.name || '--'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="text-list w-4 h-4" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-card absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg cursor-pointer">
              {speakers.map((person: Speaker) => (
                <Listbox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-900 text-white' : 'text-list'
                    }`
                  }
                  value={person.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-800">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

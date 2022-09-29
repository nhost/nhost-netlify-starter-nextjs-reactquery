import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps
  extends DetailedHTMLProps<HTMLProps<HTMLInputElement>, HTMLInputElement> {
  /**
   * Error message
   */
  error?: string;
}

export const Input = forwardRef(function Input(
  { className, error, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <label
          htmlFor={props.id}
          className="text-list self-center text-xs font-medium"
        >
          {props.label}
        </label>
      </div>

      <div className="grid grid-flow-row col-span-2 gap-1">
        <input
          ref={ref}
          className={twMerge(
            'bg-input px-3 py-2 text-xs text-white border border-gray-700 rounded-md',
            className,
          )}
          minLength={2}
          maxLength={128}
          spellCheck="false"
          autoCapitalize="none"
          {...props}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
});

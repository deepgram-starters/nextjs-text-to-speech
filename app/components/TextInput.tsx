import { ChangeEvent, KeyboardEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { isBrowser, isDesktop, isMacOs } from "react-device-detect";

interface TextInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

/**
 * Text Input Component
 *
 * This component provides a text input area for users to enter text.
 * It supports multi-line input with auto-resizing and keyboard shortcuts.
 *
 * To remove text input functionality:
 * 1. Delete this file
 * 2. Remove the TextInput import and usage from Controls.tsx
 * 3. Replace with your own input method or hardcoded text
 */
const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}) => {
  const defaultPlaceholder = `Enter text to turn into speech... ${
    isDesktop &&
    isBrowser &&
    (isMacOs ? "Press ⌘ + Enter to submit." : "Press Ctrl + Enter to submit.")
  }`;

  return (
    <TextareaAutosize
      onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== "Enter" || !isDesktop) return;

        // On desktop, use Ctrl+Enter or Cmd+Enter to submit
        if ((isMacOs && event.metaKey) || (!isMacOs && event.ctrlKey)) {
          event.preventDefault();
          onSubmit();
        }
      }}
      rows={1}
      spellCheck={false}
      autoCorrect="off"
      className="py-2 md:py-4 -mb-[0.4rem] min-h-10 rounded-tl-[2rem] rounded-bl-[2rem] overflow-hidden sm:px-8 w-full resize-none bg-[#101014] text-light-900 border-0 text-sm sm:text-base outline-none focus:ring-0"
      placeholder={placeholder || defaultPlaceholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
      }}
    />
  );
};

export default TextInput;

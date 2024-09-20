"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Heading2, Strikethrough, Italic, List, ListOrdered, ImageIcon, Code } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useRef } from "react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }


  return (
    <div className="border border-input bg-transparent rounded-md p-2 flex gap-2">
      {/* Heading 2 Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("heading", { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </Toggle>

      {/* Bold Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </Toggle>

      {/* Italic Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </Toggle>

      {/* Strikethrough Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("strike")} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      {/* Bullet List Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </Toggle>

      {/* Ordered List Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("orderedList")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      {/* Button to trigger file input */}
      <Toggle size={"sm"} onPressedChange={() => fileInputRef.current?.click()}>
        <ImageIcon className="h-4 w-4" />
      </Toggle>

      <Toggle size={"sm"} pressed={editor.isActive("codeBlock")} onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

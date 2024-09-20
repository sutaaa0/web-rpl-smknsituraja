"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Toolbar } from "./Toolbar";
import Image from "@tiptap/extension-image";
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'



type Props = {
  description: string;
  onChange: (value: string) => void;
};

export default function Tiptap({ description, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      CodeBlock.configure({
        HTMLAttributes: {
          class: "rounded-md border border-input bg-slate-100 p-2",
        },
      }),
      Image, // Typo corrected from 'StaterKit' to 'StarterKit'
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
        levels: [2], // Only allow H2 headings
      }),
      
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input bg-white p-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] gap-y-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

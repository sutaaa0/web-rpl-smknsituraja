"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Toolbar } from "./Toolbar";
import Image from "@tiptap/extension-image";
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { useCallback } from 'react';
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Paragraph from '@tiptap/extension-paragraph'
import { all, createLowlight as createHighlight } from 'lowlight'
import HardBreak from '@tiptap/extension-hard-break';
import "./editor.css";


type Props = {
  description: string;
  onChange: (value: string) => void;
};

const lowlight = createHighlight(all)



export default function Tiptap({ description, onChange }: Props) {
  console.log("ini descriptions",description)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false
      }),
      BulletList,
      Paragraph,
      ListItem,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),  // Shortcut untuk hard break dengan Enter
            'Mod-Enter': () => this.editor.commands.setHorizontalRule(),  // Shortcut untuk horizontal rule dengan Mod-Enter
          };
        },
      }).configure({
        HTMLAttributes: {
          class: 'leading-tight',  // Styling untuk hard break
        },
      }),
 
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList', 'codeBlock'],
      }),
      CodeBlockLowlight.configure({
        lowlight
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md mx-auto block"
        }
      }),
      Heading.configure({
        levels: [1, 2, 3] 
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border outline-none min-h-[250px] max-h-[450px]  overflow-y-scroll border-input dark:bg-neutral-900 dark:text-white dark:border-neutral-700 bg-white p-2",
      },
    },
    immediatelyRender: false,

    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      console.log("Generated HTML content:", htmlContent);
      onChange(htmlContent);
    },
    
  });

  const addImageToEditor = useCallback((url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] gap-y-4">
      <Toolbar editor={editor} addImageToEditor={addImageToEditor} />
      <EditorContent editor={editor} />
    </div>
  );
}

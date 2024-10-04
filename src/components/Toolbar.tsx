"use client";
import { type Editor } from "@tiptap/react";
import { Bold, Heading2, Strikethrough, Italic, List, ListOrdered, ImageIcon, Code, AlignLeft, AlignCenter, AlignRight, Heading1, Heading3, CornerDownLeft } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useRef } from "react";
import axios from "axios";

type Props = {
  editor: Editor | null;
  addImageToEditor: (url: string) => void;
};

export function Toolbar({ editor, addImageToEditor }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'heszsyql'); // Ganti dengan upload preset Anda
    formData.append('cloud_name', 'dy3y5cnnq'); // Ganti dengan cloud name Anda

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dy3y5cnnq/image/upload', formData); // Ganti dengan URL upload Cloudinary Anda
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        addImageToEditor(imageUrl); // Masukkan URL gambar ke editor
      }
    }
  };

  if (!editor) {
    return null;
  }

  
  console.log(editor.isActive("heading", { level: 2 }));
  console.log(editor.isActive("heading", { level: 3 }));


  return (
    <div className="border border-input bg-transparent rounded-md p-2 flex gap-2">
      {/* Heading 2 Toggle */}
      <Toggle size={"sm"} pressed={editor.isActive("heading", { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 className="h-4 w-4" />
      </Toggle>

      <Toggle size={"sm"} pressed={editor.isActive("heading", { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Toggle size={"sm"} pressed={editor.isActive("heading", { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-4 w-4" />
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
      <Toggle size={"sm"} pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
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

      <Toggle size={"sm"} pressed={editor.isActive("alignLeft")} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle size={"sm"} pressed={editor.isActive("alignCenter")} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle size={"sm"} pressed={editor.isActive("alignRight")} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <Toggle size={"sm"} pressed={editor.isActive("hardBreak")} onPressedChange={() => editor.chain().focus().setHardBreak().run()}>
        <CornerDownLeft className="h-4 w-4" />
      </Toggle>


      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
        accept="image/*"
      />
    </div>
  );
}

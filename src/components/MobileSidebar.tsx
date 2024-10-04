import React, { useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  CalendarSearch,
  Menu,
  Newspaper,
  NotebookText,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ToggleButon from "./ToggleButon";
import SearchBtn from "./SearchBtn";
import { Button } from "./ui/button";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  type Item = {
    id: string;
    icon: React.ReactElement;
    label: string;
    action: () => void;
  };

  const item: Item[] = [
    {
      id: "mata-pelajaran",
      icon: <NotebookText className="mr-2 h-4 w-4" />,
      label: "Mata Pelajaran",
      action: () => console.log("Copy URL"),
    },
    {
      id: "guru-pengajar",
      icon: <Users className="mr-2 h-4 w-4" />,
      label: "Guru Pengajar",
      action: () => console.log("Search Series"),
    },
    {
      id: "portofolio-siswa",
      icon: <Award className="mr-2 h-4 w-4" />,
      label: "Portofolio Siswa",
      action: () => console.log("Search Articles"),
    },
    {
      id: "Kegiatan-dan-ekstrakurikuler",
      icon: <CalendarSearch className="mr-2 h-4 w-4" />,
      label: "Kegiatan dan Ekstrakurikuler",
      action: () => console.log("Search Books"),
    },
    {
      id: "lowongan-kerja",
      icon: <BriefcaseBusiness className="mr-2 h-4 w-4" />,
      label: "Lowongan Kerja",
      action: () => console.log("Post+"),
    },
    {
      id: "berita-dan-artikel",
      icon: <Newspaper className="mr-2 h-4 w-4" />,
      label: "Berita dan Artikel",
      action: () => console.log("Create Article"),
    },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-background rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="relative">
            <ToggleButon />
          </div>
          <SearchBtn />
          <nav className="flex flex-col py-12">
            <div className="flex flex-col gap-y-3">
              {item.map((data: Item) => (
                <Button
                  key={data.id}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    data.action();
                    setIsOpen(false);
                  }}
                >
                  {data.icon}
                  {data.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default MobileSidebar;

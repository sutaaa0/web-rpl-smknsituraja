"use client";

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input-search"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Search, NotebookText, Users, Award, CalendarSearch, BriefcaseBusiness, Newspaper } from 'lucide-react'

// Define a type for our search items
type SearchItem = {
    id: string;
    icon: React.ReactNode;
    label: string;
    action: () => void;
}

export default function SearchBtn() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<SearchItem[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    // Define our search items
    const searchItems: SearchItem[] = [
        { id: 'mata-pelajaran', icon: <NotebookText className='mr-2 h-4 w-4' />, label: 'Mata Pelajaran', action: () => console.log('Copy URL') },
        { id: 'guru-pengajar', icon: <Users className="mr-2 h-4 w-4" />, label: 'Guru Pengajar', action: () => console.log('Search Series') },
        { id: 'portofolio-siswa', icon: <Award className="mr-2 h-4 w-4" />, label: 'Portofolio Siswa', action: () => console.log('Search Articles') },
        { id: 'Kegiatan-dan-ekstrakurikuler', icon: <CalendarSearch className="mr-2 h-4 w-4" />, label: 'Kegiatan dan Ekstrakurikuler', action: () => console.log('Search Books') },
        { id: 'lowongan-kerja', icon: <BriefcaseBusiness className="mr-2 h-4 w-4" />, label: 'Lowongan Kerja', action: () => console.log('Post+') },
        { id: 'berita-dan-artikel', icon: <Newspaper className="mr-2 h-4 w-4" />, label: 'Berita dan Artikel', action: () => console.log('Create Article') },
    ]

    const toggleModal = () => setIsOpen(!isOpen)

    // Search function
    const performSearch = (term: string) => {
        const filtered = searchItems.filter(item =>
            item.label.toLowerCase().includes(term.toLowerCase())
        )
        setSearchResults(filtered)
    }

    // Effect to perform search when searchTerm changes
    useEffect(() => {
        performSearch(searchTerm)
    }, [searchTerm])

    // Effect to focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])


    return (
        <>
            <Button variant="ghost" size="icon" onClick={toggleModal} className="w-8 h-8 rounded-full absolute sm:right-[62px] right-[326px] top-[8px] z-10">
                <Search className="h-4 w-4" />
                <span className="sr-only">Open search</span>
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-[325px] rounded sm:max-w-[425px] transform-none top-[10%] left-[14%] sm:left-[38%]">
                    <DialogHeader className='relative'>
                        <div className="absolute -top-4 flex items-center me-5">
                            <Search className="h-5 w-5 opacity-50" />
                            <Input
                                ref={inputRef}
                                className='border-none'
                                placeholder="Cari apapun..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </DialogHeader>
                    <span className='border-b py-1'></span>
                    <div className="grid gap-4 py-4">

                        <div className="space-y-2">
                            {searchResults.length > 0 ? (
                                searchResults.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        className="w-full justify-start text-left"
                                        onClick={() => {
                                            item.action()
                                            setIsOpen(false)
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Button>
                                ))
                            ) : (
                                <div className='text-center mt-3'>
                                    <p className="dark:text-white text-black">Tidak ada hasil ditemukan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

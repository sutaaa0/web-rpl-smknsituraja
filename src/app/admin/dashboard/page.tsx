import React from 'react'
import "@/app/globals.css"
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
    const session = await auth();
    if(!session) return redirect('/auth/signin')

    return (
        <div className="flex flex-1 w-full h-full">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-grow w-full h-full">

                {/* Bagian atas dengan 4 kotak */}
                <div className="flex gap-2">
                    {[
                        { label: "Profil Guru", description: "Kelola data guru pengajar di jurusan RPL." },
                        { label: "Mata Pelajaran", description: "Kelola mata pelajaran yang ada di jurusan RPL." },
                        { label: "Portofolio Siswa", description: "Kelola portofolio siswa yang akan ditampilkan di website." },
                        { label: "Kegiatan & Ekstrakurikuler", description: "Kelola kegiatan dan ekstrakurikuler jurusan RPL." }
                    ].map((item, i) => (
                        <div
                            key={"first-array" + i}
                            className="h-32 w-full flex flex-col justify-center items-center rounded-lg bg-gray-100 dark:bg-neutral-800 p-4"
                        >
                            <h2 className="text-lg font-semibold">{item.label}</h2>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bagian bawah dengan 2 kotak */}
                <div className="flex gap-2 flex-grow">
                    {[
                        { label: "Lowongan Kerja", description: "Kelola informasi lowongan kerja untuk siswa lulusan RPL." },
                        { label: "Berita & Artikel", description: "Kelola berita dan artikel terbaru yang akan ditampilkan di website." }
                    ].map((item, i) => (
                        <div
                            key={"second-array" + i}
                            className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 p-4"
                        >
                            <h2 className="text-lg font-semibold">{item.label}</h2>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
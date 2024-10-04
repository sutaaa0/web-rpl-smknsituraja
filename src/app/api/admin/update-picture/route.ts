import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';

// Named export untuk metode POST
export const POST = async (request: Request) => {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ message: 'Image URL is required' }, { status: 400 });
    }

    // Mendapatkan session user
    const session = await auth();
    const adminEmail = session?.user?.email;

    if (!adminEmail) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Update data admin di database
    const updatedAdmin = await prisma.admin.update({
      where: { email: adminEmail as string },
      data: { imageUrl: imageUrl }, // Pastikan field di database sesuai, misalnya "image"
    });

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    console.error('Error updating image URL:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    // Mendapatkan session user
    const session = await auth();
    const adminEmail = session?.user?.email;

    if (!adminEmail) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Update data admin untuk menghapus imageUrl
    const updatedAdmin = await prisma.admin.update({
      where: { email: adminEmail as string },
      data: { imageUrl: null }, // Menghapus image dengan mengatur field ke null
    });

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    console.error('Error deleting image URL:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { baseUrl } from '@/lib/utils';
import { API_ENDPOINTS } from '@/lib/api';

export async function GET() {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get('access_token')?.value;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    const response = await fetch(API_ENDPOINTS.CATEGORIES, {
      headers,
    });

    if (!response.ok) {
      // Re-throw the error or return a specific error response
      return new NextResponse(response.statusText, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route /api/categories:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

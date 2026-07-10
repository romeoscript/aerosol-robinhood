import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, balance } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Upsert user with balance using Supabase
    const { data: user, error } = await supabase
      .from('users')
      .upsert(
        { username, balance: balance ?? 0 },
        { onConflict: 'username' }
      )
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: "Failed to update user balance" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User balance updated successfully",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: "Failed to update user balance" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    // Get user by username using Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // User not found
        return NextResponse.json(
          {
            message: "User not found",
            data: null,
          },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: "Failed to retrieve user data" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User balance retrieved successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: "Failed to retrieve user data" },
      { status: 500 }
    );
  }
}

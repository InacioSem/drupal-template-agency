import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, category, priority, subject, description } = data;

    if (!name || !email || !category || !subject || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Generate a ticket ID
    const ticketId = `DR-${Date.now().toString(36).toUpperCase()}`;

    // In production, integrate with a ticketing system or email service.
    // Route to support@drupalready.dev
    console.log("Support ticket:", { ticketId, name, email, category, priority, subject, description });

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Ticket ${ticketId} created. We'll respond within 24 hours.`,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

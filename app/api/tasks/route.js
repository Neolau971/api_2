import Task from "../../../models/Task";
import connectDB from "../../../lib/mongodb";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
    await connectDB();
    const tasks = await Task.find();
    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: corsHeaders,
    });
}

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const newTask = new Task(body);
    await newTask.save();
    return new Response(JSON.stringify(newTask), { 
        status: 201,
        headers: corsHeaders,
    });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204, // No Content
    headers: corsHeaders,
  });
}

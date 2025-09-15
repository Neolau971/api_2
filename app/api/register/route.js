import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req) {
    await connectDB();
    const body  = await req.json();
    const login = body.login;
    const hashePwd = await bcrypt.hash(body.password, 10);
    const newUser = new User({login, password: hashePwd});
    await newUser.save();
    return new Response(JSON.stringify(newUser), {
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

import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const login = body.login;
    const user = await User.findOne({ login });
    if (!user) return new Response(null, {
        status: 400,
        headers: corsHeaders,
    })

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return new Response(null, {
        status: 400,
        headers: corsHeaders,
    })

    const token = jwt.sign(
        { id: user._id, login: user.login },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "1h"}
    );

    return new Response(JSON.stringify(token), {
        status: 200,
        headers: corsHeaders,
    });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    })
}
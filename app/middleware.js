import jwt from "jsonwebtoken";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function verifyToken(req, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if(!token) return new Response(null, {
    status: 401,
    headers: corsHeaders,
  });

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) return new Response(null, {
        status: 403,
        headers: corsHeaders,
    })
    req.user = user; 
    next();
  });
}


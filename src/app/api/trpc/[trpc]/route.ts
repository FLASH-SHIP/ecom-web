import { env } from "@web/env";

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const backendUrl = `${env.NEXT_PUBLIC_API_URL}/api/trpc${url.pathname.replace("/api/trpc", "")}${url.search}`;

  const headers = new Headers(req.headers);
  headers.set("host", new URL(env.NEXT_PUBLIC_API_URL).host);

  try {
    const res = await fetch(backendUrl, {
      method: req.method,
      headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined,
    });

    const responseHeaders = new Headers(res.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");

    return new Response(res.body, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.warn("[tRPC Proxy] Backend API unavailable or starting up:", (error as Error).message);
    return Response.json(
      [{ error: { json: { message: "Backend API unavailable or warming up", code: -32603 } } }],
      { status: 503 },
    );
  }
};

export { handler as GET, handler as POST };

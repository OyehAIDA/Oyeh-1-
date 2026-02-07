export async function POST(request) {
  try {
    const body = await request.json();
    const { a, b, op } = body || {};

    const A = Number(a);
    const B = Number(b);

    const allowedOps = ["+", "-", "*", "/", "sqrt", "pow2"];
    if (!allowedOps.includes(op)) {
      return Response.json(
        { error: "op must be one of +, -, *, /, sqrt, pow2" },
        { status: 400 }
      );
    }

    // Unary ops validate A only
    if (!Number.isFinite(A)) {
      return Response.json({ error: "a must be a valid number" }, { status: 400 });
    }

    if (op === "sqrt") {
      if (A < 0) {
        return Response.json({ error: "square root of negative number" }, { status: 400 });
      }
      return Response.json({ a: A, op, result: Math.sqrt(A) });
    }

    if (op === "pow2") {
      return Response.json({ a: A, op, result: A * A });
    }

    // Binary ops validate B too
    if (!Number.isFinite(B)) {
      return Response.json({ error: "b must be a valid number" }, { status: 400 });
    }

    if (op === "/" && B === 0) {
      return Response.json({ error: "division by zero" }, { status: 400 });
    }

    let result;
    switch (op) {
      case "+": result = A + B; break;
      case "-": result = A - B; break;
      case "*": result = A * B; break;
      case "/": result = A / B; break;
    }

    return Response.json({ a: A, b: B, op, result });
  } catch {
    return Response.json({ error: "invalid JSON body" }, { status: 400 });
  }
}

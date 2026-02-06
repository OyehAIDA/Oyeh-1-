export async function POST(request) {
  try {
    const body = await request.json();
    const { a, b, op } = body || {};
    const A = Number(a);
    const B = Number(b);

    if (!Number.isFinite(A) || !Number.isFinite(B)) {
      return Response.json({ error: "a and b must be valid numbers" }, { status: 400 });
    }
    if (!["+","-","*","/"].includes(op)) {
      return Response.json({ error: "op must be one of +, -, *, /" }, { status: 400 });
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
  } catch (_e) {
    return Response.json({ error: "invalid JSON body" }, { status: 400 });
  }
}

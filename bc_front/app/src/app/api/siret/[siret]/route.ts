// app/api/siret/[siret]/route.ts — SIRENE via clé API (sans OAuth)
import { NextResponse } from 'next/server';

const INSEE_SIRENE_BASE_URL = 'https://api.insee.fr/api-sirene/3.11';

export async function GET(request: Request, { params }: { params: { siret: string } }) {
  try {
    const apiKey = process.env.INSEE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'INSEE_API_KEY is missing' }, { status: 500 });
    }

    const resolvedParams = await Promise.resolve(params);
    const siret = resolvedParams?.siret;

    if (!siret || !/^\d{14}$/.test(siret)) {
      return NextResponse.json(
        { error: 'SIRET invalide ou absent. Il doit contenir 14 chiffres.' },
        { status: 400 }
      );
    }

    const response = await fetch(`${INSEE_SIRENE_BASE_URL}/siret/${siret}`, {
      headers: {
        'X-INSEE-Api-Key-Integration': apiKey,
        Accept: 'application/json'
      }
    });

    const rawBody = await response.text();
    let parsedBody: unknown = rawBody;

    try {
      parsedBody = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      parsedBody = { message: rawBody };
    }

    return NextResponse.json(parsedBody, { status: response.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

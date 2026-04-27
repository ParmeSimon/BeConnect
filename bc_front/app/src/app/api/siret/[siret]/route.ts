// app/api/sirene/[siret]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { siret: string } }) {
  const siret = params.siret;
  
  // Ici, la clé n'est PAS "PUBLIC", elle reste sur ton serveur
  const apiKey = process.env.INSEE_API_KEY; 

  const response = await fetch(`https://api.insee.fr/entreprises/sirene/V3.11/siret/${siret}`, {
    headers: {
      'X-INSEE-Api-Key-Authentication': `Bearer ${apiKey}`,
      'Accept': 'application/json'
    }
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
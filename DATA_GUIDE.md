# Panduan Integrasi Data Dinamis

Dokumen ini menjelaskan cara mengintegrasikan data dinamis ke dalam dashboard.

## Lokasi Data

Data dummy saat ini berada di `data/dashboards.ts`. File ini berisi:
- `dashboards` - Array dashboard untuk grid
- `latestDashboards` - Array untuk carousel
- `highlightCards` - Array untuk cards statistik
- `mapData` - Array untuk data peta

## Cara Mengganti Data

### 1. Data dari Static File

Ubah file `data/dashboards.ts` dengan data Anda:

```typescript
export const dashboards: Dashboard[] = [
  {
    id: 'custom-id',
    title: 'Nama Dashboard',
    description: 'Deskripsi dashboard',
    category: 'Kategori',
    image: '/images/custom-image.jpg',
    featured: true,
  },
  // ... tambahkan lebih banyak dashboard
];
```

### 2. Data dari API

#### A. Fetch di Page (Server Component)

```typescript
// app/page.tsx
async function getDashboards() {
  const res = await fetch('https://api.example.com/dashboards');
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}

export default async function Home() {
  const dashboards = await getDashboards();
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <DashboardGrid dashboards={dashboards} />
      </main>
      <Footer />
    </div>
  );
}
```

#### B. Fetch di Client Component

```typescript
// components/DashboardGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import { Dashboard } from '@/types';

export default function DashboardGrid() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/dashboards')
      .then(res => res.json())
      .then(data => {
        setDashboards(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-16 px-6 bg-white">
      {/* ... komponen dashboard */}
    </section>
  );
}
```

### 3. Data dari Database

#### Menggunakan Prisma

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDashboards() {
  return await prisma.dashboard.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
}

// app/page.tsx
import { getDashboards } from '@/lib/prisma';

export default async function Home() {
  const dashboards = await getDashboards();
  // ...
}
```

### 4. Data dari CMS

#### Menggunakan Sanity/Strapi/Contentful

```typescript
// lib/cms.ts
export async function getDashboards() {
  // Implementasi fetch dari CMS
  const query = `*[_type == "dashboard"]`;
  const data = await sanityClient.fetch(query);
  return data;
}
```

## Format Data

### Dashboard Object

```typescript
interface Dashboard {
  id: string;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  link?: string;
  featured?: boolean;
}
```

### Highlight Card Object

```typescript
interface HighlightCard {
  id: string;
  title: string;
  icon?: string;
  metrics: Array<{
    label: string;
    value: string;
    year?: string;
  }>;
  bgColor?: string;
  textColor?: string;
}
```

### Latest Dashboard Object

```typescript
interface LatestDashboard {
  id: string;
  title: string;
  description: string;
  image: string;
  logo1?: string;
  logo2?: string;
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string;
}
```

## Contoh Implementasi

### Contoh: REST API

```typescript
// lib/api.ts
const API_URL = process.env.API_URL || 'https://api.example.com';

export async function getDashboards(): Promise<Dashboard[]> {
  const response = await fetch(`${API_URL}/dashboards`);
  return response.json();
}

export async function getHighlightCards(): Promise<HighlightCard[]> {
  const response = await fetch(`${API_URL}/highlights`);
  return response.json();
}
```

### Contoh: GraphQL

```typescript
// lib/graphql.ts
const QUERY = `
  query GetDashboards {
    dashboards {
      id
      title
      description
      category
      image
    }
  }
`;

export async function getDashboards() {
  const response = await fetch('https://api.example.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY }),
  });
  
  const { data } = await response.json();
  return data.dashboards;
}
```

## Loading States

Tambahkan loading state untuk pengalaman lebih baik:

```typescript
export default function DashboardGrid() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboards')
      .then(res => res.json())
      .then(data => {
        setDashboards(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <DashboardGridContent dashboards={dashboards} />;
}
```

## Error Handling

Selalu tambahkan error handling:

```typescript
try {
  const dashboards = await fetchDashboards();
  return <DashboardGrid dashboards={dashboards} />;
} catch (error) {
  console.error('Failed to load dashboards:', error);
  return <div>Error loading dashboards</div>;
}
```

## Environment Variables

Gunakan environment variables untuk URL API:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

```typescript
// app/config.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
```



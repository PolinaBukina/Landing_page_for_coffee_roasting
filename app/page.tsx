import { LeadForm } from '@/components/LeadForm';

export default function Home() {
  return (
    <main style={{ maxWidth: 520, margin: '0 auto', padding: '48px 16px' }}>
      <h1>Заявка</h1>
      <LeadForm />
    </main>
  );
}
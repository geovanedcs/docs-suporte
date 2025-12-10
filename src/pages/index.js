import React from 'react';
import Layout from '@theme/Layout';
import TicketForm from '@site/src/components/TicketForm';

export default function Home() {
  return (
    <Layout
      title="Novo Ticket"
      description="Portal de Automação de Documentação">
      <main>
        <TicketForm />
      </main>
    </Layout>
  );
}
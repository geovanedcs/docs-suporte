import React, { useState } from 'react';

export default function TicketForm() {
  const [formData, setFormData] = useState({
    resumo: '',
    scribeLink: '',
    esperado: '',
    atual: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Enviando para o n8n...');

    try {
      // ⚠️ IMPORTANTE: Você vai substituir isso depois pelo seu Webhook real do n8n
      const webhookUrl = 'https://n8n.omnidevs.com.br/webhook/criar-ticket'; 
      
      // Simulando envio para teste (remova este setTimeout quando tiver o n8n)
      // await new Promise(r => setTimeout(r, 1000)); 
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('✅ Ticket criado com sucesso! O sistema está processando.');
        setFormData({ resumo: '', scribeLink: '', esperado: '', atual: '' });
      } else {
        setStatus('❌ Erro ao enviar. Verifique o console.');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Erro de conexão (CORS ou URL inválida).');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Abertura de Chamado</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Preencha os dados abaixo. O sistema irá gerar a documentação automaticamente.
      </p>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--ifm-background-surface-color)', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        
        <div>
          <label style={labelStyle}>🔍 Resumo do Problema</label>
          <input 
            type="text" 
            name="resumo" 
            required 
            placeholder="Ex: Erro ao imprimir etiqueta ZPL"
            value={formData.resumo} 
            onChange={handleChange} 
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>🧪 Link do Scribe (Passo a Passo)</label>
          <input 
            type="url" 
            name="scribeLink" 
            placeholder="Cole o link do Scribe (Deixe vazio se não houver)"
            value={formData.scribeLink} 
            onChange={handleChange} 
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>✅ Comportamento Esperado</label>
          <textarea 
            name="esperado" 
            required 
            rows="3"
            placeholder="O que deveria acontecer?"
            value={formData.esperado} 
            onChange={handleChange} 
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>❗ Comportamento Atual</label>
          <textarea 
            name="atual" 
            required 
            rows="3"
            placeholder="O que está acontecendo de errado?"
            value={formData.atual} 
            onChange={handleChange} 
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#25c2a0', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
          {loading ? 'Enviando...' : 'Gerar Ticket'}
        </button>
      </form>
      
      {status && (
        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '5px', backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da', color: status.includes('✅') ? '#155724' : '#721c24', textAlign: 'center' }}>
          {status}
        </div>
      )}
    </div>
  );
}
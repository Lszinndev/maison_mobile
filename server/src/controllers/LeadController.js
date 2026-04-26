import pool from '../config/db.js';

export const getLeads = async (req, res) => {
  try {
    // Simulação ou query real
    // const [rows] = await pool.query('SELECT * FROM leads');
    // res.json(rows);
    
    // Mock para não travar sem banco
    res.json([
      { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(21) 99999-9999', status: 'Novo' }
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLead = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    // const [result] = await pool.query('INSERT INTO leads (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    // res.status(201).json({ id: result.insertId, name, email, phone });
    
    res.status(201).json({ id: Date.now(), name, email, phone, status: 'Novo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

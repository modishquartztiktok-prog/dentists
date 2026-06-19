import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_STORE_PATH = path.join(process.cwd(), 'src', 'data_store.json');

// Helper to load data
function loadData() {
  try {
    if (fs.existsSync(DATA_STORE_PATH)) {
      const content = fs.readFileSync(DATA_STORE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data store:', err);
  }
  // Fallback initial state if missing
  return { bookings: [], contacts: [] };
}

// Helper to save data
function saveData(data: any) {
  try {
    fs.writeFileSync(DATA_STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data store:', err);
  }
}

// API ENDPOINTS

// --- Bookings ---
app.get('/api/bookings', (req, res) => {
  const data = loadData();
  res.json(data.bookings || []);
});

app.post('/api/bookings', (req, res) => {
  const data = loadData();
  const newBooking = req.body;
  
  if (!newBooking.patientName || !newBooking.patientEmail || !newBooking.patientPhone || !newBooking.date || !newBooking.timeSlot) {
    return res.status(400).json({ error: 'Missing high-priority fields' });
  }

  // Double slot booking verification
  const bookings = data.bookings || [];
  const isConflict = bookings.some(
    (app: any) => app.date === newBooking.date && app.timeSlot === newBooking.timeSlot && app.dentistId === newBooking.dentistId
  );

  if (isConflict) {
    return res.status(409).json({ error: 'Selected consultation slot is fully committed' });
  }

  const bookingToAdd = {
    id: newBooking.id || `bk-${Math.random().toString(36).substr(2, 9)}`,
    patientName: newBooking.patientName,
    patientEmail: newBooking.patientEmail,
    patientPhone: newBooking.patientPhone,
    serviceId: newBooking.serviceId,
    dentistId: newBooking.dentistId,
    date: newBooking.date,
    timeSlot: newBooking.timeSlot,
    note: newBooking.note || '',
    status: newBooking.status || 'confirmed',
    timestamp: newBooking.timestamp || Date.now()
  };

  data.bookings = [bookingToAdd, ...bookings];
  saveData(data);
  res.status(201).json(bookingToAdd);
});

app.patch('/api/bookings/:id', (req, res) => {
  const data = loadData();
  const bookings = data.bookings || [];
  const { id } = req.params;
  const { status } = req.body;

  const bIndex = bookings.findIndex((b: any) => b.id === id);
  if (bIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings[bIndex].status = status || bookings[bIndex].status;
  data.bookings = bookings;
  saveData(data);
  res.json(bookings[bIndex]);
});

app.delete('/api/bookings/:id', (req, res) => {
  const data = loadData();
  const bookings = data.bookings || [];
  const { id } = req.params;

  data.bookings = bookings.filter((b: any) => b.id !== id);
  saveData(data);
  res.json({ success: true, id });
});

// --- Contacts ---
app.get('/api/contacts', (req, res) => {
  const data = loadData();
  res.json(data.contacts || []);
});

app.post('/api/contacts', (req, res) => {
  const data = loadData();
  const newContact = req.body;

  if (!newContact.name || !newContact.email || !newContact.message) {
    return res.status(400).json({ error: 'Missing required contact components' });
  }

  const contactToAdd = {
    id: `con-${Math.random().toString(36).substr(2, 9)}`,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone || '',
    message: newContact.message,
    date: newContact.date || new Date().toISOString().split('T')[0],
    status: 'unread',
    timestamp: Date.now()
  };

  data.contacts = [contactToAdd, ...(data.contacts || [])];
  saveData(data);
  res.status(201).json(contactToAdd);
});

app.patch('/api/contacts/:id', (req, res) => {
  const data = loadData();
  const contacts = data.contacts || [];
  const { id } = req.params;
  const { status } = req.body;

  const cIndex = contacts.findIndex((c: any) => c.id === id);
  if (cIndex === -1) {
    return res.status(404).json({ error: 'Contact message not found' });
  }

  contacts[cIndex].status = status || contacts[cIndex].status;
  data.contacts = contacts;
  saveData(data);
  res.json(contacts[cIndex]);
});

app.delete('/api/contacts/:id', (req, res) => {
  const data = loadData();
  const contacts = data.contacts || [];
  const { id } = req.params;

  data.contacts = contacts.filter((c: any) => c.id !== id);
  saveData(data);
  res.json({ success: true, id });
});


// MIDDLEWARE GATEKEEPING FOR VITE & FRONTEND

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ivory Dental Server] running on http://localhost:${PORT}`);
  });
}

start();

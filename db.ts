
import { Order, Inquiry } from './types';

const DB_NAME = 'DivineAgencyDB';
const DB_VERSION = 1;
const STORES = {
  ORDERS: 'orders',
  INQUIRIES: 'inquiries'
};

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORES.ORDERS)) {
        db.createObjectStore(STORES.ORDERS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.INQUIRIES)) {
        db.createObjectStore(STORES.INQUIRIES, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveOrder = async (order: Order): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ORDERS, 'readwrite');
    const store = tx.objectStore(STORES.ORDERS);
    store.put(order);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const getAllOrders = async (): Promise<Order[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ORDERS, 'readonly');
    const store = tx.objectStore(STORES.ORDERS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveInquiry = async (inquiry: Inquiry): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.INQUIRIES, 'readwrite');
    const store = tx.objectStore(STORES.INQUIRIES);
    store.put(inquiry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const getAllInquiries = async (): Promise<Inquiry[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.INQUIRIES, 'readonly');
    const store = tx.objectStore(STORES.INQUIRIES);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

import { writable } from 'svelte/store';

export const msgs = writable<{ userk: string, msg: string }[]>([]);
export const ws = new WebSocket(`ws://${process.env.FE_URL}/ws`);

ws.onmessage = (ev) => {
  msgs.update(msg => [...msg, JSON.parse(ev.data)]);
}

export function send(x: string, d: object) {
  ws.send(JSON.stringify({ x, d }));
}
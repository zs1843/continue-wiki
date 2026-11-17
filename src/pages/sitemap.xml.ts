import type { APIRoute } from 'astro';
import { publishedNotes } from '../lib/notes';
export const GET: APIRoute = async ({ site }) => {
  const notes = await publishedNotes();
  const paths = notes.map(note => `/notes/${note.data.slug}/`);
  const urls = site ? paths.map(path => `<url><loc>${new URL(path, site).href.replaceAll('&', '&amp;')}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};

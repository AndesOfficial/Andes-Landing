import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import ironImage from '../assets/iron.jpg';
import washFoldImage from '../assets/wash_fold.jpg';
import washIronImage from '../assets/wash_iron.jpg';
import blazersImage from '../assets/blazers.jpeg';
import shirtImage from '../assets/shirt.jpg';
import tshirtImage from '../assets/tshirts.jpg';
import jeansImage from '../assets/jeans.png';
import trousersImage from '../assets/pants_trousers.jpg';
import jacketImage from '../assets/Jacket.png';
import sweaterImage from '../assets/sweater.jpg';
import mufflerImage from '../assets/muffler.png';
import kurtaImage from '../assets/silk_kurta.jpg';
import skirtImage from '../assets/skirt.jpg';
import sareeImage from '../assets/saree.jpeg';
import sareeEmbroideryImage from '../assets/saree_embroidery.jpg';
import dupattaImage from '../assets/Dupatta.png';
import bedsheetSingleImage from '../assets/bedsheet_single.jpeg';
import bedsheetBlanketImage from '../assets/bedsheet_blanket.jpg';
import curtainImage from '../assets/curtain.jpg';
import cushionImage from '../assets/cushion.jpg';
import blouseImage from '../assets/blouse.jpg';
import leatherJacketImage from '../assets/Jacket Leather.jpg';
import sportsShoesImage from '../assets/Sports_shoes.png';
import shirtPantImage from '../assets/shirt_pant.jpeg';
import loafersImage from '../assets/loafers_sneakers.jpg';
import hoodieImage from '../assets/hoodie.jpg';
import kurtaKurtiImage from '../assets/kurta_kurti.jpg';
import kurtaPajamaImage from '../assets/kurta_pajama.jpg';
import lehengaDesignerImage from '../assets/lahenga_designer.jpg';
import jacketNormalImage from '../assets/normal_jacket.jpg';
import salwarImage from '../assets/salwar.jpg';
import shararaImage from '../assets/sharara.jpg';
import sherwaniImage from '../assets/sherwani.jpg';
import suit3PieceImage from '../assets/suit 3piece.jpg';
import toppImage from '../assets/topp.jpg';
import windowCurtainImage from '../assets/window_curtain.jpg';
import doorCurtainImage from '../assets/Door_curtain.jpg';
import pagdiImage from '../assets/Pagdi.jpg';
import dhotiImage from '../assets/dhoti.jpg';
import joggersImage from '../assets/joggers.jpg';
import lehengaImage from '../assets/lahenga.jpg';
import pillowCoverImage from '../assets/pillowcover.jpg';
import shawlImage from '../assets/shawll.jpg';
import winterCoatImage from '../assets/wintercoat.jpg';
import woolenGlovesImage from '../assets/woolengloves.jpg';

// Reads the shared service catalog (`prices`) — the same list the customer
// app shows and the server prices every order from. Cart names must resolve
// in the server's lookup (fetchPricesByName in andes_now_rider/functions):
// a service is "<serviceName>", a sub-service "<serviceName> (<sub name>)".

// Same values and order as the admin Services page (b2b_website-main).
const CATEGORIES = [
  { key: 'general', name: 'General' },
  { key: 'dry cleaning', name: 'Dry Cleaning' },
  { key: 'household', name: 'Household' },
  { key: 'shoes', name: 'Footwear' },
  { key: 'bags', name: 'Bags' },
  { key: 'premiumgeneral', name: 'Premium General' },
  { key: 'premiumothers', name: 'Premium Others' },
];

// Legacy spellings found in old docs.
const CATEGORY_ALIASES = { g: 'general', footwear: 'shoes' };

// Andes Instant offers exactly these three services (customer app:
// utils/instant_catalog.dart): the doc's Instant rate when set,
// otherwise 2× its General rate.
const INSTANT_MULTIPLIER = 2;
const INSTANT_SPECS = [
  { name: 'Ironing', unit: 'piece', matches: (n) => n === 'ironing' || n === 'iron' },
  { name: 'Wash & Iron', unit: 'kg', matches: (n) => n === 'wash & iron' || n === 'wash and iron' },
  { name: 'Wash & Fold', unit: 'kg', matches: (n) => n === 'wash & fold' || n === 'wash and fold' || n === 'wash & dry' },
];

const slug = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

// Site photos for docs without an `imageUrl`, keyed by slug(serviceName).
const LOCAL_IMAGES = {
  iron: ironImage, ironing: ironImage,
  wash_fold: washFoldImage, wash_iron: washIronImage,
  shirts: shirtImage, t_shirt: tshirtImage, t_shirts_pants: tshirtImage,
  jeans: jeansImage, trousers: trousersImage, shirt_pant: shirtPantImage,
  top: toppImage, skirt: skirtImage, joggers: joggersImage,
  kurta_kurti: kurtaKurtiImage, pajama: kurtaPajamaImage, silk_kurta: kurtaImage, embroidery_kurta: kurtaImage,
  salwar: salwarImage, saree: sareeImage, silk_saree: sareeImage, saree_embroidery: sareeEmbroideryImage,
  blouse: blouseImage, dhoti: dhotiImage, dupatta: dupattaImage, sherwani: sherwaniImage,
  pagdi: pagdiImage, sharara: shararaImage,
  lehenga_normal_std: lehengaImage, lehenga_3_piece: lehengaImage, designer_lehenga: lehengaDesignerImage,
  sweater: sweaterImage, hoodie: hoodieImage, muffler: mufflerImage, shawl: shawlImage,
  winter_coat_long: winterCoatImage, coat: winterCoatImage,
  jacket_leather: leatherJacketImage, jacket_puffer: jacketImage,
  normal_jacket: jacketNormalImage, jacket_normal: jacketNormalImage, jerkin: jacketNormalImage,
  woolen_gloves: woolenGlovesImage, leather_gloves: leatherJacketImage,
  suit_3_piece: suit3PieceImage, blazers: blazersImage,
  window_curtain: windowCurtainImage, door_curtain: doorCurtainImage, curtain: curtainImage,
  bedsheet_single: bedsheetSingleImage, bed_sheet_single: bedsheetSingleImage,
  bedsheet_double: bedsheetBlanketImage, bed_sheet_double: bedsheetBlanketImage,
  bed_cover_single: bedsheetSingleImage, bed_cover_double: bedsheetBlanketImage,
  single_blanket_quilt: bedsheetBlanketImage, double_blanket_quilt: bedsheetBlanketImage,
  blanket_single: bedsheetBlanketImage, blanket_double: bedsheetBlanketImage,
  cushion_cover: cushionImage, pillow_covers: pillowCoverImage, pillow_cover: pillowCoverImage,
  sports_shoes: sportsShoesImage, loafers_sneakers: loafersImage,
};

const num = (v) => (typeof v === 'number' && v > 0 ? v : null);

/** Docs written before `status` existed only carry `isActive`. */
const isActive = (d) =>
  d?.status ? d.status === 'active' : d?.isActive !== false;

const categoryKey = (raw) => {
  const k = String(raw || 'general').trim().toLowerCase();
  return CATEGORY_ALIASES[k] || k;
};

const imageFor = (d, name) => d.imageUrl || LOCAL_IMAGES[slug(name)] || null;

/** The General (regular) rate and unit of a doc, or null when it has none. */
function regularRate(d) {
  const kg = num(d.rateByKg);
  const piece = num(d.rateByPiece) ?? num(d.rateByPair);
  if (piece) {
    return { price: piece, original: num(d.originalRateByPiece), unit: d.unit === 'pair' ? 'pair' : 'piece' };
  }
  if (kg) return { price: kg, original: num(d.originalRateByKg), unit: 'kg' };
  return null;
}

function regularServices(docs) {
  const out = [];
  for (const { id, d } of docs) {
    const name = d.serviceName.trim();
    const category = categoryKey(d.category);
    const order = d.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const base = { mainCategory: category, displayOrder: order, image: imageFor(d, name) };

    const subs = (Array.isArray(d.subServices) ? d.subServices : [])
      .filter((s) => isActive(s) && num(s.rateByPiece))
      .map((s) => ({ ...s, label: String(s.serviceName ?? s.name ?? '').trim() }))
      .filter((s) => s.label);

    const own = regularRate(d);
    // Household docs repeat their cheapest variant as the parent rate.
    if (own && !subs.some((s) => s.rateByPiece === own.price)) {
      out.push({ ...base, id: `${id}_regular`, name, displayName: name, ...own });
    }
    subs.forEach((s, i) => {
      const cartName = `${name} (${s.label})`;
      out.push({
        ...base,
        id: `${id}_sub${i}_regular`,
        name: cartName,
        displayName: cartName,
        price: s.rateByPiece,
        original: num(s.originalRateByPiece),
        unit: 'piece',
      });
    });
  }
  return out;
}

function instantServices(docs) {
  const out = [];
  for (const spec of INSTANT_SPECS) {
    const isKg = spec.unit === 'kg';
    const match = docs.find(({ d }) =>
      spec.matches(d.serviceName.trim().toLowerCase()) &&
      num(isKg ? d.rateByKg : d.rateByPiece));
    if (!match) continue;
    const { id, d } = match;
    const base = num(isKg ? d.rateByKg : d.rateByPiece);
    const original = num(isKg ? d.originalRateByKg : d.originalRateByPiece);
    const instant = num(isKg ? d.instantRateByKg : d.instantRateByPiece);
    out.push({
      id: `${id}_instant`,
      // Cart key must be the doc's own name so the server finds it.
      name: d.serviceName.trim(),
      displayName: spec.name,
      mainCategory: 'general',
      displayOrder: out.length,
      image: imageFor(d, spec.name),
      unit: spec.unit,
      price: instant ?? base * INSTANT_MULTIPLIER,
      original: instant
        ? num(isKg ? d.originalInstantRateByKg : d.originalInstantRateByPiece)
        : (original ? original * INSTANT_MULTIPLIER : null),
      instantOnly: true,
    });
  }
  return out;
}

async function loadCatalog() {
  const snap = await getDocs(collection(db, 'prices'));
  const docs = snap.docs
    .map((doc) => ({ id: doc.id, d: doc.data() }))
    .filter(({ d }) => isActive(d) && String(d.serviceName || '').trim());

  const services = [...regularServices(docs), ...instantServices(docs)]
    .sort((a, b) => a.displayOrder - b.displayOrder || a.displayName.localeCompare(b.displayName));

  const present = new Set(services.map((s) => s.mainCategory));
  const known = CATEGORIES.filter((c) => present.has(c.key));
  const unknown = [...present]
    .filter((k) => !CATEGORIES.some((c) => c.key === k))
    .map((k) => ({ key: k, name: k }));
  const mainCategories = [...known, ...unknown].map((c, id) => ({ ...c, id }));

  return { services, mainCategories };
}

let cached = null;

/** Fetches the catalog once per page load; a failed fetch is retried next time. */
export function fetchServiceCatalog() {
  if (!cached) {
    cached = loadCatalog().catch((err) => {
      cached = null;
      throw err;
    });
  }
  return cached;
}

/** { services, mainCategories, loading, error } for the live catalog. */
export function useServiceCatalog() {
  const [state, setState] = useState({ services: [], mainCategories: [], loading: true, error: null });
  useEffect(() => {
    let alive = true;
    fetchServiceCatalog()
      .then((c) => alive && setState({ ...c, loading: false, error: null }))
      .catch((error) => {
        console.error('Failed to load service catalog:', error);
        if (alive) setState((s) => ({ ...s, loading: false, error }));
      });
    return () => { alive = false; };
  }, []);
  return state;
}

/** Shape OrderContext.addToCart expects. */
export const toCartItem = (service) => ({
  id: service.id,
  name: service.name,
  price: service.price,
  unit: service.unit,
  image: service.image,
});


// Import images
import ironImage from './assets/iron.jpg';
import washFoldImage from './assets/wash_fold.jpg';
import washIronImage from './assets/wash_iron.jpg';
import blazersImage from './assets/blazers.jpeg';
import shirtPantImage from './assets/shirt_pant.jpeg';
import bedsheetSingleImage from './assets/bedsheet_single.jpeg';
import uniformImage from './assets/uniform.jpeg';
import simpleShoesImage from './assets/simple_shoes.jpg';
import loafersSneakersImage from './assets/loafers_sneakers.jpg';
import sareeEmbroideryImage from './assets/saree_embroidery.jpg';
import sareeImage from './assets/saree.jpeg';
import bedsheetBlanketImage from './assets/bedsheet_blanket.jpg';
import blouseImage from './assets/blouse.jpg';
const data = {
    serviceModes: [
      { id: 0, name: "By Piece/Pair", key: "piece" },
      { id: 1, name: "By Kg", key: "kg" }
    ],
    serviceCategories: [
      { id: 0, name: "General", key: "general", discount: 30, noteByKg: "1Kg contains approximately 4 clothes." },
      { id: 1, name: "Dry Cleaning", key: "dry_cleaning", discount: 35, noteByKg: "NOTE: Dry cleaning prices are per piece." },
      { id: 2, name: "Others", key: "others", discount: 35, noteByKg: "NOTE: Specialized cleaning services." }
    ],
    services: [
      {
        "id": 1,
        "name": "IRON",
        "description": "Professional ironing service for wrinkle-free clothes.",
        "categories": ["general"],
        "rateByPiece": 15,
        "discountedRateByPiece": 10,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Iron",
        "customText": "₹15",
        "image": ironImage,
        "discount": 30
      },
      {
        "id": 2,
        "name": "WASH & FOLD",
        "description": "Complete washing and folding service for your clothes.",
        "categories": ["general"],
        "rateByPiece": 0,
        "discountedRateByPiece": 0,
        "rateByKg": 80,
        "discountedRateByKg": 55,
        "unit": "kg",
        "displayName": "Wash & Fold",
        "customText": "₹80",
        "image": washFoldImage,
        "discount": 30
      },
      {
        "id": 3,
        "name": "WASH & IRON",
        "description": "Complete washing and ironing service for crisp garments.",
        "categories": ["general"],
        "rateByPiece": 0,
        "discountedRateByPiece": 0,
        "rateByKg": 110,
        "discountedRateByKg": 75,
        "unit": "kg",
        "displayName": "Wash & Iron",
        "customText": "₹110",
        "image": washIronImage,
        "discount": 30
      },
      {
        "id": 4,
        "name": "BLAZERS",
        "description": "Professional dry cleaning for blazers to maintain their shape.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 310,
        "discountedRateByPiece": 205,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Blazers",
        "customText": "₹205 (35% OFF)",
        "image": blazersImage,
        "discount": 35
      },
      {
        "id": 5,
        "name": "SHIRT & PANT",
        "description": "Dry cleaning service for formal shirts and pants.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 70,
        "discountedRateByPiece": 45,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Shirt & Pant",
        "customText": "₹70",
        "image": shirtPantImage,
        "discount": 35
      },
      {
        "id": 6,
        "name": "BEDSHEET (SINGLE)",
        "description": "Dry cleaning service for single bedsheets.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 190,
        "discountedRateByPiece": 135,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Bedsheet (Single)",
        "customText": "₹190",
        "image": bedsheetSingleImage,
        "discount": 35
      },
      {
        "id": 7,
        "name": "UNIFORM (WASH & IRON)",
        "description": "Professional cleaning service for school and work uniforms.",
        "categories": ["general", "others"],
        "rateByPiece": 100,
        "discountedRateByPiece": 65,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Uniform",
        "customText": "₹100",
        "image": uniformImage,
        "discount": 35
      },
      {
        "id": 8,
        "name": "SIMPLE SHOES",
        "description": "Cleaning service for casual shoes.",
        "categories": ["others"],
        "rateByPiece": 180,
        "discountedRateByPiece": 125,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "pair",
        "displayName": "Simple Shoes",
        "customText": "₹180",
        "image": simpleShoesImage,
        "discount": 35
      },
      {
        "id": 9,
        "name": "LOAFERS/SNEAKERS",
        "description": "Premium cleaning service for loafers and sneakers.",
        "categories": ["others"],
        "rateByPiece": 380,
        "discountedRateByPiece": 265,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "pair",
        "displayName": "Loafers/Sneakers",
        "customText": "₹380",
        "image": loafersSneakersImage,
        "discount": 35
      },
      {
        "id": 10,
        "name": "Saree - Embroidery",
        "description": "Special dry cleaning for embroidered sarees.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 480,
        "discountedRateByPiece": 309,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Saree (Embroidery)",
        "customText": "₹480",
        "image": sareeEmbroideryImage,
        "discount": 35
      },
      {
        "id": 11,
        "name": "Saree",
        "description": "Dry cleaning service for regular sarees.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 310,
        "discountedRateByPiece": 209,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Saree",
        "customText": "₹310",
        "image": sareeImage,
        "discount": 35
      },
      {
        "id": 12,
        "name": "Bedsheet/Blanket",
        "description": "Dry cleaning service for bedsheets and blankets.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 190,
        "discountedRateByPiece": 135,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Bedsheet/Blanket",
        "customText": "₹190",
        "image": bedsheetBlanketImage,
        "discount": 35
      },
      {
        "id": 13,
        "name": "Blouse",
        "description": "Dry cleaning service for blouses.",
        "categories": ["dry_cleaning"],
        "rateByPiece": 55,
        "discountedRateByPiece": 35,
        "rateByKg": 0,
        "discountedRateByKg": 0,
        "unit": "piece",
        "displayName": "Blouse",
        "customText": "₹55",
        "image": blouseImage,
        "discount": 35
      }
    ],
    donationService: {
      name: "Clothing Donation",
      description: "Help those in need with your old clothes",
      rate: 0,
      unit: "donation",
      icon: "♥",
      image: "donation.jpg"
    }
  };
  export default data; // Export as default


// Import images
import ironImage from './assets/iron.jpg';
import washFoldImage from './assets/wash_fold.jpg';
import washIronImage from './assets/wash_iron.jpg';
import blazersImage from './assets/blazers.jpeg';
import shirtImage from './assets/shirt.jpg';
import tshirtImage from './assets/tshirts.jpg';
import jeansImage from './assets/jeans.png';
import trousersImage from './assets/pants_trousers.jpg';
import shortsImage from './assets/shorts.jpg';
import jacketImage from './assets/Jacket.png';
import sweaterImage from './assets/sweater.jpg';
import mufflerImage from './assets/muffler.png';
import kurtaImage from './assets/silk_kurta.jpg';

import skirtImage from './assets/skirt.jpg';
import sareeImage from './assets/saree.jpeg';
import sareeEmbroideryImage from './assets/saree_embroidery.jpg';
import dupattaImage from './assets/Dupatta.png';
import bedsheetSingleImage from './assets/bedsheet_single.jpeg';
import bedsheetBlanketImage from './assets/bedsheet_blanket.jpg';
import curtainImage from './assets/curtain.jpg';
import cushionImage from './assets/cushion.jpg';
import blouseImage from './assets/blouse.jpg';
import bulkyIcon from './assets/bulkyicon.jpg';
import simpleShoesImage from './assets/simple_shoes.jpg';
import uniformImage from './assets/Uniform.jpeg';
import leatherJacketImage from './assets/Jacket Leather.jpg';
import sportsShoesImage from './assets/Sports_shoes.png';
import shirtPantImage from './assets/shirt_pant.jpeg';
import loafersImage from './assets/loafers_sneakers.jpg';
import hoodieImage from './assets/hoodie.jpg';
import kurtaKurtiImage from './assets/kurta_kurti.jpg';
import kurtaPajamaImage from './assets/kurta_pajama.jpg';
import lehengaDesignerImage from './assets/lahenga_designer.jpg';
import jacketNormalImage from './assets/normal_jacket.jpg';
import salwarImage from './assets/salwar.jpg';
import shararaImage from './assets/sharara.jpg';
import sherwaniImage from './assets/sherwani.jpg';
import suit3PieceImage from './assets/suit 3piece.jpg';
import toppImage from './assets/topp.jpg';
import windowCurtainImage from './assets/window_curtain.jpg';

// New images
import doorCurtainImage from './assets/Door_curtain.jpg';
import pagdiImage from './assets/Pagdi.jpg';
import dhotiImage from './assets/dhoti.jpg';
import joggersImage from './assets/joggers.jpg';
import lehengaImage from './assets/lahenga.jpg';
import pillowCoverImage from './assets/pillowcover.jpg';
import shawlImage from './assets/shawll.jpg';
import winterCoatImage from './assets/wintercoat.jpg';
import woolenGlovesImage from './assets/woolengloves.jpg';

const data = {
  serviceModes: [
    { id: 0, name: "By Piece/Pair", key: "piece" },
    { id: 1, name: "By Kg", key: "kg" }
  ],
  mainCategories: [
    { id: 0, name: "General Service", key: "general", icon: "iron" }, // Iron, Wash & Fold, Wash & Iron
    { id: 1, name: "Dry Cleaning", key: "dry_cleaning", icon: "sparkles" }, // Large List
    { id: 2, name: "Shoe Cleaning", key: "shoe_cleaning", icon: "shoes" }, // Specific Shoes
  ],
  subCategories: [
    { id: 0, name: "All", key: "all" },
  ],
  services: [
    // --- 1. GENERAL SERVICE (Iron, Wash & Fold, Wash & Iron) ---
    { id: 101, name: "Wash & Fold", mainCategory: "general", group: "General", rateByKg: 49, fakePrice: 99, unit: "kg", displayName: "Wash & Fold", customText: "₹49/kg", image: washFoldImage, badge: "Wash & Fold", featured: true },
    { id: 102, name: "Wash & Iron", mainCategory: "general", group: "General", rateByKg: 79, fakePrice: 129, unit: "kg", displayName: "Wash & Iron", customText: "₹79/kg", image: washIronImage, badge: "Wash & Iron", featured: true },
    { id: 103, name: "Iron Only", mainCategory: "general", group: "General", rateByPiece: 12, fakePrice: 18, unit: "piece", displayName: "Iron Only", customText: "₹12/item", image: ironImage, badge: "Iron Only", featured: true },


    // --- 2. DRY CLEANING (The Big List) ---
    // Ethnic Wear
    { id: 222, name: "Kurta Pajama", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 149, fakePrice: 215, unit: "set", displayName: "Kurta Pajama", image: kurtaPajamaImage, badge: "Dry Clean" },
    { id: 220, name: "Kurta", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 99, fakePrice: 200, unit: "piece", displayName: "Kurta", image: kurtaImage, badge: "Dry Clean" },
    { id: 303, name: "Kurti", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 99, fakePrice: 200, unit: "piece", displayName: "Kurti", image: kurtaKurtiImage, badge: "Dry Clean" },
    { id: 332, name: "Saree", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 199, fakePrice: 285, unit: "piece", displayName: "Saree", image: sareeImage, badge: "Dry Clean" },
    { id: 333, name: "Saree Embroidery", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 499, fakePrice: 715, unit: "piece", displayName: "Saree (Embroidery)", image: sareeEmbroideryImage, badge: "Dry Clean" },
    { id: 326, name: "Blouse", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 69, fakePrice: 99, unit: "piece", displayName: "Blouse", image: blouseImage, badge: "Dry Clean" },
    { id: 330, name: "Lehenga", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 349, fakePrice: 500, unit: "piece", displayName: "Lehenga", image: lehengaImage, badge: "Dry Clean" },
    { id: 340, name: "Designer Lehenga", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 699, fakePrice: 1000, unit: "piece", displayName: "Designer Lehenga", image: lehengaDesignerImage, badge: "Dry Clean" },
    { id: 224, name: "Dhoti", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 69, fakePrice: 100, unit: "piece", displayName: "Dhoti", image: dhotiImage, badge: "Dry Clean" },
    { id: 226, name: "Sherwani", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 349, fakePrice: 500, unit: "piece", displayName: "Sherwani", image: sherwaniImage, badge: "Dry Clean" },
    { id: 229, name: "Pagdi", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 79, fakePrice: 113, unit: "piece", displayName: "Pagdi", image: pagdiImage, badge: "Dry Clean" },
    { id: 322, name: "Salwar", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 69, fakePrice: 100, unit: "piece", displayName: "Salwar", image: salwarImage, badge: "Dry Clean" },
    { id: 310, name: "Sharara", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 299, fakePrice: 430, unit: "piece", displayName: "Sharara", image: shararaImage, badge: "Dry Clean" },
    { id: 324, name: "Dupatta", mainCategory: "dry_cleaning", group: "Ethnic Wear", rateByPiece: 49, fakePrice: 89, unit: "piece", displayName: "Dupatta", image: dupattaImage, badge: "Dry Clean" },

    // Winter Wear
    { id: 240, name: "Sweater", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 149, fakePrice: 215, unit: "piece", displayName: "Sweater", image: sweaterImage, badge: "Dry Clean" },
    { id: 241, name: "Hoodie", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 149, fakePrice: 215, unit: "piece", displayName: "Hoodie", image: hoodieImage, badge: "Dry Clean" },
    { id: 242, name: "Muffler", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 99, fakePrice: 149, unit: "piece", displayName: "Muffler", image: mufflerImage, badge: "Dry Clean" },
    { id: 243, name: "Shawl", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 199, fakePrice: 400, unit: "piece", displayName: "Shawl", image: shawlImage, badge: "Dry Clean" },
    { id: 253, name: "Winter Coat", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 299, fakePrice: 399, unit: "piece", displayName: "Winter Coat", image: winterCoatImage, badge: "Dry Clean" },
    { id: 269, name: "Jacket Leather", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 699, fakePrice: 1000, unit: "piece", displayName: "Leather Jacket", image: leatherJacketImage, badge: "Dry Clean" },
    { id: 246, name: "Jacket Puffer", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 249, fakePrice: 355, unit: "piece", displayName: "Puffer Jacket", image: jacketImage, badge: "Dry Clean" },
    { id: 244, name: "Normal Jacket", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 149, fakePrice: 215, unit: "piece", displayName: "Normal Jacket", image: jacketNormalImage, badge: "Dry Clean" },
    { id: 270, name: "Woolen Gloves", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 49, fakePrice: 99, unit: "pair", displayName: "Woolen Gloves", image: woolenGlovesImage, badge: "Dry Clean" },
    { id: 271, name: "Leather Gloves", mainCategory: "dry_cleaning", group: "Winter Wear", rateByPiece: 329, fakePrice: 470, unit: "pair", displayName: "Leather Gloves", image: leatherJacketImage, badge: "Dry Clean" },

    // Daily / Formal
    { id: 263, name: "Suit", mainCategory: "dry_cleaning", group: "Formal", rateByPiece: 449, fakePrice: 599, unit: "set", displayName: "Suit", image: suit3PieceImage, badge: "Dry Clean" },
    { id: 260, name: "Blazer", mainCategory: "dry_cleaning", group: "Formal", rateByPiece: 249, fakePrice: 350, unit: "piece", displayName: "Blazer", image: blazersImage, badge: "Dry Clean" },
    { id: 204, name: "Trouser", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 49, fakePrice: 70, unit: "piece", displayName: "Trouser", image: trousersImage, badge: "Dry Clean" },
    { id: 213, name: "Shirt & Pant", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 49, fakePrice: 70, unit: "set", displayName: "Shirt & Pant Combo", image: shirtPantImage, badge: "Dry Clean" },
    { id: 203, name: "Jeans", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 59, fakePrice: 120, unit: "piece", displayName: "Jeans", image: jeansImage, badge: "Dry Clean" },
    { id: 301, name: "Top", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 49, fakePrice: 100, unit: "piece", displayName: "Top", image: toppImage, badge: "Dry Clean" },
    { id: 202, name: "T-Shirt", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 49, fakePrice: 100, unit: "piece", displayName: "T-Shirt", image: tshirtImage, badge: "Dry Clean" },
    { id: 208, name: "Joggers", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 149, fakePrice: 213, unit: "piece", displayName: "Joggers", image: joggersImage, badge: "Dry Clean" },
    { id: 307, name: "Skirt", mainCategory: "dry_cleaning", group: "Daily / Formal", rateByPiece: 49, fakePrice: 50, unit: "piece", displayName: "Skirt", image: skirtImage, badge: "Dry Clean" },

    // Household
    { id: 513, name: "Window Curtain", mainCategory: "dry_cleaning", group: "Household", rateByPiece: 149, fakePrice: 300, unit: "piece", displayName: "Window Curtain", image: windowCurtainImage, badge: "Dry Clean" },
    { id: 529, name: "Door Curtain", mainCategory: "dry_cleaning", group: "Household", rateByPiece: 199, fakePrice: 299, unit: "piece", displayName: "Door Curtain", image: doorCurtainImage, badge: "Dry Clean" },
    { id: 507, name: "Single Bedsheet/Blanket", mainCategory: "dry_cleaning", group: "Household", rateByPiece: 149, fakePrice: 213, unit: "piece", displayName: "Single Bedsheet/Blanket", image: bedsheetSingleImage, badge: "Dry Clean" },
    { id: 508, name: "Double Bedsheet", mainCategory: "dry_cleaning", group: "Household", rateByPiece: 289, fakePrice: 415, unit: "piece", displayName: "Double Bedsheet", image: bedsheetBlanketImage, badge: "Dry Clean" },
    { id: 512, name: "Cushion", mainCategory: "dry_cleaning", group: "Household", rateByPiece: 69, fakePrice: 100, unit: "piece", displayName: "Cushion", image: cushionImage, badge: "Dry Clean" },
    { id: 511, name: "Pillow Cover", mainCategory: "dry_cleaning", group: "Household", rateByPiece: 29, fakePrice: 42, unit: "piece", displayName: "Pillow Cover", image: pillowCoverImage, badge: "Dry Clean" },


    // --- 3. SHOE CLEANING (Specific Items Only) ---
    { id: 407, name: "Sports Shoes", mainCategory: "shoe_cleaning", group: "Shoes", rateByPiece: 199, fakePrice: 213, unit: "pair", displayName: "Sports Shoes", image: sportsShoesImage, badge: "Shoe Care" },
    { id: 406, name: "Loafers / Sneakers", mainCategory: "shoe_cleaning", group: "Shoes", rateByPiece: 249, fakePrice: 285, unit: "pair", displayName: "Loafers / Sneakers", image: loafersImage, badge: "Shoe Care" },


  ],
  donationService: {
    name: "Clothing Donation",
    description: "Help those in need with your old clothes",
    rate: 0,
    unit: "donation",
    icon: "heart",
    image: "donation.jpg"
  }
};

export default data;

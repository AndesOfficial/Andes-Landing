import { FaTshirt } from 'react-icons/fa';
import washicon from "../assets/washicon.svg";
import drycleaning from "../assets/drycleaningicon.svg";
import bulkyicon from "../assets/bulkyicon.jpg";
import ironicon from "../assets/ironicon.svg";
import shoeicon from "../assets/shoeicon.svg";

// Data for OrderPlacement.jsx
export const quickServices = [
    { id: 'wash-fold', name: 'Wash & Fold', price: 1.5, unit: 'kg', icon: <FaTshirt />, desc: 'Regular laundry, washed, dried, and folded.' },
    { id: 'dry-clean', name: 'Dry Clean', price: 5.0, unit: 'item', icon: <FaTshirt />, desc: 'Delicate items cleaned with care.' },
    { id: 'ironing', name: 'Ironing', price: 2.0, unit: 'item', icon: <FaTshirt />, desc: 'Professional steam ironing.' },
    { id: 'bedding', name: 'Bedding', price: 8.0, unit: 'set', icon: <FaTshirt />, desc: 'Comforters, sheets, and blankets.' },
];

// Data for ServicesPage.jsx
export const servicesPricingData = [
    {
        icon: washicon,
        title: "Wash",
        description: "For everyday laundry, bedsheets and towels.",
        actualPrice: 59,
        fakePrice: 85,
        priceInfo: "₹59 / kg",
    },
    {
        icon: ironicon,
        title: "Wash & Iron",
        description: "For everyday laundry that requires ironing.",
        actualPrice: 79,
        fakePrice: 115,
        priceInfo: "from ₹79 / kg",
    },
    {
        icon: ironicon,
        title: "Only Iron",
        description: "For clothes that only need ironing and no washing.",
        actualPrice: 9,
        fakePrice: 12,
        priceInfo: "from ₹9 / piece",
    },
    {
        icon: drycleaning,
        title: "Blankets & Dry Cleaning",
        description: "For delicate items that require dry cleaning.",
        actualPrice: 209,
        fakePrice: 279,
        priceInfo: "from ₹209 / piece",
    },
    {
        icon: bulkyicon,
        title: "Bedsheet (single) cleaning",
        description: "For single bedsheets that require cleaning.",
        actualPrice: 139,
        fakePrice: 185,
        priceInfo: "from ₹139 / piece",
    },
    {
        icon: bulkyicon,
        title: "Bedsheet (double) cleaning",
        description: "For double bedsheets that require cleaning.",
        actualPrice: 269,
        fakePrice: 359,
        priceInfo: "from ₹269 / piece",
    },
    {
        icon: bulkyicon,
        title: "Blanket (single) cleaning",
        description: "For single blankets that require cleaning.",
        actualPrice: 139,
        fakePrice: 185,
        priceInfo: "from ₹139 / piece",
    },
    {
        icon: bulkyicon,
        title: "Blanket (double) cleaning",
        description: "For double blankets that require cleaning.",
        actualPrice: 269,
        fakePrice: 359,
        priceInfo: "from ₹269 / piece",
    },
    {
        icon: drycleaning,
        title: "Saree (without works) cleaning",
        description: "For sarees without works that require cleaning.",
        actualPrice: 209,
        fakePrice: 279,
        priceInfo: "from ₹209 / piece",
    },
    {
        icon: drycleaning,
        title: "Saree (with works) cleaning",
        description: "For sarees with works that require cleaning.",
        actualPrice: 309,
        fakePrice: 412,
        priceInfo: "from ₹309 / piece",
    },
    {
        icon: shoeicon,
        title: "Shoe (general) cleaning",
        description: "For general shoes that need cleaning.",
        actualPrice: 259,
        fakePrice: 345,
        priceInfo: "from ₹259 / pair",
    },
    {
        icon: shoeicon,
        title: "Shoe (Loafers) cleaning",
        description: "For loafers that need cleaning.",
        actualPrice: 259,
        fakePrice: 345,
        priceInfo: "from ₹259 / pair",
    },
    {
        icon: shoeicon,
        title: "Shoe (Sneakers) cleaning",
        description: "For sneakers that need cleaning.",
        actualPrice: 259,
        fakePrice: 345,
        priceInfo: "from ₹259 / pair",
    }
];

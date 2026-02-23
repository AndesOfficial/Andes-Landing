import { FaTshirt, FaWater, FaSteam, FaShoePrints, FaLayerGroup } from 'react-icons/fa';

// Data for OrderPlacement.jsx
export const quickServices = [
    { id: 'wash-fold', name: 'Wash & Fold', price: 69, unit: 'kg', icon: <FaTshirt />, desc: 'Regular laundry, washed, dried, and folded.' },
    { id: 'wash', name: 'Wash ', price: 69, unit: 'Kg', icon: <FaTshirt />, desc: 'Delicate items cleaned with care.' },
    { id: 'iron', name: 'Iron', price: 12, unit: 'piece', icon: <FaTshirt />, desc: 'Professional steam ironing.' },
    { id: 'wash-iron', name: 'Wash & Iron', price: 89, unit: 'kg', icon: <FaTshirt />, desc: 'Comforters, sheets, and blankets.' },
];

// Data for ServicesPage.jsx
export const servicesPricingData = [
    {
        icon: <FaWater />,
        title: "Wash & Fold",
        description: "For everyday laundry, washed, dried, and folded.",
        actualPrice: 49,
        fakePrice: 99,
        priceInfo: "₹49 / kg",
    },
    {
        icon: <FaTshirt />,
        title: "Wash & Iron",
        description: "For everyday laundry that requires ironing.",
        actualPrice: 79,
        fakePrice: 129,
        priceInfo: "from ₹79 / kg",
    },
    {
        icon: <FaSteam />,
        title: "Only Iron",
        description: "For clothes that only need ironing and no washing.",
        actualPrice: 12,
        fakePrice: 18,
        priceInfo: "from ₹12 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Kurta Pajama",
        description: "Professional dry cleaning for ethnic sets.",
        actualPrice: 149,
        fakePrice: 215,
        priceInfo: "from ₹149 / set",
    },
    {
        icon: <FaLayerGroup />,
        title: "Single Bedsheet/Blanket",
        description: "Cleaning for single bedsheets or blankets.",
        actualPrice: 149,
        fakePrice: 213,
        priceInfo: "from ₹149 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Double Bedsheet",
        description: "Cleaning for double bedsheets.",
        actualPrice: 289,
        fakePrice: 415,
        priceInfo: "from ₹289 / piece",
    },
    {
        icon: <FaTshirt />,
        title: "Saree",
        description: "Dry cleaning for normal sarees.",
        actualPrice: 199,
        fakePrice: 285,
        priceInfo: "from ₹199 / piece",
    },
    {
        icon: <FaTshirt />,
        title: "Saree Embroidery",
        description: "Specialized care for embroidered sarees.",
        actualPrice: 499,
        fakePrice: 715,
        priceInfo: "from ₹499 / piece",
    },
    {
        icon: <FaShoePrints />,
        title: "Sports Shoes",
        description: "Premium cleaning for sports and walking shoes.",
        actualPrice: 199,
        fakePrice: 213,
        priceInfo: "from ₹199 / pair",
    },
    {
        icon: <FaShoePrints />,
        title: "Loafers / Sneakers",
        description: "Detailed cleaning for loafers and sneakers.",
        actualPrice: 249,
        fakePrice: 285,
        priceInfo: "from ₹249 / pair",
    }
];


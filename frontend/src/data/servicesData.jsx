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
        title: "Wash",
        description: "For everyday laundry, bedsheets and towels.",
        actualPrice: 59,
        fakePrice: 85,
        priceInfo: "₹59 / kg",
    },
    {
        icon: <FaTshirt />,
        title: "Wash & Iron",
        description: "For everyday laundry that requires ironing.",
        actualPrice: 79,
        fakePrice: 115,
        priceInfo: "from ₹79 / kg",
    },
    {
        icon: <FaSteam />,
        title: "Only Iron",
        description: "For clothes that only need ironing and no washing.",
        actualPrice: 9,
        fakePrice: 12,
        priceInfo: "from ₹9 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Blankets & Dry Cleaning",
        description: "For delicate items that require dry cleaning.",
        actualPrice: 209,
        fakePrice: 279,
        priceInfo: "from ₹209 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Bedsheet (single) cleaning",
        description: "For single bedsheets that require cleaning.",
        actualPrice: 139,
        fakePrice: 185,
        priceInfo: "from ₹139 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Bedsheet (double) cleaning",
        description: "For double bedsheets that require cleaning.",
        actualPrice: 269,
        fakePrice: 359,
        priceInfo: "from ₹269 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Blanket (single) cleaning",
        description: "For single blankets that require cleaning.",
        actualPrice: 139,
        fakePrice: 185,
        priceInfo: "from ₹139 / piece",
    },
    {
        icon: <FaLayerGroup />,
        title: "Blanket (double) cleaning",
        description: "For double blankets that require cleaning.",
        actualPrice: 269,
        fakePrice: 359,
        priceInfo: "from ₹269 / piece",
    },
    {
        icon: <FaTshirt />,
        title: "Saree (without works) cleaning",
        description: "For sarees without works that require cleaning.",
        actualPrice: 209,
        fakePrice: 279,
        priceInfo: "from ₹209 / piece",
    },
    {
        icon: <FaTshirt />,
        title: "Saree (with works) cleaning",
        description: "For sarees with works that require cleaning.",
        actualPrice: 309,
        fakePrice: 412,
        priceInfo: "from ₹309 / piece",
    },
    {
        icon: <FaShoePrints />,
        title: "Shoe (general) cleaning",
        description: "For general shoes that need cleaning.",
        actualPrice: 259,
        fakePrice: 345,
        priceInfo: "from ₹259 / pair",
    },
    {
        icon: <FaShoePrints />,
        title: "Shoe (Loafers) cleaning",
        description: "For loafers that need cleaning.",
        actualPrice: 259,
        fakePrice: 345,
        priceInfo: "from ₹259 / pair",
    },
    {
        icon: <FaShoePrints />,
        title: "Shoe (Sneakers) cleaning",
        description: "For sneakers that need cleaning.",
        actualPrice: 259,
        fakePrice: 345,
        priceInfo: "from ₹259 / pair",
    }
];

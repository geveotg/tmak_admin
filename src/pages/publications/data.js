export let data = {
    count: 3,
    currentPage: 1,
    totalPages: 1,

    message: [
        {
            id: 1,
            category_id: 1,
            name: "name",
            style: "Flip-flop",
            color: "red",
            brand: "Nike",
            weather: "summer",
            material: "Rubber",
            priceForSimplePurchase: 10,
            priceForWholesalePurchase: 8,
            quantitYresultSpurchases: 20,
            sizes: [
                { id: Math.random(), size: "41", count: 10 },
                { id: Math.random(), size: "42", count: 20 },
                { id: Math.random(), size: "43", count: 30 },
                { id: Math.random(), size: "44", count: 45 },
            ],

            images: [
                {
                    id: 1,
                    url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nikko_black_sandal.jpg",
                },
                {
                    id: 2,
                    url: "https://example.com/images/sandal-1-photo-2.jpg",
                },
                {
                    id: 3,
                    url: "https://example.com/images/sandal-1-photo-3.jpg",
                },
            ],
        },
        {
            id: 2,
            category_id: 2,
            name: "name",
            style: "Sport",
            brand: "Armani",
            color: "red",
            weather: "summer",
            material: "Synthetic",
            priceForSimplePurchase: 15,
            priceForWholesalePurchase: 12,
            sizes: [
                { id: Math.random(), size: "41", count: 10 },
                { id: Math.random(), size: "42", count: 20 },
                { id: Math.random(), size: "43", count: 30 },
                { id: Math.random(), size: "44", count: 45 },
            ],
            images: [
                {
                    id: 4,
                    url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nikko_black_sandal.jpg",
                },
                {
                    id: 5,
                    url: "https://example.com/images/sandal-2-photo-2.jpg",
                },
                {
                    id: 6,
                    url: "https://example.com/images/sandal-2-photo-3.jpg",
                },
            ],
        },
        {
            id: 3,
            category_id: 1,
            name: "name",
            style: "Sandal",
            brand: "Zara",
            color: "red",
            weather: "summer",
            material: "Leather",
            priceForSimplePurchase: 20,
            priceForWholesalePurchase: 16,
            sizes: [
                { id: Math.random(), size: "41", count: 10 },
                { id: Math.random(), size: "42", count: 20 },
                { id: Math.random(), size: "43", count: 30 },
                { id: Math.random(), size: "44", count: 45 },
            ],
            images: [
                {
                    id: 7,
                    url: "https://example.com/images/sandal-3-photo-1.jpg",
                },
                {
                    id: 8,
                    url: "https://example.com/images/sandal-3-photo-2.jpg",
                },
                {
                    id: 9,
                    url: "https://example.com/images/sandal-3-photo-3.jpg",
                },
            ],
        },
    ],
};

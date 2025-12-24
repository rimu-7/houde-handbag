export const homeData = {
  en: {
    hero: {
      title: "Exquisite Craftsmanship, Timeless Classics",
      subtitle:
        "From heavy-duty tool bags to precision digital cases. We are a comprehensive enterprise integrating R&D, production, and sales, serving top-tier global brands since 2014.",
      cta: "Explore Collection",
    },
    sections: [
      {
        title: "Exquisite Craftsmanship",
        description:
          "Trusted by industry giants like Milwaukee and RYOBI. We manufacture heavy-duty tool kits, rolling bags, and organizers using reinforced nylon and canvas for maximum durability.",
        cta: "Learn More",
      },
      {
        title: "Modern Design",
        description:
          "Blending classic aesthetics with contemporary fashion elements, our designs are both practical and artistic, suitable for various occasions.",
        cta: "Learn More",
      },
      {
        title: "Sustainable Materials",
        description:
          "We are committed to environmental protection, using sustainably sourced leather and recyclable materials to find a balance between fashion and eco-friendliness.",
        cta: "Learn More",
      },
    ],
    achievements: {
      title: "Our Achievements",
      stats: [
        { number: "500", label: "Handcrafted Bags" },
        { number: "500", label: "Satisfied Customers" },
        { number: "500", label: "Design Awards" },
      ],
    },
    productCategories: {
      title: "Product Series",
      categories: [
        { name: "Business Series", count: "45 styles" },
        { name: "Casual Series", count: "32 styles" },
        { name: "Travel Series", count: "28 styles" },
        { name: "Limited Series", count: "12 styles" },
      ],
    },
    footer: {
      companyName: "Exquisite Leather Goods Co., Ltd.",
      copyright: "© {{year}} Exquisite Craftsmanship All Rights Reserved",
    },
  },
  zh: {
    hero: {
      title: "匠心打造 永恒经典",
      subtitle:
        "从重型工具包到精密数码收纳，我们是一家集研发、生产、销售于一体的综合性企业，自2014年起服务于全球顶尖品牌。",
      cta: "探索系列",
    },
    sections: [
      {
        title: "精湛工艺",
        description:
          "深受 Milwaukee 和 RYOBI 等行业巨头信赖。我们使用强化尼龙和帆布制造重型工具包、拉杆包和收纳件，确保极致耐用。",
        cta: "了解更多",
      },
      {
        title: "现代设计",
        description:
          "融合经典美学与现代时尚元素，我们的设计既实用又具艺术感，适合各种场合。",
        cta: "了解更多",
      },
      {
        title: "可持续材料",
        description:
          "我们致力于环保，采用可持续来源的皮革和可回收材料，在时尚与环保之间找到平衡。",
        cta: "了解更多",
      },
    ],
    achievements: {
      title: "我们的成就",
      stats: [
        { number: "500", label: "手工制作包袋" },
        { number: "500", label: "满意客户" },
        { number: "500", label: "设计奖项" },
      ],
    },
    productCategories: {
      title: "产品系列",
      categories: [
        { name: "商务系列", count: "45种款式" },
        { name: "休闲系列", count: "32种款式" },
        { name: "旅行系列", count: "28种款式" },
        { name: "限量系列", count: "12种款式" },
      ],
    },
    footer: {
      companyName: "精品皮具有限公司",
      copyright: "© {{year}} 匠心打造 版权所有",
    },
  },
};

// Image URLs (language independent)
export const homeImages = {
  heroVideo: "https://www.pexels.com/download/video/8760183/",
  sectionImages: [
    "https://res.cloudinary.com/drnascc38/image/upload/v1766603866/2_xixhg1.jpg",
    "https://res.cloudinary.com/drnascc38/image/upload/v1766605240/20-removebg-preview_usejxw.png",
    "https://res.cloudinary.com/drnascc38/image/upload/v1766143402/Picsart_25-12-19_19-07-21-139_tahwbk.png",
  ],
  categoryImages: [
    "https://res.cloudinary.com/drnascc38/image/upload/v1766143404/Picsart_25-12-19_19-06-32-364_eh2x8p.png",
    "https://res.cloudinary.com/drnascc38/image/upload/v1766604640/c_vfoguh.jpg",
    "https://res.cloudinary.com/drnascc38/image/upload/v1766143402/Picsart_25-12-19_19-10-21-361_dtjqva.png",
    "https://res.cloudinary.com/drnascc38/image/upload/v1766143403/Picsart_25-12-19_19-08-32-516_k2rzdx.png",
  ],
};

// Helper function to get current year for copyright
export function getCurrentYear() {
  return new Date().getFullYear();
}

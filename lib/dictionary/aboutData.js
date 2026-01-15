import {
  Award,
  CheckCircle,
  Factory,
  Globe,
  Shield,
  Users,
} from "lucide-react";

export const content = {
  en: {
    title: "About Houde Handbag",
    subtitle: "Crafting Excellence Since 2014",
    heroTitle: "Your Premier Bag Manufacturer",
    heroDescription:
      "We focus on complete bag production and processing with clear data systems, stable quality control, and efficient manufacturing for global partners.",

    sections: {
      story: {
        title: "Our Story",
        description:
          "Founded in 2014, Houde Handbag Co., Ltd. is a comprehensive handbag enterprise integrating R&D, production and sales. We adopt professional system management with clear and accurate data, ERP operating system, billion-piece production system, and ET paper output system—always focused on complete bag manufacturing.",
        points: [
          "Established in 2014 in  Dongguan",
          "From focused production to full-scale manufacturing",
          "Serving global brands with stable delivery and QC",
          "Continuous upgrades in systems and equipment",
        ],
      },

      mission: {
        title: "Our Mission",
        description:
          "To deliver reliable, high-quality bag manufacturing with efficient development, strict internal testing, and scalable production—helping partners launch faster and grow confidently.",
        points: [
          "Stable quality and consistent workmanship",
          "Fast sampling and development support",
          "Data-driven production management",
          "Long-term partnership mindset",
        ],
      },

      values: {
        title: "Our Values",
        items: [
          {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Quality First",
            description:
              "Every detail matters—materials, stitching, structure, and finishing standards.",
          },
          {
            icon: <Factory className="w-8 h-8" />,
            title: "Manufacturing Strength",
            description:
              "Professional production system and efficient workshop management.",
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Client Partnership",
            description:
              "Clear communication, reliable delivery, and long-term cooperation.",
          },
          {
            icon: <Award className="w-8 h-8" />,
            title: "Continuous Improvement",
            description:
              "We refine processes and equipment to shorten development cycles.",
          },
          {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Service",
            description:
              "Supporting diverse markets with flexible product and packaging needs.",
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: "Certified Management",
            description:
              "Structured management and quality system certification for stable output.",
          },
        ],
      },

      // ✅ NEW: Facilities Photo Grid
      facilities: {
        title: "Facilities & Factory Tour",
        subtitle:
          "A transparent view of our production environment—from development rooms to warehouses and testing equipment.",
        items: [
          {
            label: "Sample Room",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167082/Screenshot_2025-12-20_at_1.50.57_AM_is3sak.png",
          },
          {
            label: "Material Room",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167015/Screenshot_2025-12-20_at_1.51.40_AM_xrcixh.png",
          },
          {
            label: "China Factory",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166923/Screenshot_2025-12-20_at_1.51.19_AM_rcqlfb.png",
          },
          {
            label: "Vietnam Factory",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166923/Screenshot_2025-12-20_at_1.51.51_AM_vhp3xf.png",
          },
          {
            label: "Production Workshop Office",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167015/Screenshot_2025-12-20_at_1.52.22_AM_tnhhp7.png",
          },
          {
            label: "Warehouse",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166935/Screenshot_2025-12-20_at_1.52.39_AM_codvj9.png",
          },
          {
            label: "Testing Machine",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166922/Screenshot_2025-12-20_at_1.53.00_AM_ktaz9s.png",
          },
          {
            label: "Production Line",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167018/Screenshot_2025-12-20_at_1.52.16_AM_fosfij.png",
          },
        ],
      },

      capabilities: {
        title: "Your Premier Bag Manufacturer",
        subtitle: "Factory strength, stable capacity, and proven results.",
        items: [
          {
            title: "Years of Manufacturing",
            value: "11+",
            unit: "Years",
          },
          {
            title: "Success Projects",
            value: "58k+",
            unit: "Projects",
          },
          {
            title: "Capacity / Year",
            value: "3.6m+",
            unit: "Capacity",
          },
          {
            title: "Satisfied Clients",
            value: "300+",
            unit: "Clients",
          },
        ],
      },

      // ✅ NEW: Internal Testing + Table
      testing: {
        title: "Internal Testing & Quality Assurance",
        subTitle: "Multiple instrument internal testing",
        description:
          "We run internal performance tests to improve product reliability and shorten the development cycle.",
        shortLine:
          "Multiple instrument internal testing shorten development cycle.",
        machineImage:
          "https://res.cloudinary.com/drnascc38/image/upload/v1766167018/Screenshot_2025-12-20_at_1.53.53_AM_nstfgv.png",
        highlights: [
          "Standardized test workflow to reduce trial-and-error",
          "Early risk detection before bulk production",
          "Faster sample validation for quicker launch",
        ],
        tableTitle: "Testing Items & Equipment",
        tableHeaders: ["No", "Test Items", "Equipment"],
        tests: [
          {
            no: "1",
            item: "Load bearing test",
            equipment: "Shock impact tester",
          },
          { no: "2", item: "Tensile test", equipment: "Tensile tester" },
          {
            no: "3",
            item: "Colorfastness to croaking",
            equipment: "Croak meter",
          },
          {
            no: "4",
            item: "Colorfastness light",
            equipment: "Standard multi source light box",
          },
          {
            no: "5",
            item: "Dye transfer in storage",
            equipment: "Constant temperature",
          },
          {
            no: "6",
            item: "Colorfastness to perspiration",
            equipment: "Oven / standard light box",
          },
          {
            no: "7",
            item: "Phenolic yellowing (white fabric only)",
            equipment: "Oven + perspiration tester",
          },
        ],
        badge1Title: "Stable QC",
        badge1Desc: "Consistent checks across sampling and bulk production.",
        badge2Title: "Faster Development",
        badge2Desc: "Internal tests help validate faster and reduce rework.",
      },

      // ✅ NEW: Materials + Product Range + Systems
      materials: {
        title: "Materials & Product Range",
        description:
          "We cover a wide range of bag categories and materials with system-based management and clear data output.",
        rangeTitle: "Our Product Range",
        productRange: [
          "Tool bags",
          "Grass collecting bags",
          "Trailer bags",
          "Steel wire bags",
          "Backpacks",
          "Shoulder bags",
          "Shopping bags",
          "Cosmetic bags",
          "Instrument bags",
          "Electronic accessories",
          "Packaging materials",
          "Labor protection supplies",
          "Handbag",
          "School Bag"
        ],
        materialTitle: "Materials We Use",
        materialsUsed: [
          "Polyester",
          "Nylon",
          "Felt",
          "PU",
          "PVC",
          "Cotton",
          "Canvas",
          "Adhesive paper",
          "Adhesive tape",
        ],
        systemTitle: "System Management",
        systems: [
          "ERP system operations",
          "Billion-piece production systems",
          "ET paper output systems",
          "Clear and accurate data throughout production",
        ],
        certificationTitle: "Quality Management Certification",
        certificationDesc:
          "We focus on complete bag manufacturing and have obtained quality management system certification.",
      },

      process: {
        title: "Our Process",
        steps: [
          {
            number: "01",
            title: "Design & Development",
            description:
              "Prototype support and sampling with clear requirements.",
          },
          {
            number: "02",
            title: "Material Selection",
            description:
              "Choose suitable materials and accessories for performance needs.",
          },
          {
            number: "03",
            title: "Precision Cutting",
            description: "Accurate cutting ensures stable structure and shape.",
          },
          {
            number: "04",
            title: "Production & Assembly",
            description: "Controlled workmanship and standardized processing.",
          },
          {
            number: "05",
            title: "Internal Testing / QC",
            description: "Multiple checkpoints and internal performance tests.",
          },
          {
            number: "06",
            title: "Packaging & Shipping",
            description: "Safe packing and reliable shipment arrangements.",
          },
        ],
      },
      certificates: {
        title: "Quality Management System Certificate",
        subtitle:
          "Official certifications and compliance documents—click to view in full screen.",
        items: [
          {
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766168941/2de60596-1c6d-44f0-8938-61e2ecf23db3.png",
          },
          {
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766168825/a3bb672e-3bc8-4671-b7a6-133101679527.png",
          },
        ],
      },
    },

    cta: {
      title: "Ready to Create Together?",
      description:
        "Partner with us to bring your bag designs to life with stable quality, strong capacity, and fast development support.",
      button: "Start Your Project",
    },
    companies: {
      eyebrow:
        "Houde Handbags operates in two manufacturing hubs — China and Vietnam — delivering the same OEM/ODM services with consistent standards.",
      items: [
        {
          name: "China",
          role: "OEM & ODM Manufacturing",
          blurb:
            "End-to-end production with strict quality control, materials sourcing, and in-factory process management — aligned with Houde’s unified SOP and inspection standards.",
        },
        {
          name: "Vietnam",
          role: "OEM & ODM Manufacturing",
          blurb:
            "The same OEM/ODM capabilities and quality requirements as our China facility — supporting stable capacity, efficient lead times, and smooth export coordination.",
        },
      ],
    },
  },

  zh: {
    title: "关于厚德箱包",
    subtitle: "自2014年匠心制造",
    heroTitle: "您的优质箱包制造商",
    heroDescription:
      "我们专注于成品包袋的生产与加工，拥有清晰的数据系统、稳定的品质管控，以及高效的制造能力，服务全球合作伙伴。",

    sections: {
      story: {
        title: "我们的故事",
        description:
          "公司于2014年在东莞成立，是一家集研发、生产、销售于一体的综合性箱包企业。我们采用专业系统管理，数据清晰准确，包含ERP系统、亿级生产系统、ET纸质输出系统，并始终专注于成品包袋的生产加工。",
        points: [
          "2014年成立于东莞",
          "从专注生产到规模化制造",
          "为国际客户提供稳定交付与质控",
          "持续升级设备与管理系统",
        ],
      },

      mission: {
        title: "我们的使命",
        description:
          "以稳定的品质、严谨的内测体系与可扩展的产能，为客户提供可靠的箱包制造服务，帮助合作伙伴更快上市、更安心增长。",
        points: [
          "品质稳定、工艺一致",
          "快速打样与开发支持",
          "数据驱动的生产管理",
          "长期合作伙伴思维",
        ],
      },

      values: {
        title: "我们的价值观",
        items: [
          {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "品质优先",
            description: "材料、走线、结构与细节标准统一严谨。",
          },
          {
            icon: <Factory className="w-8 h-8" />,
            title: "制造实力",
            description: "专业的生产系统与高效的车间管理。",
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "客户合作",
            description: "沟通清晰、交付可靠、追求长期共赢。",
          },
          {
            icon: <Award className="w-8 h-8" />,
            title: "持续优化",
            description: "不断改进流程与设备，缩短开发周期。",
          },
          {
            icon: <Globe className="w-8 h-8" />,
            title: "全球服务",
            description: "支持不同市场与包装需求，灵活响应。",
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: "体系认证",
            description: "结构化管理与质量体系认证，输出更稳定。",
          },
        ],
      },

      facilities: {
        title: "工厂与设施展示",
        subtitle: "从开发到仓储与测试设备，透明展示生产环境。",
        items: [
          {
            label: "样品室",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167082/Screenshot_2025-12-20_at_1.50.57_AM_is3sak.png",
          },
          {
            label: "材料室",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167015/Screenshot_2025-12-20_at_1.51.40_AM_xrcixh.png",
          },
          {
            label: "中国工厂",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166923/Screenshot_2025-12-20_at_1.51.19_AM_rcqlfb.png",
          },
          {
            label: "越南工厂",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166923/Screenshot_2025-12-20_at_1.51.51_AM_vhp3xf.png",
          },
          {
            label: "生产办公室",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167015/Screenshot_2025-12-20_at_1.52.22_AM_tnhhp7.png",
          },
          {
            label: "仓库",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166935/Screenshot_2025-12-20_at_1.52.39_AM_codvj9.png",
          },
          {
            label: "测试设备",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766166922/Screenshot_2025-12-20_at_1.53.00_AM_ktaz9s.png",
          },
          {
            label: "生产线",
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766167018/Screenshot_2025-12-20_at_1.52.16_AM_fosfij.png",
          },
        ],
      },

      capabilities: {
        title: "您的优质箱包制造商",
        subtitle: "制造实力、稳定产能、成功案例数据支撑。",
        items: [
          { title: "制造经验", value: "11+", unit: "年" },
          { title: "成功项目", value: "58k+", unit: "项目" },
          { title: "年产能", value: "3.6m+", unit: "产能" },
          { title: "满意客户", value: "300+", unit: "客户" },
        ],
      },

      testing: {
        title: "内部测试与品质保障",
        subTitle: "多项设备内部测试",
        description: "通过内部性能测试提升可靠性，并缩短开发周期。",
        shortLine: "多项设备内部测试，缩短开发周期。",
        machineImage:
          "https://res.cloudinary.com/drnascc38/image/upload/v1766167018/Screenshot_2025-12-20_at_1.53.53_AM_nstfgv.png",
        highlights: [
          "标准化测试流程，减少反复试错",
          "提前发现风险，避免量产返工",
          "更快验证样品，缩短上市时间",
        ],
        tableTitle: "测试项目与设备",
        tableHeaders: ["序号", "测试项目", "设备"],
        tests: [
          { no: "1", item: "承重测试", equipment: "冲击测试机" },
          { no: "2", item: "拉力测试", equipment: "拉力试验机" },
          { no: "3", item: "干摩擦色牢度", equipment: "摩擦色牢度仪" },
          { no: "4", item: "耐光色牢度", equipment: "标准多光源灯箱" },
          { no: "5", item: "储存染料迁移", equipment: "恒温设备" },
          { no: "6", item: "耐汗渍色牢度", equipment: "烘箱 / 标准灯箱" },
          { no: "7", item: "酚黄（白色面料）", equipment: "烘箱 + 汗渍测试仪" },
        ],
        badge1Title: "稳定质控",
        badge1Desc: "覆盖打样与量产的多点检验与标准流程。",
        badge2Title: "开发更快",
        badge2Desc: "内部测试帮助快速确认方案、减少返工。",
      },

      materials: {
        title: "材料与产品范围",
        description: "覆盖多类产品与材料，并通过系统管理输出清晰数据。",
        rangeTitle: "产品范围",
        productRange: [
          "工具包",
          "割草收集袋",
          "拖车包",
          "钢丝包",
          "背包",
          "单肩包",
          "购物袋",
          "化妆包",
          "仪器包",
          "电子配件",
          "包装材料",
          "劳保用品",
          "手提包",
          "书包"
        ],
        materialTitle: "主要材料",
        materialsUsed: [
          "聚酯",
          "尼龙",
          "毛毡",
          "PU",
          "PVC",
          "棉",
          "帆布",
          "不干胶纸",
          "胶带",
        ],
        systemTitle: "系统化管理",
        systems: [
          "ERP系统管理",
          "亿级生产系统",
          "ET纸质输出系统",
          "生产数据清晰准确可追踪",
        ],
        certificationTitle: "质量管理认证",
        certificationDesc: "专注成品包袋生产加工，并已取得质量管理体系认证。",
      },

      process: {
        title: "生产流程",
        steps: [
          {
            number: "01",
            title: "设计与开发",
            description: "协同确认需求并支持打样。",
          },
          {
            number: "02",
            title: "材料选择",
            description: "根据功能与成本选择合适材料配件。",
          },
          {
            number: "03",
            title: "精准裁剪",
            description: "准确裁剪确保结构与外观一致。",
          },
          {
            number: "04",
            title: "生产组装",
            description: "标准化工艺执行与过程控制。",
          },
          {
            number: "05",
            title: "内部测试/质检",
            description: "多点质检与内部性能测试。",
          },
          {
            number: "06",
            title: "包装与出货",
            description: "安全包装与可靠发货安排。",
          },
        ],
      },
      certificates: {
        title: "质量管理体系证书",
        subtitle: "官方认证与合规文件——点击可全屏查看。",
        items: [
          {
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766168941/2de60596-1c6d-44f0-8938-61e2ecf23db3.png",
          },
          {
            image:
              "https://res.cloudinary.com/drnascc38/image/upload/v1766168825/a3bb672e-3bc8-4671-b7a6-133101679527.png",
          },
        ],
      },
    },

    cta: {
      title: "准备好一起打造了吗？",
      description:
        "与我们合作，以稳定品质、强产能与快速开发支持实现您的产品落地。",
      button: "开始合作",
    },
    companies: {
      eyebrow:
        "Houde Handbags 在中国与越南设有两大生产基地，提供相同的 OEM/ODM 服务，并以统一标准交付一致的品质。",
      items: [
        {
          name: "中国",
          role: "OEM 与 ODM 生产制造",
          blurb:
            "覆盖从原材料采购到成品出厂的全流程生产，严格质量管控与工厂现场运营管理；执行 Houde 统一的 SOP 与检验标准，确保稳定一致的交付质量。",
        },
        {
          name: "越南",
          role: "OEM 与 ODM 生产制造",
          blurb:
            "与中国基地具备相同的 OEM/ODM 能力与质量要求；在同一标准体系下支持稳定产能、更高效率的交期，并提供顺畅的出口与交付协同。",
        },
      ],
    },
  },
};

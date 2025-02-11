import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

export const productsToPreLoad: IProduct[] = [
  // Smartphones
  {
    name: "iPhone 11",
    price: 699,
    description:
      "Potencia y elegancia con el iPhone 11: captura momentos impresionantes con su sistema de doble cámara de 12 MP. Pantalla Liquid Retina de 6.1 pulgadas y chip A13 Bionic para un rendimiento excepcional.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232147/iphone11_k7vghe.png",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Samsung Galaxy S21",
    price: 799,
    description:
      "Descubre el Samsung Galaxy S21: pantalla dinámica AMOLED de 6.2 pulgadas, cámara triple de 64 MP y grabación de video 8K. Batería de larga duración y carga rápida.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739234442/Samsung_Galaxy_S21_qruk9d.png",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Xiaomi Mi 11",
    price: 749,
    description:
      "El Xiaomi Mi 11 combina un diseño elegante con un rendimiento potente gracias a su procesador Snapdragon 888 y una pantalla AMOLED de 6.81 pulgadas con resolución QHD+.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739234442/Xiaomi_Mi_11_xaawa4.png",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "OnePlus 9",
    price: 729,
    description:
      "El OnePlus 9 ofrece una pantalla Fluid AMOLED de 6.55 pulgadas, cámara triple con sensor principal de 48 MP y carga rápida de 65W para un rendimiento sin interrupciones.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739234442/OnePlus_9_negja7.png",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Google Pixel 5",
    price: 699,
    description:
      "El Google Pixel 5 destaca por su cámara de 12.2 MP con capacidades de fotografía nocturna, pantalla OLED de 6 pulgadas y una experiencia Android pura con actualizaciones rápidas.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739234442/Google_Pixel_5_stcsaq.png",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Sony Xperia 1 II",
    price: 1199,
    description:
      "El Sony Xperia 1 II cuenta con una pantalla 4K HDR de 6.5 pulgadas, cámara triple con enfoque automático y grabación de video en 4K a 60 fps, ideal para creadores de contenido.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232248/Sony_Xperia_1_II_j6iqt2.webp",
    categoryId: 1,
    stock: 10,
  },

  // Laptops
  {
    name: "MacBook Air",
    price: 999,
    description:
      "Diseño ligero y rendimiento potente con el chip M1, pantalla Retina de 13.3 pulgadas y hasta 18 horas de duración de batería, ideal para trabajar y jugar.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739234442/MacBook_Air_gwxbeo.png",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Dell XPS 13",
    price: 1099,
    description:
      "La Dell XPS 13 ofrece una pantalla InfinityEdge de 13.4 pulgadas, procesadores Intel de 11ª generación y un diseño compacto perfecto para la productividad.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232146/Dell_XPS_13_pdimuf.png",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Lenovo ThinkPad X1",
    price: 1299,
    description:
      "Rendimiento empresarial y durabilidad en un diseño elegante, pantalla de 14 pulgadas y teclado retroiluminado para una experiencia de escritura excepcional.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232148/Lenovo_ThinkPad_X1_mwniey.png",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "HP Spectre x360",
    price: 1399,
    description:
      "Convertible 2 en 1 con pantalla táctil de 13.3 pulgadas, procesador Intel Core i7 y batería de larga duración, ideal para uso profesional y personal.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232147/HP_Spectre_x360_cjdncs.png",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Asus ZenBook 14",
    price: 949,
    description:
      "Portátil delgado y ligero con pantalla Full HD de 14 pulgadas, procesador AMD Ryzen y teclado ergonómico, perfecto para llevar a cualquier lugar.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232144/Asus_ZenBook_14_ndmemx.png",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Acer Swift 3",
    price: 699,
    description:
      "Laptop ultradelgada con pantalla de 14 pulgadas, procesador Intel Core i5 y batería de hasta 12 horas, ideal para estudiantes y profesionales en movimiento.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232145/Acer_Swift_3_pxsadn.png",
    categoryId: 2,
    stock: 10,
  },

  // Tablets
  {
    name: "iPad Pro",
    price: 799,
    description:
      "Potente rendimiento y pantalla Liquid Retina de 11 pulgadas, ideal para creatividad y productividad. Compatible con Apple Pencil y Magic Keyboard.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232147/iPad_Pro_usgt1b.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Samsung Galaxy Tab S7",
    price: 649,
    description:
      "La Galaxy Tab S7 combina un rendimiento excepcional con una pantalla de 11 pulgadas, S Pen incluido y modo DeX para una experiencia similar a la de un PC.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232150/Samsung_Galaxy_Tab_S7_bvon99.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Microsoft Surface Pro 7",
    price: 749,
    description:
      "Versatilidad y potencia en un diseño ligero, incluye un teclado desmontable y pantalla táctil de 12.3 pulgadas, ideal para trabajar en cualquier lugar.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232148/Microsoft_Surface_Pro_7_h5cudl.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Lenovo Tab P11 Pro",
    price: 499,
    description:
      "Tablet Android con pantalla OLED de 11.5 pulgadas, procesador Qualcomm Snapdragon y soporte para el lápiz Lenovo Precision Pen 2.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232147/Lenovo_Tab_P11_Pro_qtz4ns.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Huawei MatePad Pro",
    price: 599,
    description:
      "Tablet premium con pantalla de 10.8 pulgadas, procesador Kirin 990 y soporte para el M-Pencil, ideal para productividad y entretenimiento.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232147/Huawei_MatePad_Pro_nn3hia.png",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Amazon Fire HD 10",
    price: 149,
    description:
      "Tablet asequible con pantalla de 10.1 pulgadas, almacenamiento ampliable y acceso a Amazon Prime Video, ideal para el entretenimiento diario.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/Amazon_Fire_HD_10_yle0jf.png",
    categoryId: 3,
    stock: 10,
  },

  // Headphones
  {
    name: "Apple AirPods Pro",
    price: 249,
    description:
      "Sonido inmersivo con cancelación activa de ruido y modo de transparencia. Diseño ergonómico y resistencia al agua, ideal para uso diario.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/Apple_AirPods_Pro_hybfl5.png",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Sony WH-1000XM4",
    price: 349,
    description:
      "Auriculares inalámbricos con cancelación de ruido líder en la industria, hasta 30 horas de autonomía y sonido de alta resolución.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/Sony_WH-1000XM4_ynjqcy.png",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Bose QuietComfort 35 II",
    price: 299,
    description:
      "Sonido premium y cancelación de ruido, perfectos para cualquier situación. Diseño cómodo para largas sesiones de escucha.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232145/Bose_QuietComfort_35_II_mfnkry.png",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Jabra Elite 85h",
    price: 249,
    description:
      "Auriculares con cancelación activa de ruido, 36 horas de duración de batería y resistencia al agua, ideales para viajar.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232248/Jabra_Elite_85h_uhfhts.webp",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Sennheiser Momentum 3",
    price: 349,
    description:
      "Auriculares inalámbricos de alta fidelidad con cancelación activa de ruido, diseño elegante y hasta 17 horas de duración de batería.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232152/Sennheiser_Momentum_3_lrk3si.png",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "Anker Soundcore Life Q20",
    price: 79,
    description:
      "Auriculares asequibles con cancelación activa de ruido, sonido envolvente y hasta 40 horas de duración de batería.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232144/Anker_Soundcore_Life_Q20_ntt1yt.png",
    categoryId: 4,
    stock: 10,
  },

  // Cameras
  {
    name: "Canon EOS R5",
    price: 3899,
    description:
      "Cámara sin espejo con capacidades de video 8K, enfoque automático rápido y sensor de fotograma completo de 45 MP, ideal para profesionales.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232247/Canon_EOS_R5_qkpu4b.webp",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "Nikon Z6",
    price: 1999,
    description:
      "Cámara sin espejo de fotograma completo con un rendimiento excepcional en condiciones de poca luz, grabación de video 4K y enfoque automático rápido.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232150/Nikon_Z6_jrmlge.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "Sony Alpha 7 III",
    price: 1999,
    description:
      "Rendimiento profesional en un cuerpo compacto, sensor de 24.2 MP, grabación de video 4K y enfoque automático de alta velocidad.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/Sony_Alpha_7_III_qwinnm.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "Fujifilm X-T4",
    price: 1699,
    description:
      "Cámara sin espejo con estabilización de imagen, grabación de video 4K y un sensor APS-C de 26.1 MP, ideal para fotografía y video.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232146/Fujifilm_X-T4_gv7utr.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "Panasonic Lumix GH5",
    price: 1299,
    description:
      "Cámara sin espejo con grabación de video 4K a 60 fps, enfoque automático rápido y diseño robusto, perfecta para videógrafos.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232148/Panasonic_Lumix_GH5_kefzec.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "Olympus OM-D E-M1 Mark III",
    price: 1299,
    description:
      "Cámara sin espejo compacta con estabilización de imagen y sensor Micro Cuatro Tercios, ideal para fotografía de viajes y naturaleza.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232148/Olympus_OM-D_E-M1_Mark_III_cktewb.png",
    categoryId: 5,
    stock: 10,
  },

  // Printers
  {
    name: "HP LaserJet Pro M404dn",
    price: 299,
    description:
      "Impresora láser rápida y eficiente para pequeñas y medianas empresas, impresión a doble cara automática y conectividad USB y Ethernet.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232146/HP_LaserJet_Pro_M404dn_p4ezyq.png",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Epson EcoTank ET-4760",
    price: 499,
    description:
      "Impresora de tanque de tinta con bajo costo de impresión, alta capacidad de tinta y funciones de escaneo y copia.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232146/Epson_EcoTank_ET-4760_zcwckc.png",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Canon PIXMA TR8620",
    price: 199,
    description:
      "Impresora todo en uno con funciones de escaneo, copia y fax, ideal para el hogar y la oficina, conectividad Wi-Fi y AirPrint.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232145/Canon_PIXMA_TR8620_t1fbs7.png",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Brother MFC-L3770CDW",
    price: 349,
    description:
      "Impresora láser color todo en uno con escáner, copiadora y fax, conectividad inalámbrica y pantalla táctil.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232145/Brother_MFC-L3770CDW_lzwwgt.png",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Xerox Phaser 6510",
    price: 199,
    description:
      "Impresora láser color compacta, ideal para pequeñas empresas, con impresión a doble cara y conectividad USB y Ethernet.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232144/Xerox_Phaser_6510_m9ol8b.png",
    categoryId: 6,
    stock: 10,
  },
  {
    name: "Ricoh SP C261DNw",
    price: 229,
    description:
      "Impresora láser color compacta y eficiente, ideal para el hogar y pequeñas oficinas, con impresión a doble cara y conectividad Wi-Fi.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232149/Ricoh_SP_C261DNw_gegfep.png",
    categoryId: 6,
    stock: 10,
  },

  // Monitors
  {
    name: "LG UltraFine 5K",
    price: 1299,
    description:
      "Monitor 5K con colores vibrantes y excelente calidad de imagen, ideal para diseñadores y profesionales creativos.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232148/LG_UltraFine_5K_acbnui.png",
    categoryId: 7,
    stock: 10,
  },
  {
    name: "Dell UltraSharp U2720Q",
    price: 699,
    description:
      "Monitor 4K con una precisión de color excepcional y diseño elegante, ideal para edición de fotos y videos.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232146/Dell_UltraSharp_U2720Q_ncjupg.png",
    categoryId: 7,
    stock: 10,
  },
  {
    name: "ASUS ProArt PA32UCX",
    price: 2999,
    description:
      "Monitor HDR 4K diseñado para creadores de contenido y profesionales, con soporte para múltiples espacios de color.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/ASUS_ProArt_PA32UCX_lp9ose.png",
    categoryId: 7,
    stock: 10,
  },
  {
    name: "BenQ PD3220U",
    price: 1199,
    description:
      "Monitor 4K UHD de 32 pulgadas con tecnología HDR y precisión de color, ideal para diseñadores gráficos.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232145/BenQ_PD3220U_hafae7.png",
    categoryId: 7,
    stock: 10,
  },
  {
    name: "Samsung Odyssey G7",
    price: 699,
    description:
      "Monitor curvo QHD de 27 pulgadas con tasa de refresco de 240Hz, ideal para gamers que buscan una experiencia inmersiva.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232150/Samsung_Odyssey_G7_moov6c.png",
    categoryId: 7,
    stock: 10,
  },
  {
    name: "Acer R240HY",
    price: 149,
    description:
      "Monitor Full HD de 23.8 pulgadas con diseño sin bordes y tecnología IPS, ideal para uso diario y entretenimiento.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232144/Acer_R240HY_vqafxc.png",
    categoryId: 7,
    stock: 10,
  },

  // Storage
  {
    name: "Samsung T7 Portable SSD",
    price: 129,
    description:
      "Almacenamiento portátil rápido y seguro en un diseño compacto, velocidad de lectura de hasta 1050 MB/s.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232150/Samsung_T7_Portable_SSD_s2ujuy.png",
    categoryId: 8,
    stock: 10,
  },
  {
    name: "SanDisk Extreme Portable SSD",
    price: 159,
    description:
      "Almacenamiento externo resistente al agua y al polvo para tus datos, ideal para fotógrafos y videógrafos en movimiento.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232151/SanDisk_Extreme_Portable_SSD_itadaj.png",
    categoryId: 8,
    stock: 10,
  },
  {
    name: "WD My Passport",
    price: 89,
    description:
      "Disco duro externo portátil con gran capacidad de almacenamiento y software de copia de seguridad fácil de usar.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232247/WD_My_Passport_agm3ft.webp",
    categoryId: 8,
    stock: 10,
  },
  {
    name: "Seagate Backup Plus Slim",
    price: 99,
    description:
      "Disco duro externo delgado y ligero con capacidades de hasta 2 TB, ideal para almacenamiento de fotos y videos.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232151/Seagate_Backup_Plus_Slim_mye1xb.png",
    categoryId: 8,
    stock: 10,
  },
  {
    name: "LaCie Rugged Mini",
    price: 109,
    description:
      "Disco duro externo resistente a golpes y agua, ideal para trabajo en exteriores y almacenamiento seguro.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232147/LaCie_Rugged_Mini_kacg7b.png",
    categoryId: 8,
    stock: 10,
  },
  {
    name: "Toshiba Canvio Basics",
    price: 69,
    description:
      "Disco duro portátil asequible, fácil de usar y con gran capacidad de almacenamiento, ideal para el hogar y la oficina.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/Toshiba_Canvio_Basics_onpbkg.png",
    categoryId: 8,
    stock: 10,
  },

  // Accessories
  {
    name: "Apple Pencil",
    price: 129,
    description:
      "Lápiz digital para iPad, ideal para dibujar y tomar notas, con sensibilidad a la presión y baja latencia.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/Apple_Pencil_boroz2.png",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "Logitech MX Master 3",
    price: 99,
    description:
      "Ratón ergonómico con múltiples funciones, conectividad avanzada y hasta 70 días de duración de batería.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232247/Logitech_MX_Master_3_fvumof.webp",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "Anker PowerCore 20100",
    price: 39,
    description:
      "Batería portátil de alta capacidad para cargar tus dispositivos sobre la marcha, con dos puertos USB para carga simultánea.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232247/Anker_PowerCore_20100_c5stiw.webp",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "Razer BlackWidow Lite",
    price: 99,
    description:
      "Teclado mecánico compacto con retroiluminación blanca y teclas silenciosas, ideal para gamers y uso en oficina.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232149/Razer_BlackWidow_Lite_cgskwh.png",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "Samsung Galaxy Buds Live",
    price: 169,
    description:
      "Auriculares inalámbricos con diseño ergonómico, sonido de alta calidad y hasta 29 horas de duración de batería con estuche de carga.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232149/Samsung_Galaxy_Buds_Live_tkp57b.png",
    categoryId: 9,
    stock: 10,
  },
  {
    name: "TP-Link USB Wi-Fi Adapter",
    price: 29,
    description:
      "Adaptador USB para conectividad Wi-Fi, compatible con redes 802.11ac, ideal para mejorar la conexión en computadoras de escritorio y portátiles.",
    image:
      "https://res.cloudinary.com/de41faltu/image/upload/v1739232143/TP-Link_USB_Wi-Fi_Adapter_ozl8rb.png",
    categoryId: 9,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Productos precargados");
};

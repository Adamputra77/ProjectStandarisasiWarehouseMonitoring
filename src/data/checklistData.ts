export type ChecklistItem = {
  id: string;
  no: string;
  parameter: string;
  weight: number;
};

export type ChecklistCategory = {
  id: string;
  no: string;
  name: string;
  weight: number;
  items: ChecklistItem[];
};

export const quantitativeData: ChecklistCategory[] = [
  {
    id: "cat_1",
    no: "1",
    name: "Building & Facilities",
    weight: 434,
    items: [
      { id: "1.1", no: "1.1", parameter: "Floor", weight: 20 },
      { id: "1.2", no: "1.2", parameter: "Office & Furnished", weight: 10 },
      { id: "1.3", no: "1.3", parameter: "Safety walking line", weight: 10 },
      { id: "1.4", no: "1.4", parameter: "Oil Catcher", weight: 15 },
      { id: "1.5", no: "1.5", parameter: "Lighting", weight: 10 },
      { id: "1.6", no: "1.6", parameter: "Smoking Area", weight: 8 },
      { id: "1.7", no: "1.7", parameter: "Connectivity", weight: 10 },
      { id: "1.8", no: "1.8", parameter: "Lavatory", weight: 20 },
      { id: "1.9", no: "1.9", parameter: "Storage", weight: 10 },
      { id: "1.10", no: "1.10", parameter: "TPS B3", weight: 15 },
      { id: "1.11", no: "1.11", parameter: "Washing bay*", weight: 10 },
      { id: "1.12", no: "1.12", parameter: "Welding Habitat*", weight: 10 },
      { id: "1.13", no: "1.13", parameter: "Pressure test bench*", weight: 10 },
      { id: "1.14", no: "1.14", parameter: "Painting Area permanent*", weight: 10 },
      { id: "1.15", no: "1.15", parameter: "Overhaul Area*", weight: 10 },
      { id: "1.16", no: "1.16", parameter: "Rig Simulation*", weight: 10 },
      { id: "1.17", no: "1.17", parameter: "Wire Spooling test Area*", weight: 10 },
      { id: "1.18", no: "1.18", parameter: "First Aid Kit", weight: 8 },
      { id: "1.19", no: "1.19", parameter: "Eye Wash Station", weight: 8 },
      { id: "1.20", no: "1.20", parameter: "Fire extinguisher", weight: 15 },
      { id: "1.21", no: "1.21", parameter: "IPAL", weight: 20 },
      { id: "1.22", no: "1.22", parameter: "Genset min 250 KVA", weight: 10 },
      { id: "1.23", no: "1.23", parameter: "Bungker Radioactive", weight: 10 },
      { id: "1.24", no: "1.24", parameter: "Penangkal petir", weight: 10 },
      { id: "1.25", no: "1.25", parameter: "Pagar Warehouse Standart 2,4 M", weight: 20 },
      { id: "1.26", no: "1.26", parameter: "Drainase", weight: 20 },
      { id: "1.27", no: "1.27", parameter: "Forklift", weight: 15 },
      { id: "1.28", no: "1.28", parameter: "safety sign", weight: 15 },
      { id: "1.29", no: "1.29", parameter: "Parkir area", weight: 15 },
      { id: "1.30", no: "1.30", parameter: "Gerbang utama", weight: 20 },
      { id: "1.31", no: "1.31", parameter: "Penyimpanan Bahan Bakar", weight: 10 },
      { id: "1.32", no: "1.32", parameter: "Penyimpanan Botol oxcygen, acytiline", weight: 15 },
      { id: "1.33", no: "1.33", parameter: "Hanggar", weight: 15 },
      { id: "1.34", no: "1.34", parameter: "Tubular Area", weight: 10 }
    ]
  },
  {
    id: "cat_2",
    no: "2",
    name: "Organisation",
    weight: 53,
    items: [
      { id: "2.1", no: "2.1", parameter: "Struktur Organisasi", weight: 5 },
      { id: "2.2", no: "2.2", parameter: "Job Description", weight: 5 },
      { id: "2.3", no: "2.3", parameter: "Key Performance Indikator (KPI)", weight: 8 },
      { id: "2.4", no: "2.4", parameter: "Kebijakan Mutu", weight: 5 },
      { id: "2.5", no: "2.5", parameter: "Kebijakan HSE", weight: 5 },
      { id: "2.6", no: "2.6", parameter: "QHSE Manual", weight: 10 },
      { id: "2.7", no: "2.7", parameter: "Training & Competency Matrix", weight: 15 }
    ]
  },
  {
    id: "cat_3",
    no: "3",
    name: "Legal Compliance",
    weight: 118,
    items: [
      { id: "3.1", no: "3.1", parameter: "Dokument IMB", weight: 15 },
      { id: "3.2", no: "3.2", parameter: "Dokument ijin mendirikan TPS B3", weight: 15 },
      { id: "3.3", no: "3.3", parameter: "Dokument UPL/UKL", weight: 6 },
      { id: "3.4", no: "3.4", parameter: "Pelaporan UKL/UPL", weight: 15 },
      { id: "3.5", no: "3.5", parameter: "SILO Instalasi kelistrikan", weight: 6 },
      { id: "3.6", no: "3.6", parameter: "SILO Penangkal Petir", weight: 6 },
      { id: "3.7", no: "3.7", parameter: "MCU", weight: 10 },
      { id: "3.8", no: "3.8", parameter: "Sertifikat Forklift & Operator*", weight: 15 },
      { id: "3.9", no: "3.9", parameter: "SertifikatCrane & Operator*", weight: 15 },
      { id: "3.10", no: "3.10", parameter: "Sertifikasi Air Compresor", weight: 15 }
    ]
  },
  {
    id: "cat_4",
    no: "4",
    name: "HSE CULTURE",
    weight: 210,
    items: [
      { id: "4.1", no: "4.1", parameter: "APD Pekerja", weight: 20 },
      { id: "4.2", no: "4.2", parameter: "Job Safety Analysisi (JSA)", weight: 20 },
      { id: "4.3", no: "4.3", parameter: "HIRADC", weight: 20 },
      { id: "4.4", no: "4.4", parameter: "HSE Matrik Competency", weight: 10 },
      { id: "4.5", no: "4.5", parameter: "Emergency Response Team & Plan", weight: 10 },
      { id: "4.6", no: "4.6", parameter: "Dril dan Simulation", weight: 10 },
      { id: "4.7", no: "4.7", parameter: "Management Limbah B3", weight: 20 },
      { id: "4.8", no: "4.8", parameter: "Marking/ Signage", weight: 20 },
      { id: "4.9", no: "4.9", parameter: "HOC", weight: 10 },
      { id: "4.10", no: "4.10", parameter: "POB & Manhour Monitoring", weight: 10 },
      { id: "4.11", no: "4.11", parameter: "Transportasi Checklist", weight: 10 },
      { id: "4.12", no: "4.12", parameter: "Inspeksi Peralatan Hot Work", weight: 15 },
      { id: "4.13", no: "4.13", parameter: "Safety body harness*", weight: 10 },
      { id: "4.14", no: "4.14", parameter: "Stagger /Scaffolding*", weight: 10 },
      { id: "4.15", no: "4.15", parameter: "Lifting set (Sling, Chain, Webbing ets)*", weight: 15 }
    ]
  },
  {
    id: "cat_5",
    no: "5",
    name: "SECURITY",
    weight: 80,
    items: [
      { id: "5.1", no: "5.1", parameter: "Pos Security", weight: 15 },
      { id: "5.2", no: "5.2", parameter: "Jadwal petugasan Jaga", weight: 10 },
      { id: "5.3", no: "5.3", parameter: "Daftar Tamu (Acces control)", weight: 10 },
      { id: "5.4", no: "5.4", parameter: "Instalasi CCTV", weight: 15 },
      { id: "5.5", no: "5.5", parameter: "Pagar setinggi 3 Meter*", weight: 20 },
      { id: "5.6", no: "5.6", parameter: "Menara Keamanan", weight: 10 }
    ]
  },
  {
    id: "cat_6",
    no: "6",
    name: "ACTIVITY CONTROL",
    weight: 105,
    items: [
      { id: "6.1", no: "6.1", parameter: "Daftar peralatan Asset", weight: 15 },
      { id: "6.2", no: "6.2", parameter: "Tagging ID peralatan", weight: 15 },
      { id: "6.3", no: "6.3", parameter: "Checklist pre-mobilisasi", weight: 10 },
      { id: "6.4", no: "6.4", parameter: "Penyimpanan Peralatan", weight: 20 },
      { id: "6.5", no: "6.5", parameter: "Penyimpanan Inventory", weight: 20 },
      { id: "6.6", no: "6.6", parameter: "Inspeksi rutin tempat kerja", weight: 15 },
      { id: "6.7", no: "6.7", parameter: "Update dashboard mingguan terkait layout warehouse (area junk, free area, acquisition value equipment)", weight: 10 }
    ]
  }
];

export const qualitativeData: string[] = [
  "Bersih, teratur dan dalam kondisi saniter",
  "Bebas dari kemungkinan bahaya terpeleset, tersandung atau terjatuh",
  "Adanya sistem drainase yang terpelihara",
  "Bebas dari benda tajam dan beda elevasi",
  "Adanya penutup atau barikade pada bagian yang terbuka",
  "Batas beban tertera pada lantai yang lebih tinggi",
  "Air Conditioner dilengkapi dengan fasilitas untuk melakukan penyesuaian temperatur",
  "Temperatur di ruangan kerja harus disesuaikan dengan fungsi ruangan (standar suhu nyaman occupant 23 - 26 oC dengan humidity 40 – 60%).",
  "Ruangan dilengkapi dengan alat monitoring temperature ruangan.",
  "Semburan udara dari AC tidak boleh langsung mengenai bagian tubuh pekerja dalam ruangan",
  "Tempat kerja memiliki desain yang memungkinkan tubuh berada dalam posisi normal, baik pada saat duduk atau berdiri",
  "Tempat kerja dan letak display monitor memiliki desain yang nyaman dan mudah untuk dilihat oleh pengguna",
  "Penerangan dalam keadaan bersih dan berfungsi dengan baik",
  "Ruangan memungkinkan untuk mendapatkan aliran udara ke dalam ruangan secara terus-menerus",
  "Exhaust mampu menghisap udara yang telah dihirup oleh personil di dalam ruangan/ mampu menghisap gas/ bau keluar",
  "Terdapat peralatan pemadam api yang standby dan dapat terjangkau dan sesuai dengan peruntukannya",
  "Lorong tertandai dan dipantau oleh CCTV",
  "Bersih dan bebas dari halangan",
  "Terdapat ruang yang cukup untuk gerakan normal",
  "Setiap lorong storage di tandai jalur evakuasi",
  "Terdapat sistem pemisahan dan sistem pembuangan (drainase) untuk limbah B3.",
  "Lantai terbuat dari beton/ concrete, tidak berlubang/ rapat dan memiliki elevasi yang cukup",
  "Tersedia neraca limbah B3 yang terupdate",
  "Area jalan dan lokasi kerja memiliki penerangan yang cukup saat digunakan"
];

export type ChecklistItem = {
  id: string;
  no: string;
  parameter: string;
  weight: number;
  guidelines?: string[];
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
      { 
        id: "1.1", no: "1.1", parameter: "Floor", weight: 20,
        guidelines: [
          "Bersih, teratur dan dalam kondisi saniter",
          "Bebas dari kemungkinan bahaya terpeleset, tersandung atau terjatuh",
          "Adanya sistem drainase yang terpelihara",
          "Bebas dari benda tajam dan beda elevasi",
          "Adanya penutup atau barikade pada bagian yang terbuka",
          "Batas beban tertera pada lantai yang lebih tinggi"
        ]
      },
      { 
        id: "1.2", no: "1.2", parameter: "Office & Furnished", weight: 10,
        guidelines: [
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
          "Lorong tertandai dan dipantau oleh CCTV"
        ]
      },
      { 
        id: "1.3", no: "1.3", parameter: "Safety walking line", weight: 10,
        guidelines: [
          "Bersih dan bebas dari halangan",
          "Terdapat ruang yang cukup untuk gerakan normal",
          "Terdapat ruang yang cukup apabila lorong dijadikan jalur evakuasi",
          "Setiap lorong storage di tandai jalur evakuasi",
          "Terdapat jalur evakuasi di area pejalan kaki dan dilengkapi dengan lampu penerangan"
        ]
      },
      { 
        id: "1.4", no: "1.4", parameter: "Oil Catcher", weight: 15,
        guidelines: [
          "Saluran buang terhubung dengan oil catcher area"
        ]
      },
      { 
        id: "1.5", no: "1.5", parameter: "Lighting", weight: 10,
        guidelines: [
          "Area jalan dan lokasi kerja memiliki penerangan yang cukup saat digunakan",
          "Lampu dalam keadaan bersih dan berfungsi dengan baik",
          "Level iluminasi/ kekuatan pencahayaan cukup untuk menerangi aktivitas kerja",
          "Jenis lampu LED",
          "Penerangan diseluruh area memiliki nilai luminer minimal 200 Lux"
        ]
      },
      { 
        id: "1.6", no: "1.6", parameter: "Smoking Area", weight: 8,
        guidelines: [
          "Baik dan bersih",
          "Jauh dari peralatan dan material mudah terbakar",
          "Ruangan terbuka agar sirkulasi udara berjalan dengan baik",
          "Tersedia sign Smoking area",
          "Tersedia asbak"
        ]
      },
      { 
        id: "1.7", no: "1.7", parameter: "Connectivity", weight: 10,
        guidelines: [
          "Perlindungan fisik terpasang pada peralatan yang melewati perimeter pagar (contoh: tenaga pembangkit listrik, pipa gas, jalur telekomunikasi, water supply, dll)."
        ]
      },
      { 
        id: "1.8", no: "1.8", parameter: "Lavatory", weight: 20,
        guidelines: [
          "Toilet pria dan wanita terpisah tempatnya",
          "Lantai toilet dalam kondisi bersih (tidak ada kotoran, serangga/ pest, dll), tidak ada genangan air, tidak licin, air buangan",
          "Tersedia sabun dan tisu/ alat pengering tangan",
          "Tersedia isian checklist pembersihan toilet (daily)",
          "Rasio jumlah toilet dan urinoir (Laki-laki 1:40 dan perempuan 1:25)",
          "Toilet harus dilengkapi dengan ventilasi yang cukup",
          "Tersedia air bersih untuk yang dilengkapi dengan hasil pengujian laboratorium dan dinyatakan layak digunakan",
          "Air yang ditampung terbebas dari pencemaran fisika, kimia mapun bakteri (jentik-jentik/ serangga / cacing yang hidup didalamnya)",
          "Saluran buang ( Black / grey water ) tersambung dengan IPAL / STP"
        ]
      },
      { 
        id: "1.9", no: "1.9", parameter: "Storage", weight: 10,
        guidelines: [
          "Jalur akses dan lorong bersih dan tidak terdapat penghalang",
          "Barang yang kecil/ memiliki bentuk ireguler dipisahkan, saling berdekatan, dengan batas penumpukan yang aman selama masa penyimpanan",
          "Seluruh tumpukan stabil dan aman terhadap kemungkinan adanya pergeseran / keruntuhan dan rak terbuat dari besi",
          "Area penyimpanan bersih dan bebas dari barang/material yang asing",
          "Informasi mengenai batas-batas beban untuk rak-rak penyimpanan, dipasang dan dapat dilihat dengan jelas",
          "Tersedianya alat pelindung kepala yang wajib digunakan pada area yang memiliki risiko benda jatuh",
          "Material berbahaya ditandai secara memadai, serta disimpan secara terpisah",
          "Bahan-bahan yang dapat terdeteriorasi/kualitasnya memburuk yang ditandai dengan suatu umur simpan, harus dipisahkan, dan dibuang pada saat umur simpan sudah lewat",
          "Seluruh material dan bahan disimpan dengan cara yang baik untuk mencegah terjadinya kerusakan atau deteriorasi/memburuknya kualitas",
          "Suhu menyesuaikan material yang disimpan dalam storage dan ventilasi harus selalu terjaga dengan baik (untuk storage: 22C, Office:26C)",
          "Terdapat jalur evakuasi glow in the dark",
          "Terdapat sign manual handling",
          "Terdapat peralatan pemadam api yang standby di lokasi storage sesuai dengan jenis media pemadaman yang dibutuhkan"
        ]
      },
      { 
        id: "1.10", no: "1.10", parameter: "TPS B3", weight: 15,
        guidelines: [
          "Terdapat informasi Koordinat TPS B3",
          "Terdapat peralatan pemadam api yang standby di lokasi TPS B3 sesuai dengan jenis media pemadaman yang dibutuhkan",
          "Tersedia peralatan eye wash dan shower di sekitar lokasi TPS B3",
          "Tersedia Safety Data Sheet dan Spill Kit di lokasi TPS B3",
          "Warning Sign terpasang dan SOP penangangan limbah B3 tersedia di lokasi TPS B3",
          "Pencahayaan yang cukup dan explosion proof",
          "Tersedia APD spesifik berupa : Respiratory protection, Chemical Google, Chemical glove, chemical suit",
          "Terdapat sistem pemisahan dan sistem pembuangan (drainase) untuk limbah B3. Drainase harus sesuai dengan jenis",
          "Lokasi TPS harus jauh dari fasilitas umum dan jauh dari process area",
          "Lantai terbuat dari beton/ concrete, tidak berlubang/ rapat dan memiliki elevasi yang cukup untuk mengalirkan cairan",
          "TPS B3 harus dilengkapi dengan atap, berdinding",
          "Tersedia tempat sampah B3 yang tertutup, memiliki identitas B3 dan isinya tidak tergenang air",
          "Limbah B3 tidak boleh disimpan di TPS B3 lebih dari 90 hari sesuai dengan peraturan lingkungan yang berlaku",
          "Transporter limbah B3 yang mengangkut limbah harus dilengkapi dengan ijin, sesuai dengan manifest limbah yang berlaku.",
          "Space untuk loading dan unloading limbah B3 harus cukup untuk maneuver alat angkat dan angkut",
          "Penyusunan tumpukan wadah penampung limbah B3 harus sesuai dengan peraturan lingkungan yang berlaku",
          "Tersedia neraca dan Log book limbah B3 yang terupdate"
        ]
      },
      { 
        id: "1.11", no: "1.11", parameter: "Washing bay*", weight: 10,
        guidelines: [
          "Terdapat saluran drainase yang memadai di area pencucian"
        ]
      },
      { 
        id: "1.12", no: "1.12", parameter: "Welding Habitat*", weight: 10,
        guidelines: [
          "Penerangan yang memadai untuk pekerjaan malam",
          "Terdapat pemisah area fabrikasi dan area cutting",
          "Tersedia panel listrik yang memadai berikut dengan on off emergency",
          "Warning Sign dan SOP terpasang",
          "Terdapat tempat APD untuk area welding",
          "Terdapat kran air",
          "Terdapat peralatan pemadam api yang standby di lokasi welding sesuai dengan jenis media pemadaman yang dibutuhkan",
          "Tersedia peralatan eye wash"
        ]
      },
      { 
        id: "1.13", no: "1.13", parameter: "Pressure test bench*", weight: 10,
        guidelines: [
          "Tersedia warning lamp rotary sebagai tanda pressure test sedang berjalan",
          "Design bunker sesuai dengan standard (Ada perhitungan kapasitas, Tertutup, Remote control diluar, cctv, indikator)",
          "Terdapat accumulator, Barthon chart recorder, Huskel pump, Terdapat CCTV"
        ]
      },
      { 
        id: "1.14", no: "1.14", parameter: "Painting Area permanent*", weight: 10,
        guidelines: [
          "Area harus tertutup dan berjarak minimal 3 meter dari tempat equipment dan maintenance",
          "Terdapat tempat APD untuk area painting",
          "Warning Sign dan SOP terpasang",
          "Terdapat exhaust fan",
          "Terdapat tempat material painting"
        ]
      },
      { 
        id: "1.15", no: "1.15", parameter: "Overhaul Area*", weight: 10,
        guidelines: [
          "Penerangan yang memadai untuk pekerjaan malam",
          "Space untuk loading dan unloading harus cukup untuk manuver alat angkat dan angkut",
          "Terdapat tempat material untuk penanganan tumpahan chemical",
          "Terdapat overhead crane",
          "Terdapat tempat hand tool, meja maintenace, rak besi",
          "Terdapat peralatan pemadam api yang standby di lokasi overhaul"
        ]
      },
      { 
        id: "1.16", no: "1.16", parameter: "Rig Simulation*", weight: 10,
        guidelines: [
          "Terdapat saluran drainase yang memadai di area rig simulasi untuk limbah B3",
          "Lantai terbuat dari beton dan tidak berlubang",
          "Tersedia panel listrik yang memadai berikut dengan on-off emergency",
          "Terdapat Adapter dan anchor point yang sudah tersertifikasi",
          "Warning Sign dan SOP terpasang",
          "Penerangan yang memadai untuk pekerjaan malam"
        ]
      },
      { 
        id: "1.17", no: "1.17", parameter: "Wire Spooling test Area*", weight: 10,
        guidelines: [
          "Floor harus concrete dan rata",
          "Warning Sign dan SOP terpasang"
        ]
      },
      { 
        id: "1.18", no: "1.18", parameter: "First Aid Kit", weight: 8,
        guidelines: [
          "Tersedia kotak P3K di lokasi yang telah ditentukan (lokasi public dan mudah dijangkau).",
          "Isi kotak P3K sesuai dengan standart yang berlaku, tidak akadaluarsa dan tidak terkontaminasi",
          "Tersedia inspection tag yang terisi terhadap kotak P3K"
        ]
      },
      { 
        id: "1.19", no: "1.19", parameter: "Eye Wash Station", weight: 8,
        guidelines: [
          "Air yang digunakan dalam kondisi yang bersih (tidak berlumut, tidak ada serangga, kotoran, jernih & tidak berbau)",
          "Dapat mengalir dengan baik",
          "Tersedia inspection tag yang terisi terhadap eye wash"
        ]
      },
      { 
        id: "1.20", no: "1.20", parameter: "Fire extinguisher", weight: 15,
        guidelines: [
          "Label-label peralatan pemadam kebakaran dapat dilihat dari kejauhan",
          "Tersedia inspection tag yang terisi terhadap Fire extinguisher"
        ]
      },
      { 
        id: "1.21", no: "1.21", parameter: "IPAL", weight: 20,
        guidelines: [
          "Design IPAL sesuai dengan standard regulasi Pemerintah",
          "Ada Surat Izin Operasi dari DLH Wilayah dikeluarkan per 5 tahun",
          "Kondisi IPAL tidak berbau, tidak bocor dan berfungsi dengan baik.",
          "Ada Jadwal Inspeksi dan maintenance IPAL ( Terecord )"
        ]
      },
      { 
        id: "1.22", no: "1.22", parameter: "Genset min 250 KVA", weight: 10,
        guidelines: [
          "Genset dapat beroperasi dengan baik.",
          "Ada SIO Genset (Satu tahun sekali)",
          "Ada Jadwal Inspeksi dan Preventive maintenance Genset ( Terecord )",
          "Tersedia sistem peredam kebisingan ( Silence )",
          "Genset ditempatkan di area khusus (sesuai dengan standard)"
        ]
      },
      { 
        id: "1.23", no: "1.23", parameter: "Bungker Radioactive", weight: 10,
        guidelines: [
          "Bangunan / ruangan tertutup bangunan sipil tanpa jedela atau hanya 1 akses masuk",
          "Bangunan jauh dari kegiatan rutin",
          "Akses masuk menggunakan akses key code, card dan akses manual",
          "Personil yang masuk ke bungker hanya hse tersertifikasi, engineer looging tersertifikasi, dan mempunyai TLD bet",
          "Penyimpanan radioactive ditanam dengan paparan max 10microsv",
          "Lubang hole menyesuaikan paparan max 10 microSV dan ada penutup",
          "Ada alat bantu electrik chainblok berat menyesuaikan radiactif rack dan jumlah radioactif",
          "Perlengkapan gedung penyimpanan radioactif",
          "Tersedia pagar dan safety sign radiasi",
          "Kunci ganda, Tersedia cctv, Tersedia alarm, Penerangan cukup",
          "Log book, papan informasi pit hole radioactif",
          "Pintu dari bahan solid dan kuat",
          "Memiliki survey meter"
        ]
      },
      { 
        id: "1.24", no: "1.24", parameter: "Penangkal petir", weight: 10,
        guidelines: [
          "Komponen penangkal petir sesuai dengan standard yang ditetapkan Regulasi",
          "Ground ditanam sampai dengan kedalaman air tanah atau area basah",
          "Tinggi penangkal petir minimal 6 m diatas permukaan",
          "Ada Sertifikasi dari Dinas terkait ( Disnakertrans ) Satu tahun sekali",
          "Selalu di lakukan pengukuran dan Inspeksi ( Lampirkan form nya )"
        ]
      },
      { 
        id: "1.25", no: "1.25", parameter: "Pagar Warehouse Standart 2,4 M", weight: 20,
        guidelines: [
          "Tinggi pagar minimal 2,4 meter",
          "Terdapat sign sekuriti 'No Trespassing' atau lainnya yang terpasang di pagar",
          "Terdapat sign sistem alarm pagar yang terpasang",
          "Garis pagar steril dari tanaman, sampah, peralatan dan obyek lainnya",
          "Area pagar steril dari obyek yang dapat membantu melintasi pagar",
          "Perlindungan fisik terpasang pada peralatan yang melewati perimeter pagar",
          "Pagar terlindungi dari kabel telefon, penghalang beton, tiang baja, parit, batas kereta dan lainnya",
          "Kondisi penerangan / sistem pencahayaan di sekitar pagar memadai",
          "Tidak ada perimeter yang bolong/ tidak terjaga"
        ]
      },
      { 
        id: "1.26", no: "1.26", parameter: "Drainase", weight: 20,
        guidelines: [
          "Sistem drainase diberi kode tanda/warna yang dapat dilihat dengan jelas",
          "Tidak ada air permukaan yang dikonsumsi di sekitar bahan-bahan yang dapat mencemari lingkungan bila tertumpah",
          "Tidak ada lapisan minyak atau sampah/puing di saluran air permukaan dan titik-titik pembuangan",
          "Tidak ada drainase yang tersumbat, dalam kondisi bersih, tidak ditumbuhi rumput, volume drainase cukup",
          "Tersedia sumur resapan dengan jumlah yang cukup berdasarkan hasil assessment",
          "Terdapat dokumen hasil evaluasi/ pemantauan penggunaan air tanah (water well)"
        ]
      },
      { 
        id: "1.27", no: "1.27", parameter: "Forklift", weight: 15,
        guidelines: [
          "Pelindung bagian atap kabin tersedia sesuai persyaratan",
          "Terdapat area yang ditentukan untuk pengisian BBM (recharging) dan Parking",
          "Hanya operator yang berkualifikasi yang diijinkan mengoperasikan mobile equipment dan kunci dibawah kendalinya dengan sertifikasi 5 tahun",
          "Terproteksi dari bahaya fisik",
          "Komponen Peringatan bahaya dan saat mundur telah berfungsi dengan baik",
          "Tersedia APAR di mobile equipment",
          "Sertifikasi masih berlaku setiap satu tahun sekali",
          "Penggunaan forklift dan preventif maintenance di catat ( Terecord )"
        ]
      },
      { 
        id: "1.28", no: "1.28", parameter: "safety sign", weight: 15,
        guidelines: [
          "Material sign yang digunakan sesuai kondisi area",
          "Gambar, simbol/ piktogram sesuai dengan standar Nasional atau Internasional",
          "Ukuran sign sesuai dengan jarak pandang sehingga mudah terlihat/ terbaca karyawan",
          "Posisi penempatan dan cara pemasangan sign sesuai kondisi area",
          "Kondisikan rambu rambu dengan penerangan yang baik"
        ]
      },
      { 
        id: "1.29", no: "1.29", parameter: "Parkir area", weight: 15,
        guidelines: [
          "Permukaan terpelihara dengan baik",
          "Tersedia lebar yang cukup dan tidak ada halangan pada bidang vertikal",
          "Tersedia tanda dan marka serta arahan yang jelas untuk rute pejalan kaki",
          "Drainase jalan diberi tanda untuk menunjukkan lokasi discharge",
          "Tidak ada ceceran yang terlihat atau lapisan minyak pada genangan air",
          "Persiapan yang sesuai untuk perubahan cuaca ekstrim",
          "Tidak digunakan untuk penyimpanan material sementara",
          "CCTV terpasang pada jalur kendaraan yang dapat memantau aktivitas keamanan",
          "Kendaraan parkir pada tempatnya",
          "Kendaraan parkir dalam posisi parkir mundur"
        ]
      },
      { 
        id: "1.30", no: "1.30", parameter: "Gerbang utama", weight: 20,
        guidelines: [
          "Gerbang dapat ditutup, dikunci dan terdapat penjagaan dari sekuriti serta memiliki ketinggian minimum 2,4 meter",
          "Terdapat fasilitas verifikasi personil, barang/ Pemeriksaan ID Card dan Identitas",
          "Terdapat system anti intrusion (penyusupan)",
          "Kendaraan yang membawa barang telah mendapatkan ijin security / ijin masuk",
          "Penerangan pada area pintu masuk dalam kondisi yang baik",
          "Terpantau CCTV"
        ]
      },
      { 
        id: "1.31", no: "1.31", parameter: "Penyimpanan Bahan Bakar", weight: 10,
        guidelines: [
          "Material konstruksi tangki penyimpanan bahan bakar adalah dari baja karbon, baja tahan karat (stainless steel)",
          "Penempatan Tangki memerlukan atap dan dudukan yang kuat",
          "Dilengkapi dengan Hose, Nozle dan Flow meter",
          "Ada jadwal inspeksi secara berkala 2 tahun sekali (form disediakan)",
          "Dilengkapi APAR (CO2 & Dry powder) di area penyimpanan bahan bakar"
        ]
      },
      { 
        id: "1.32", no: "1.32", parameter: "Penyimpanan Botol oxcygen, acytiline", weight: 15,
        guidelines: [
          "Tempat penyimpanan harus berpengamanan, terlindungi dari benda jatuh, berventilasi, kering dan terhindar dari sinar matahari langsung",
          "Posisi tabung harus selalu tegak / berdiri baik isi ataupun kosong dan valve dalam kondisi tertutup",
          "Tabung yang berisi dan kosong harus terpisah dan terikat satu persatu",
          "Ruang lantai harus rata",
          "Tempat penyimpanan berjarak minimal 1,5 m antara oksigen dan acetylene"
        ]
      },
      { 
        id: "1.33", no: "1.33", parameter: "Hanggar", weight: 15,
        guidelines: [
          "Bangunan kokoh dan dibuat sesuai design",
          "Hangar Cukup penerangan dan ventilasi untuk semua area.",
          "Dinding Hangar tidak berlubang",
          "Lantai hangar bersih, rata dan bisa dilalui Forklift",
          "Ada sistem drainease di area Hangar",
          "Ada akses keluar / masuk",
          "Dilengkapi dengan Alat pemadam api Ringan ( APAR )",
          "Tambahkan CCTV"
        ]
      },
      { 
        id: "1.34", no: "1.34", parameter: "Tubular Area", weight: 10,
        guidelines: [
          "Penyimpanan Pipe & Tubular tidak boleh bersentuhan langsung dengan tanah. (Rak tidak boleh kurang dari 1,5ft / 46 cm dari tanah)",
          "Pipe tidak boleh di bandling (di ikat) untuk menghindari korosif",
          "Pipe yang akan di storage harus dalam keadaan bersih serta dilapisi inhibitor korosi",
          "Apabila lokasi penyimpanan bukan lantai beton, tubular harus disusun di atas 2 buah bantalan beton berjarak 6 meter, dilengkapi stopper",
          "Area storage keras, bersih dan rata (concrete floor )",
          "Dilakukan kontrol pencegahan masuknya cairan/air ke bagian dalam tubular, protector harus proper",
          "Dikelompokan secara terpisah berdasarkan ukuran dan status",
          "Tidak boleh di susun lebih dari 3 Mtr",
          "Pada setiap lapisan (layer) harus diberikan pemisah yang sesuai",
          "Beri tanda pada masing masing pipe (Jenis, Ukuran, Tanggal inspect, penyimpanan)"
        ]
      }
    ]
  },
  {
    id: "cat_2",
    no: "2",
    name: "Organisation",
    weight: 53,
    items: [
      { id: "2.1", no: "2.1", parameter: "Struktur Organisasi", weight: 5, guidelines: ["Ada, Update dan di tempel"] },
      { id: "2.2", no: "2.2", parameter: "Job Description", weight: 5, guidelines: ["Ada dan Dimengerti (sebagai permanen file warehouse)"] },
      { id: "2.3", no: "2.3", parameter: "Key Performance Indikator (KPI)", weight: 8, guidelines: ["Ada dan dimonitor setiap triwulan"] },
      { id: "2.4", no: "2.4", parameter: "Kebijakan Mutu", weight: 5, guidelines: ["Di Update berkala", "Ada dan ditempel"] },
      { id: "2.5", no: "2.5", parameter: "Kebijakan HSE", weight: 5, guidelines: ["Ada dan ditempel", "Ada dan Disosssialisaskan"] },
      { id: "2.6", no: "2.6", parameter: "QHSE Manual", weight: 10, guidelines: ["Ada di Evaluasi"] },
      { id: "2.7", no: "2.7", parameter: "Training & Competency Matrix", weight: 15, guidelines: ["Ada dan tercatat"] }
    ]
  },
  {
    id: "cat_3",
    no: "3",
    name: "Legal Compliance",
    weight: 118,
    items: [
      { id: "3.1", no: "3.1", parameter: "Dokument IMB", weight: 15, guidelines: ["Ada dan Valid"] },
      { id: "3.2", no: "3.2", parameter: "Dokument ijin mendirikan TPS B3", weight: 15, guidelines: ["Ada dan Valid"] },
      { id: "3.3", no: "3.3", parameter: "Dokument UPL/UKL", weight: 6, guidelines: ["Ada dan Valid"] },
      { id: "3.4", no: "3.4", parameter: "Pelaporan UKL/UPL", weight: 15, guidelines: ["Dilaporkan Per 6 Bulan"] },
      { id: "3.5", no: "3.5", parameter: "SILO Instalasi kelistrikan", weight: 6, guidelines: ["Khusus sumber listrik dengan kapasitas minimal 200 KVA (Sesuai Regulasi)"] },
      { id: "3.6", no: "3.6", parameter: "SILO Penangkal Petir", weight: 6, guidelines: ["Diperbaharui setiap satu tahun"] },
      { id: "3.7", no: "3.7", parameter: "MCU", weight: 10, guidelines: ["Valid dan termonitor"] },
      { id: "3.8", no: "3.8", parameter: "Sertifikat Forklift & Operator*", weight: 15, guidelines: ["Operator harus bersertifikat", "Terdapat Cek list peralatan angkat", "Terdapat monitoring resertifikasi"] },
      { id: "3.9", no: "3.9", parameter: "SertifikatCrane & Operator*", weight: 15, guidelines: ["Operator harus bersertifikat", "Terdapat Cek list", "Terdapat monitoring resertifikasi"] },
      { id: "3.10", no: "3.10", parameter: "Sertifikasi Air Compresor", weight: 15, guidelines: ["Sertifikasi alat angkat disnaker/migas", "Referensi Permenno. 37 th 2016"] }
    ]
  },
  {
    id: "cat_4",
    no: "4",
    name: "HSE CULTURE",
    weight: 210,
    items: [
      { id: "4.1", no: "4.1", parameter: "APD Pekerja", weight: 20, guidelines: ["100 % Pekerja memakai APD", "Visualisasi area wajib APD dan non APD", "Khusus penggunaan handglove mengikuti IK"] },
      { id: "4.2", no: "4.2", parameter: "Job Safety Analysisi (JSA)", weight: 20, guidelines: ["Diaplikasikan pada semua jenis pekerjaan"] },
      { id: "4.3", no: "4.3", parameter: "HIRADC", weight: 20, guidelines: ["Ada dan Terupdate"] },
      { id: "4.4", no: "4.4", parameter: "HSE Matrik Competency", weight: 10, guidelines: ["Tersedia sebagai permanen file warehouse"] },
      { id: "4.5", no: "4.5", parameter: "Emergency Response Team & Plan", weight: 10, guidelines: ["Ada dan Ditempel"] },
      { id: "4.6", no: "4.6", parameter: "Dril dan Simulation", weight: 10, guidelines: ["Ada Program dan rencana"] },
      { id: "4.7", no: "4.7", parameter: "Management Limbah B3", weight: 20, guidelines: ["Catatan, dokumen dan sesuai prosedur"] },
      { id: "4.8", no: "4.8", parameter: "Marking/ Signage", weight: 20, guidelines: ["Tersedia dan sesuai"] },
      { id: "4.9", no: "4.9", parameter: "HOC", weight: 10, guidelines: ["Tersedia HOC Box, Card, & Online"] },
      { id: "4.10", no: "4.10", parameter: "POB & Manhour Monitoring", weight: 10, guidelines: ["Tercatat dan Termonitor"] },
      { id: "4.11", no: "4.11", parameter: "Transportasi Checklist", weight: 10, guidelines: ["Checklist transportasi mobil operasional dilakukan oleh driver", "Checklist kegiatan mobilisasi dan demobilisasi dilakukan HSE officer"] },
      { id: "4.12", no: "4.12", parameter: "Inspeksi Peralatan Hot Work", weight: 15, guidelines: ["Dokumen Inspeksi"] },
      { id: "4.13", no: "4.13", parameter: "Safety body harness*", weight: 10, guidelines: ["Ada dan Layak"] },
      { id: "4.14", no: "4.14", parameter: "Stagger /Scaffolding*", weight: 10, guidelines: ["Ada dan Layak", "Model knock down"] },
      { id: "4.15", no: "4.15", parameter: "Lifting set (Sling, Chain, Webbing ets)*", weight: 15, guidelines: ["Terkontrol validitas"] }
    ]
  },
  {
    id: "cat_5",
    no: "5",
    name: "SECURITY",
    weight: 80,
    items: [
      { id: "5.1", no: "5.1", parameter: "Pos Security", weight: 15, guidelines: ["Pos security dilengkapi ruangan penjagaan (beratap, berdinding, lampu terang)", "Dilengkapi peralatan penjagaan (CCTV, HT/Line phone)"] },
      { id: "5.2", no: "5.2", parameter: "Jadwal petugasan Jaga", weight: 10, guidelines: ["Terdapat petugas security yang standby di lokasi pos", "Terdapat jadwal petugas security on duty"] },
      { id: "5.3", no: "5.3", parameter: "Daftar Tamu (Acces control)", weight: 10, guidelines: ["Tersedia SOP/ Manual guidance pemeriksaan security"] },
      { id: "5.4", no: "5.4", parameter: "Instalasi CCTV", weight: 15, guidelines: ["Titik kamera CCTV terpasang berdasarkan hasil Security assessment", "Tersedia ruang CCTV, berfungsi dengan baik dan gambar jelas"] },
      { id: "5.5", no: "5.5", parameter: "Pagar setinggi 3 Meter*", weight: 20, guidelines: ["Tinggi pagar minimal 2,4 - 3 meter", "Perlindungan fisik terpasang pada perlatan yang melewati batas"] },
      { id: "5.6", no: "5.6", parameter: "Menara Keamanan", weight: 10, guidelines: ["Tinggi minimal 3 meter dan ditempatkan di tempat yang dapat melihat keseluruhan batas gudang", "Terdapat lampu sorot yang dapat memantau area"] }
    ]
  },
  {
    id: "cat_6",
    no: "6",
    name: "ACTIVITY CONTROL",
    weight: 105,
    items: [
      { id: "6.1", no: "6.1", parameter: "Daftar peralatan Asset", weight: 15, guidelines: ["Tersedia dan Update dilaporkan setiap bulan"] },
      { id: "6.2", no: "6.2", parameter: "Tagging ID peralatan", weight: 15, guidelines: ["Setiap Asset harus ada tagging (ARP Tagging)"] },
      { id: "6.3", no: "6.3", parameter: "Checklist pre-mobilisasi", weight: 10, guidelines: ["Ada dan Sesuai"] },
      { id: "6.4", no: "6.4", parameter: "Penyimpanan Peralatan", weight: 20, guidelines: ["Akurasi dan penyimpanan benar", "Keamanan, Kerapihan & kebersihan"] },
      { id: "6.5", no: "6.5", parameter: "Penyimpanan Inventory", weight: 20, guidelines: ["Akurasi dan penyimpanan benar"] },
      { id: "6.6", no: "6.6", parameter: "Inspeksi rutin tempat kerja", weight: 15, guidelines: ["Dokumen inspeksi lingkungan kerja ada dan termonitor"] },
      { id: "6.7", no: "6.7", parameter: "Update dashboard mingguan terkait layout warehouse", weight: 10, guidelines: ["Dilaporkan saat rakor oleh Asmen"] }
    ]
  }
];

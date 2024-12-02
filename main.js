import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDdr0fxnYpfeG2b6GlTQ_-4TqpmGk2uvOk",
  authDomain: "insan-cemerlang-80713.firebaseapp.com",
  projectId: "insan-cemerlang-80713",
  storageBucket: "insan-cemerlang-80713.appspot.com",
  messagingSenderId: "1016858047753",
  appId: "1:1016858047753:web:0534dda2085c2adab68fd8",
  measurementId: "G-E7G0K9XTCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);


export async function tambahPelanggan(nama, alamat, notelepon) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "PELANGGAN2"), {
      nama: nama,
      alamat: alamat,
      notelepon: notelepon
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data pelanggan' + error)
  }
}


export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "PELANGGAN2");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      notelepon: dokumen.data().notelepon

    })
  })

  return hasilKueri;
}

export async function ubahPelanggan(id, namabaru, alamatbaru, noteleponbaru) {
  await updateDoc(
    doc(basisdata, "PELANGGAN2", id), { nama: namabaru, alamat: alamatbaru, notelepon: noteleponbaru }
  )
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "PELANGGAN2", id))
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "PELANGGAN2", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}